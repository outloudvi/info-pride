type ExternalBilibiliVideo = {
    type: 'bilibili'
    vid: string
    pid?: number
}

export type ExternalVideo = ExternalBilibiliVideo

export function toVideoLink(e: ExternalVideo) {
    switch (e.type) {
        case 'bilibili': {
            return `https://www.bilibili.com/video/${e.vid}${
                e.pid ? `?p=${e.pid}` : ''
            }`
        }
    }
}
