import { useEffect, useRef, useState } from 'react'
import { Grid, NativeSelect } from '@mantine/core'
import { useQuery } from 'react-query'
import { useTranslations } from 'next-intl'
import { showNotification } from '@mantine/notifications'
// Pixi only
import './pixiutils'
import { Skin, Spine } from '@pixi-spine/runtime-3.8'
import * as PIXI from 'pixi.js'

import Paths from '#utils/paths'

const ANIMATION_LOOP_IDLE = 'loop_idle'
const CONS_SKINSETS = ['shadow', 'head_FL', 'body_FL']
const HAIR_SKINSETS = [['head_FL_back'], ['head_FL_front']]

const SpineView = ({ id }: { id: string }) => {
    const $t = useTranslations('spine')
    const $c = useTranslations('common')

    const { data: sklJson } = useQuery({
        queryKey: Paths.spinePath(id) + `/${id}.json`,
        queryFn: ({ queryKey }) => fetch(queryKey[0]).then((x) => x.json()),
    })

    const [animation, setAnimation] = useState(ANIMATION_LOOP_IDLE)

    // Canvas related - we don't want changes on them to trigger re-render
    const $canvasRef = useRef<HTMLCanvasElement>(null)
    const $app = useRef<PIXI.Application>()
    const $spine = useRef<Spine>()
    const $isAssetInitialized = useRef(false)

    useEffect(() => {
        const spine = $spine.current

        if (!spine) return

        spine.state.setAnimation(0, animation, true)
    }, [animation])

    // Initialize
    useEffect(() => {
        (async () => {
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
                    basePath: Paths.spinePath(id),
                })
                $isAssetInitialized.current = true
            }

            const app = new PIXI.Application({
                view: canvas,
                width: canvas.width,
                height: canvas.height,
                backgroundColor: 0xffffff,
            })

            const spine = await PIXI.Assets.load(id + '.json')
            const spineItem = new Spine(spine.spineData)
            const spineData = spineItem.spineData

            const skin = new Skin('combined-skin')
            for (const skinName of CONS_SKINSETS) {
                skin.addSkin(spineData.findSkin(skinName) as Skin)
            }
            spineItem.skeleton.setSkin(skin)
            spineItem.skeleton.setSlotsToSetupPose()
            spineItem.x += 120
            spineItem.y += 360

            app.stage.addChild(spineItem)

            if (spineItem.state.hasAnimation(ANIMATION_LOOP_IDLE)) {
                spineItem.state.setAnimation(0, ANIMATION_LOOP_IDLE, true)
                spineItem.state.timeScale = 1
                spineItem.autoUpdate = true
            }

            app.ticker.add((delta) => {
                // console.log('d', delta)
            })

            $app.current = app
            $spine.current = spineItem
        })()

        return () => {
            $app.current = undefined
            $spine.current = undefined
        }
    }, [id, $t])

    useEffect(() => {
        setAnimation(ANIMATION_LOOP_IDLE)
    }, [id])

    return (
        <Grid>
            <Grid.Col md={12} lg={8}>
                {sklJson ? (
                    <NativeSelect
                        data={Object.keys(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
