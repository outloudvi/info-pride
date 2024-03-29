import { useCallback, useEffect, useRef, useState } from 'react'
import { Grid, Group, NativeSelect, Radio } from '@mantine/core'
import { useQuery } from 'react-query'
import { useTranslations } from 'next-intl'
import { showNotification } from '@mantine/notifications'
// Pixi only
import './pixiutils'
import { Skin, Spine } from '@pixi-spine/runtime-3.8'
import * as PIXI from 'pixi.js'

import Paths from '#utils/paths'

const CONS_SKINSETS_LEFT = ['shadow', 'head_FL', 'body_FL']
const CONS_SKINSETS_RIGHT = ['shadow', 'head_FR', 'body_FR']
const HAIR_SKINSETS = [['head_FL_back'], ['head_FL_front']]

const UNUSED_ANIMATIONS = ['config']

const BODY_ANIMATIONS = ['loop_idle', 'loop_idle_forward', 'pose']

const MOUTH_ANIMATIONS = [
    '',
    'loop_mouth_positive',
    'loop_mouth_negative',
    'loop_mouth_normal',
]

enum AcDirection {
    Left = 'l',
    Right = 'r',
}

const SpineView = ({ id }: { id: string }) => {
    const $t = useTranslations('spine')
    const $c = useTranslations('common')
    const $sp = useTranslations('spine_animation')

    const { data: sklJson } = useQuery({
        queryKey: Paths.assetsRaw(Paths.spinePath(id)) + '.json',
        queryFn: ({ queryKey }) => fetch(queryKey[0]).then((x) => x.json()),
    })
    const [bodyAnimation, setBodyAnimation] = useState(BODY_ANIMATIONS[0])
    const [mouthAnimation, setMouthAnimation] = useState(MOUTH_ANIMATIONS[0])
    const [acDirectionLeft, setAcDirectionLeft] = useState(true)

    useEffect(() => {
        setBodyAnimation(BODY_ANIMATIONS[0])
        setMouthAnimation(MOUTH_ANIMATIONS[0])
        setAcDirectionLeft(true)
    }, [id])

    // Canvas related - we don't want changes on them to trigger re-render
    const $canvasRef = useRef<HTMLCanvasElement>(null)
    const $app = useRef<PIXI.Application>()
    const $spine = useRef<Spine>()
    const $isAssetInitialized = useRef(false)
    const $skinLeft = useRef<Skin>()
    const $skinRight = useRef<Skin>()
    const $dragTarget = useRef<Spine>()

    const setAnimation = useCallback(
        (trackIndex: number, animationName: string) => {
            const spine = $spine.current
            if (!spine) {
                return
            }

            if (animationName !== '') {
                spine.state.setAnimation(trackIndex, animationName, true)
            } else {
                spine.state.setEmptyAnimation(trackIndex, 0)
            }
        },
        [],
    )
    const setSkin = useCallback((skin: Skin) => {
        const spine = $spine.current
        if (!spine) return

        spine.skeleton.setSkin(skin)
    }, [])

    useEffect(() => {
        setAnimation(0, bodyAnimation)
    }, [bodyAnimation, setAnimation])
    useEffect(() => {
        setAnimation(1, mouthAnimation)
    }, [mouthAnimation, setAnimation])
    useEffect(() => {
        const skin = acDirectionLeft ? $skinLeft.current : $skinRight.current
        if (!skin) return
        setSkin(skin)
    }, [acDirectionLeft, $skinLeft, $skinRight, setSkin])

    const pixiOnDragMove = useCallback(function (event: {
        global: PIXI.IPointData
    }) {
        const dragTarget = $dragTarget.current
        if (dragTarget) {
            dragTarget.parent.toLocal(
                event.global,
                undefined,
                dragTarget.position,
            )
        }
    }, [])
    const pixiOnDragStart = useCallback(
        function (this: Spine) {
            this.alpha = 0.7
            $dragTarget.current = this
            $app.current?.stage.on('pointermove', pixiOnDragMove)
        },
        [pixiOnDragMove],
    )
    const pixiOnDragEnd = useCallback(
        function () {
            const dragTarget = $dragTarget.current
            if (dragTarget) {
                $app.current?.stage.off('pointermove', pixiOnDragMove)
                dragTarget.alpha = 1
                $dragTarget.current = undefined
            }
        },
        [pixiOnDragMove],
    )
    const pixiSetupDrag = useCallback(
        (item: Spine) => {
            item.eventMode = 'static'
            item.cursor = 'pointer'
            item.on('pointerdown', pixiOnDragStart, item)
        },
        [pixiOnDragStart],
    )

    // Initialize
    useEffect(() => {
        ;(async () => {
            const canvas = $canvasRef.current
            if (!canvas) return

            if (
                !window.WebGLRenderingContext ||
                !(
                    canvas.getContext('webgl') ||
                    canvas.getContext('experimental-webgl')
                )
            ) {
                showNotification({
                    title: $t('webgl_unsupported'),
                    message: $t('webgl_unsupported_text'),
                    color: 'red',
                })
                return
            }

            if (!$isAssetInitialized.current) {
                PIXI.Assets.init({
                    basePath: Paths.assetsRaw(),
                })
                $isAssetInitialized.current = true
            }

            const app = new PIXI.Application({
                view: canvas,
                width: canvas.width,
                height: canvas.height,
                backgroundColor: 0xffffff,
            })

            app.stage.eventMode = 'static'
            app.stage.hitArea = app.screen
            app.stage.on('pointerup', pixiOnDragEnd)
            app.stage.on('pointerupoutside', pixiOnDragEnd)

            const spine = await PIXI.Assets.load(Paths.spinePath(id) + '.json')
            const spineItem = new Spine(spine.spineData)
            const spineData = spineItem.spineData
            pixiSetupDrag(spineItem)

            const skinLeft = new Skin('combined-skin-left')
            for (const skinName of CONS_SKINSETS_LEFT) {
                skinLeft.addSkin(spineData.findSkin(skinName) as Skin)
            }
            const skinRight = new Skin('combined-skin-right')
            for (const skinName of CONS_SKINSETS_RIGHT) {
                skinRight.addSkin(spineData.findSkin(skinName) as Skin)
            }
            spineItem.skeleton.setSkin(skinLeft)
            spineItem.skeleton.setSlotsToSetupPose()
            spineItem.x += 110
            spineItem.y += 360

            spineItem.state.setAnimation(0, BODY_ANIMATIONS[0], true)
            app.stage.addChild(spineItem)

            spineItem.state.timeScale = 1
            spineItem.autoUpdate = true

            app.ticker.add((delta) => {
                // console.log('d', delta)
            })

            $app.current = app
            $spine.current = spineItem
            $skinLeft.current = skinLeft
            $skinRight.current = skinRight
        })()

        return () => {
            $app.current = undefined
            $spine.current = undefined
            $skinLeft.current = undefined
            $skinRight.current = undefined
        }
    }, [id, $t, setAnimation, pixiOnDragEnd, pixiSetupDrag])

    return (
        <Grid>
            <Grid.Col span={{ md: 12, lg: 8 }}>
                {sklJson ? (
                    <>
                        <NativeSelect
                            data={Object.keys(
                                (sklJson as Record<string, never>).animations,
                            )
                                .filter(
                                    (x) =>
                                        !MOUTH_ANIMATIONS.includes(x) &&
                                        !UNUSED_ANIMATIONS.includes(x),
                                )
                                .map((x) => ({
                                    value: x,
                                    label: $sp(x),
                                }))}
                            value={bodyAnimation}
                            onChange={(event) =>
                                setBodyAnimation(event.target.value)
                            }
                            label={$t('Select the body animation')}
                            withAsterisk
                        />
                        <NativeSelect
                            data={[
                                ...Object.keys(
                                    (sklJson as Record<string, never>)
                                        .animations,
                                ).filter((x) => MOUTH_ANIMATIONS.includes(x)),
                                '',
                            ].map((x) => ({
                                value: x,
                                label: $sp(x),
                            }))}
                            value={mouthAnimation}
                            onChange={(event) =>
                                setMouthAnimation(event.target.value)
                            }
                            label={$t('Select the mouth animation')}
                            withAsterisk
                        />
                        <Radio.Group
                            value={
                                acDirectionLeft
                                    ? AcDirection.Left
                                    : AcDirection.Right
                            }
                            onChange={(x) => {
                                setAcDirectionLeft(x === AcDirection.Left)
                            }}
                            label={$t('Direction')}
                            withAsterisk
                        >
                            <Group mt="xs">
                                <Radio
                                    value={AcDirection.Left}
                                    label={$t('Left')}
                                />
                                <Radio
                                    value={AcDirection.Right}
                                    label={$t('Right')}
                                />
                            </Group>
                        </Radio.Group>
                    </>
                ) : (
                    <p>{$c('loading')}</p>
                )}
            </Grid.Col>
            <Grid.Col span={{ md: 12, lg: 4 }}>
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
