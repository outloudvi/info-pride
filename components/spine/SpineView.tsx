import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Grid, NativeSelect } from '@mantine/core'
import { useQuery } from 'react-query'
import spine from '@hoshimei/spine-runtime/spine-canvas'
import { useTranslations } from 'next-intl'

import Paths from '#utils/paths'

// START License: Spine Runtimes License Agreement
// https://github.com/EsotericSoftware/spine-runtimes/blob/3.8/spine-ts/LICENSE
function resize(elem: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const w = elem.clientWidth
    const h = elem.clientHeight
    if (elem.width != w || elem.height != h) {
        elem.width = w
        elem.height = h
    }
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.translate(elem.width / 2, elem.height / 2)
    // TODO: fix a value
    context.translate(0, 150)
}

function loadSkeleton(
    assetManager: spine.AssetManager,
    name: string,
    initialAnimation: string,
    skins: string[]
) {
    // Load the texture atlas using name.atlas and name.png from the AssetManager.
    // The function passed to TextureAtlas is used to resolve relative paths.
    const atlas = new spine.TextureAtlas(
        assetManager.get(Paths.relSpinePath(name + '.atlas')),
        function (path) {
            return assetManager.get(Paths.relSpinePath(path))
        }
    )

    // Create a AtlasAttachmentLoader, which is specific to the WebGL backend.
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas)

    // Create a SkeletonJson instance for parsing the .json file.
    const skeletonJson = new spine.SkeletonJson(atlasLoader)

    // Set the scale to apply during parsing, parse the file, and create a new skeleton.
    const skeletonData = skeletonJson.readSkeletonData(
        assetManager.get(Paths.relSpinePath(name + '.skl.json'))
    )
    const skeleton = new spine.Skeleton(skeletonData)
    // skeleton.bones = skeleton.bones.filter()
    skeleton.scaleY = -1
    const combinedSkin = new spine.Skin('combined-skin')
    for (const skinName of skins) {
        combinedSkin.addSkin(skeletonData.findSkin(skinName))
    }
    skeleton.setSkin(combinedSkin)
    skeleton.setSlotsToSetupPose()

    // Create an AnimationState, and set the initial animation in looping mode.
    const animationState = new spine.AnimationState(
        new spine.AnimationStateData(skeleton.data)
    )
    animationState.setAnimation(0, initialAnimation, true)

    // Pack everything up and return to caller.
    return {
        skeleton: skeleton,
        state: animationState,
    }
}
// END License

const SpineView = ({ id }: { id: string }) => {
    const $t = useTranslations('spine')
    const $c = useTranslations('common')

    const { data: sklJson } = useQuery({
        queryKey: Paths.spine(id + '.skl.json'),
        queryFn: ({ queryKey }) => fetch(queryKey[0]).then((x) => x.json()),
    })

    const [animation, setAnimation] = useState('loop_idle')
    const consSkinSets = useMemo(() => [['shadow'], ['head_FL', 'body_FL']], [])
    const hairSkinSets = useMemo(
        () => [['head_FL_back'], ['head_FL_front']],
        []
    )

    // Canvas related - we don't want changes on them to trigger re-render
    const $canvasRef = useRef<HTMLCanvasElement>(null)
    const $canvasCtx = useRef<CanvasRenderingContext2D>()
    const $lastFrameTime = useRef(Date.now() / 1000)
    const $assetManager = useRef<spine.canvas.AssetManager>()
    const $skeletonRenderer = useRef<spine.canvas.SkeletonRenderer>()
    const $resized = useRef(false)
    const $skinStates = useRef<
        {
            skeleton: spine.Skeleton
            state: spine.AnimationState
        }[]
    >([])
    const $frameRequest = useRef<number>(-1)

    const render = useCallback(() => {
        const canvasElem = $canvasRef.current
        const context = $canvasCtx.current
        const skeletonRenderer = $skeletonRenderer.current
        if (!canvasElem || !context || !skeletonRenderer) return // should not happen

        const now = Date.now() / 1000
        const delta = now - $lastFrameTime.current
        $lastFrameTime.current = now

        if (!$resized.current) {
            resize(canvasElem, context)
            $resized.current = true
        }

        context.save()
        context.setTransform(1, 0, 0, 1, 0, 0)
        context.fillStyle = '#cccccc'
        context.fillRect(0, 0, canvasElem.width, canvasElem.height)
        context.restore()

        for (const { state, skeleton } of Object.values($skinStates.current)) {
            state.update(delta)
            state.apply(skeleton)
            skeleton.updateWorldTransform()
            skeletonRenderer.draw(skeleton)
        }

        requestAnimationFrame(render)
    }, [])

    const load = useCallback(() => {
        const assetManager = $assetManager.current
        if (!assetManager) return -1 // this should not happen

        if (assetManager.isLoadingComplete()) {
            $skinStates.current = []
            for (const skinList of consSkinSets) {
                $skinStates.current.push(
                    loadSkeleton(assetManager, id, animation, skinList)
                )
            }

            return requestAnimationFrame(render)
        } else {
            return requestAnimationFrame(load)
        }
    }, [id, consSkinSets, animation, render])

    useEffect(() => {
        const canvas = $canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) {
            console.log('canvas is not ready!')
            return
        }

        $canvasCtx.current = ctx

        const skeletonRenderer = new spine.canvas.SkeletonRenderer(
            $canvasCtx.current
        )
        // enable debug rendering
        skeletonRenderer.debugRendering = false
        // enable the triangle renderer, supports meshes, but may produce artifacts in some browsers
        skeletonRenderer.triangleRendering = true

        $skeletonRenderer.current = skeletonRenderer

        const assetManager = new spine.canvas.AssetManager(Paths.s3(''))
        assetManager.loadText(Paths.relSpinePath(id + '.skl.json'))
        assetManager.loadText(Paths.relSpinePath(id + '.atlas'))
        assetManager.loadTexture(Paths.relSpinePath(id + '.png'))

        $assetManager.current = assetManager

        $frameRequest.current = requestAnimationFrame(load)

        return () => {
            cancelAnimationFrame($frameRequest.current)
            $skeletonRenderer.current = undefined
            $assetManager.current = undefined
        }
    }, [id, load])

    return (
        <Grid>
            <Grid.Col md={12} lg={8}>
                {sklJson ? (
                    <NativeSelect
                        data={Object.keys(
                            (sklJson as Record<string, any>).animations
                        )}
                        value={animation}
                        onChange={(event) =>
                            setAnimation(event.currentTarget.value)
                        }
                        label={$t('Select the animation')}
                        withAsterisk
                    />
                ) : (
                    <p>{$c('loading')}</p>
                )}
            </Grid.Col>
            <Grid.Col md={12} lg={4}>
                <canvas
                    className="mx-auto block"
                    height="400"
                    width="220"
                    ref={$canvasRef}
                />
            </Grid.Col>
        </Grid>
    )
}

export default SpineView
