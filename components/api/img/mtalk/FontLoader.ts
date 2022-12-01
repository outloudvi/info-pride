export default class FontLoader {
    url: string
    blob: ArrayBuffer | null = null

    constructor(url: string) {
        this.url = url
    }

    async get(): Promise<ArrayBuffer> {
        if (this.blob) return this.blob
        const b = await fetch(this.url).then((x) => x.arrayBuffer())
        this.blob = b
        return b
    }
}
