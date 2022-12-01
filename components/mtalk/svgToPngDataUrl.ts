export default function svgToPngDataUrl(svg: string): Promise<string> {
    return new Promise((resolve) => {
        const parser = new DOMParser()
        const tree = parser.parseFromString(svg, 'image/svg+xml')
        const svgElement = tree.documentElement
        const width = Number(svgElement.getAttribute('width'))
        const height = Number(svgElement.getAttribute('height'))
        const canvas = document.createElement('canvas')
        const img = new Image()
        img.addEventListener('load', async () => {
            canvas.height = height
            canvas.width = width
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            ctx.drawImage(img, 0, 0)
            resolve(canvas.toDataURL())
        })
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    })
}
