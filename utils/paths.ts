const Paths = {
  wiki: (pageName: string) =>
    `https://wiki.biligame.com/idolypride/${pageName}`,
  repo: (path: string) =>
    `https://github.com/outloudvi/info-pride/tree/master/${path}`,
  mgw: (pageName: string) => `https://zh.moegirl.org.cn/${pageName}`,
  ipcommu: (postId: string) =>
    `https://community.idolypride.jp/posts/${postId}`,
  assets: (assetId: string) =>
    `http://idoly-assets-curator.vercel.app/api/img/${assetId}`,
  s3: (path: string) => `https://idoly-assets.outv.im/${path}`,
  sprite: (id: string) => Paths.s3(`sprite/${id}.png`),
  repoIssue: (id?: number) =>
    `https://github.com/outloudvi/info-pride/issues/${id ?? ''}`,
  api: (path: string) => `https://idoly-backend.outv.im/api/${path}`,
}

export default Paths
