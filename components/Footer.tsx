import Box from '@mui/material/Box'

const Footer = () => (
  <footer>
    <Box
      sx={{
        color: '#666',
      }}
      className="text-center"
    >
      <a
        href="https://github.com/outloudvi/info-pride"
        target="_blank"
        rel="noopener"
      >
        源代码
      </a>
      <br />
      来自{' '}
      <a
        href="https://wiki.biligame.com/idolypride/%E9%A6%96%E9%A1%B5"
        target="_blank"
        rel="noopener"
      >
        bwiki
      </a>{' '}
      的内容以{' '}
      <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh">
        CC BY-NC-SA 3.0
      </a>{' '}
      协议授权
      <br />
      来自游戏的内容 &copy; QualiArts 及相关实体
    </Box>
  </footer>
)

export default Footer
