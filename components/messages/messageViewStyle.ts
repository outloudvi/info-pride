import Paths from '#utils/paths'

const messageViewStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${Paths.sprite(
        'ip_bg'
    )})`,
    backgroundSize: '122px 177px',
    animationName: 'bg-anim',
    animationDuration: '30s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    '@keyframes bg-anim': {
        from: {
            backgroundPosition: '0 0',
        },
        to: {
            backgroundPosition: '244px 354px',
        },
    },
}

export default messageViewStyle
