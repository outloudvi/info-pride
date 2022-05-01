import PageLoading from '../components/PageLoading'
import {
  CharacterChineseNameList,
  CharacterId,
} from '../data/vendor/characterId'
import styles from '../styles/colors.module.css'
import allFinished from '../utils/allFinished'
import { APIResponseOf } from '../utils/api'
import useIpSWR from '../utils/useIpSWR'

import { toHashColor } from './characters'

const ColorOrder: CharacterId[][] = [
  ['char-mna'],
  ['char-ktn', 'char-skr', 'char-rei', 'char-ngs', 'char-hrk'],
  ['char-ski', 'char-chs', 'char-suz', 'char-mei', 'char-szk'],
  ['char-rui', 'char-yu', 'char-smr'],
  ['char-rio', 'char-aoi', 'char-ai', 'char-kkr'],
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

const ColorsPage = ({
  CharacterList,
}: {
  CharacterList: APIResponseOf<'Character/List'>
}) => {
  return (
    <>
      <p>
        此颜色根据游戏内部数据得到。亦可参考
        <a href="https://twitter.com/idolypride/status/1332167024433192961">
          官方 Twitter
        </a>{' '}
        提供的图片。
      </p>
      <div className="flex flex-col">
        {ColorOrder.map((row, _i) => (
          <div key={_i} className="flex flex-row my-2">
            {row.map((one, _j) => (
              <ColorBlock
                key={_j}
                name={CharacterChineseNameList[one]}
                color={toHashColor(
                  CharacterList.find((x) => x.id === one)!.color
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

const SkeletonColorsPage = () => {
  const { data: CharacterList } = useIpSWR('Character/List')

  const allData = {
    CharacterList,
  }

  return (
    <>
      <h2>系列颜色</h2>
      {allFinished(allData) ? (
        <ColorsPage {...allData} />
      ) : (
        <PageLoading data={allData} />
      )}
    </>
  )
}

export default SkeletonColorsPage
