import Typography from '@mui/material/Typography'

import Layout from '../components/Layout'
import Color from '../data/color'
import { Idols, IdolSlug } from '../data/idols'

import styles from '../styles/colors.module.css'

const ColorOrder: IdolSlug[][] = [
  ['mana'],
  ['kotono', 'sakura', 'rei', 'nagisa', 'haruko'],
  ['saki', 'chisa', 'suzu', 'mei', 'shizuku'],
  ['rui', 'yu', 'sumire'],
  ['rio', 'aoi', 'ai', 'kokoro'],
]

const ColorBlock = ({ name, color }: { name: string; color: string }) => (
  <div className="mr-3">
    <div
      className={styles.block}
      style={{
        backgroundColor: color,
        height: 'min(16vw,140px)',
        width: 'min(16vw,140px)',
        border: 'min(1.5vw,11px) solid #eaece7',
        borderRadius: 'min(1vw,9px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>{color}</span>
    </div>
    <div className="text-sm text-gray-500 mt-1">{name}</div>
  </div>
)

const ColorsPage = () => {
  return (
    <Layout>
      <Typography variant="h2">系列颜色</Typography>
      <p>
        此颜色根据 idolypride.jp 网站
        <a href="https://idolypride.jp/shared/css/character.css?v=2.1">
          源代码
        </a>
        得到。亦可参考
        <a href="https://twitter.com/idolypride/status/1332167024433192961">
          官方 Twitter
        </a>{' '}
        提供的图片。
      </p>
      <div className="flex flex-col">
        {ColorOrder.map((row, _i) => (
          <div key={_i} className="flex flex-row my-2">
            {row.map((one, _j) => (
              <ColorBlock key={_j} name={Idols[one]} color={Color[one]} />
            ))}
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default ColorsPage
