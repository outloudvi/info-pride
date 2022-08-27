import { Global } from '@mantine/core'

import { CharacterId } from '#data/vendor/characterId'
import Paths from '#utils/paths'
import { getMoveStyle, SizeStyle } from '#data/vendor/characterAnimation'

const CharacterAnimation = ({ charId }: { charId: CharacterId }) => {
    const moveStyle = getMoveStyle(charId)
    return (
        <>
            <Global
                styles={() => ({
                    '@keyframes char-anim': {
                        from: {
                            backgroundPositionX: '0%',
                        },
                        to: {
                            backgroundPositionX: '100%',
                        },
                    },
                })}
            />

            <div
                style={{
                    // Animation
                    animationName: 'char-anim',
                    animationDuration: String(moveStyle[0]) + 's',
                    animationTimingFunction: `steps(${moveStyle[1]})`,
                    animationIterationCount: 'infinite',
                    // Background
                    backgroundImage: `url(${Paths.s3(
                        `sprite-idol/${charId}.png`
                    )})`,
                    backgroundSize: 'cover',
                    // Size
                    height: SizeStyle.sm.height,
                    width: SizeStyle.sm.width,
                }}
            />
        </>
    )
}

export default CharacterAnimation
