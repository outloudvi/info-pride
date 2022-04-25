const Paths = {
  wiki: (pageName: string) =>
    `https://wiki.biligame.com/idolypride/${pageName}`,
  repo: (path: string) =>
    `https://github.com/outloudvi/info-pride/tree/master/${path}`,
  mgw: (pageName: string) => `https://zh.moegirl.org.cn/${pageName}`,
  ipcommu: (postId: string) =>
    `https://community.idolypride.jp/posts/${postId}`,
}

export default Paths
