function assetIdToPath(assetId: string): string {
    const splits = assetId.split('_')
    return (
        splits.length < 3
            ? ['_', assetId]
            : [splits[0], splits[1], splits.slice(2).join('_')]
    ).join('/')
}

function spiAssetIdToPath(assetId: string): string {
    const splits = assetId.split('_')
    return [...splits.slice(0, 4), assetId].join('/')
}

const Paths = {
    wiki: (pageName: string) =>
        `https://wiki.biligame.com/idolypride/${pageName}`,
    repo: (path: string) =>
        `https://github.com/outloudvi/info-pride/tree/master/${path}`,
    mgw: (pageName: string) => `https://zh.moegirl.org.cn/${pageName}`,
    ipcommu: (postId: string) =>
        `https://community.idolypride.jp/posts/${postId}`,
    assetsImg: (assetId: string) =>
        `https://ac.ip.outv.im/api/${
            assetId.startsWith('env') ? 'env' : 'img'
        }/${assetId}`,
    assets: (assetId: string) => Paths.s3(`assets/${assetIdToPath(assetId)}`),
    s3: (path: string) => `https://idoly-assets.outv.im/${path}`,
    sprite: (id: string) => Paths.s3(`sprite/${id}.png`),
    repoIssue: (id?: number) =>
        `https://github.com/outloudvi/info-pride/issues/${id ?? ''}`,
    api: (path: string) => `https://idoly-backend.outv.im/api/${path}`,
    advJson: (id: string) => Paths.s3(`processed/adv/adv_${id}.txt.json`),
    spine: (id: string) => Paths.s3(`assets/${spiAssetIdToPath(id)}`),
    spineBasePath: (id: string) =>
        Paths.s3(`assets/${id.split('_').slice(0, 4).join('/')}/`),
}

export default Paths
