export type ExternalVideo = {
    type: 'bilibili' | 'youtube' | 'acfun'
    vid: string
    // Bilibili only
    pid?: number
}

export function toVideoLink(e: ExternalVideo): string {
    switch (e.type) {
        case 'bilibili': {
            return `https://www.bilibili.com/video/${e.vid}${
                e.pid ? `?p=${e.pid}` : ''
            }`
        }
        case 'youtube': {
            return `https://www.youtube.com/watch?v=${e.vid}`
        }
        case 'acfun': {
            return `https://www.acfun.cn/v/${e.vid}`
        }
    }
    return ''
}
