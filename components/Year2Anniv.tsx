import { useState } from 'react'
import { Box, CloseButton } from '@mantine/core'
import { useReducedMotion } from '@mantine/hooks'

const Year2Anniv = () => {
    const [show, setShow] = useState(true)
    const reduceMotion = useReducedMotion()

    return (
        <div className={`hidden ${show ? ' md:flex' : ''}`}>
            <Box
                className="text-center text-[#1428ff] dark:text-white flex-grow"
                sx={() => ({
                    animationName: 'y2-anim',
                    animationDuration: '10s',
                    animationIterationCount: 'infinite',
                    ...(reduceMotion ? { animation: 'none' } : {}),
                    '@keyframes y2-anim': {
                        from: {
                            letterSpacing: '0',
                            opacity: '0',
                        },
                        '25%': {
                            letterSpacing: '0.45rem',
                            opacity: '1',
                        },
                        '80%': {
                            letterSpacing: '0.5rem',
                            opacity: '1',
                        },
                        to: {
                            letterSpacing: '0.6rem',
                            opacity: '0',
                        },
                    },
                })}
            >
                Happy 2nd Anniversary, IDOLY PRIDE!
            </Box>
            <CloseButton aria-label="Hide" onClick={() => setShow(false)} />
        </div>
    )
}

export default Year2Anniv
