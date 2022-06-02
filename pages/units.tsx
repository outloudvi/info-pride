import { HTMLAttributes, useCallback, useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Grid,
  Group,
  Modal,
  Select,
  Skeleton,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import { CardType, SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { useTranslation } from 'next-i18next'

import useApi from '#utils/useApi'
import CardIdData from '#data/ccid'
import type { APIResponseOf, UnArray } from '#utils/api'
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'
import allFinished from '#utils/allFinished'
import unitCodeV1 from '#utils/unitCode'
import PageLoading from '#components/PageLoading'
import getI18nProps from '#utils/geti18nProps'
import Title from '#components/Title'

type CardTiny = UnArray<APIResponseOf<'Card'>>

const SkillInUnit = ({
  skill,
  className,
  style,
}: { skill: Skill } & HTMLAttributes<'div'>) => {
  const { t: $v } = useTranslation('vendor')
  return (
    <div {...{ className, style }}>
      {skill.name} <br />
      <span className="text-sm">
        {$v(SkillCategoryType[skill.categoryType])} 技
      </span>{' '}
      <br />
      <Tooltip
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: skill.levels[skill.levels.length - 1].description.replace(
                /\n/g,
                '<br/>'
              ),
            }}
          ></div>
        }
        withArrow
        position="right"
      >
        <Badge>详情</Badge>
      </Tooltip>
    </div>
  )
}

const CardInUnit = ({ card, col }: { card: CardTiny; col: number }) => {
  const { t: $v } = useTranslation('vendor')
  const { data: SkillData } = useApi(`Skill`, {
    ids: `${card.skillId1},${card.skillId2},${card.skillId3}`,
  })

  return (
    <>
      <div style={{ gridRow: 3, gridColumn: col }}>
        <b>{card.name}</b>
      </div>
      <div style={{ gridRow: 4, gridColumn: col }}>
        {CharacterChineseNameList[card.characterId as CharacterId]}
      </div>
      <div className="mt-2 mb-3" style={{ gridRow: 5, gridColumn: col }}>
        {$v(CardType[card.type])}
      </div>
      {SkillData ? (
        SkillData.map((x, i) => (
          <SkillInUnit
            key={i}
            className="mb-2"
            style={{ gridRow: 6 + i, gridColumn: col }}
            skill={x}
          />
        ))
      ) : (
        <Skeleton
          height={300}
          style={{ gridRow: '6 / span 3', gridColumn: col }}
        />
      )}
    </>
  )
}

const UnitPosition = ({
  position,
  card,
  setCard,
  cardList,
  col,
}: {
  position: number
  card?: CardTiny
  setCard: (c: CardTiny) => void
  cardList: CardTiny[]
  col: number
}) => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={`选择位置 ${position} 的卡片`}
      >
        <Select
          label="选择一张卡片"
          data={cardList.map((x) => ({
            label: `${x.name} / ${
              CharacterChineseNameList[x.characterId as CharacterId]
            }`,
            value: x.id,
          }))}
          searchable
          value={card?.id}
          onChange={(e) => {
            if (!e) return
            setCard(cardList[cardList.findIndex((c) => c.id === e)])
          }}
        />
      </Modal>

      <Button
        onClick={() => setModalOpened(true)}
        style={{
          gridRow: 1,
          gridColumn: col,
        }}
      >
        选择卡片
      </Button>
      {card ? (
        <CardInUnit card={card} col={col} />
      ) : (
        <div style={{ gridRow: '2 / span 7', gridColumn: col }}>未选择卡片</div>
      )}
    </>
  )
}

const UnitsPage = ({ CardData }: { CardData: APIResponseOf<'Card'> }) => {
  // 6 positions (0 and 1-5)
  // (unitCards[0] should be always empty)
  // eslint-disable-next-line no-sparse-arrays
  const [unitCards, setUnitCards] = useState<(CardTiny | undefined)[]>([
    ,
    ,
    ,
    ,
    ,
    ,
  ])

  const setPositionCard = useCallback(
    (pos: number) => (card: CardTiny) => {
      setUnitCards((r) => [...r.slice(0, pos), card, ...r.slice(pos + 1)])
    },
    [setUnitCards]
  )

  const unitCode = useMemo(() => {
    const cardList = unitCards.slice(1)
    if (cardList.filter((x) => x).length !== 5) return ''
    return unitCodeV1.encode(cardList as NonNullable<any>, CardIdData)
  }, [unitCards])

  const [modalImportUnit, setModalImportUnit] = useState(false)
  const [importUnitId, setImportUnitId] = useState('')

  return (
    <>
      <Modal
        opened={modalImportUnit}
        onClose={() => setModalImportUnit(false)}
        title="导入队伍编码"
      >
        <p className="p-2">
          队伍编码可以表示一个五人队伍的卡组及站位，但不包含等级或技能信息。{' '}
          <br />
          它应该以 1P- 开头。
        </p>
        <TextInput
          placeholder="1P-..."
          label="队伍编码"
          onChange={(e) => {
            setImportUnitId(e.target.value)
          }}
          required
        />
        <Button
          className="mt-2"
          onClick={() => {
            const result = unitCodeV1.decode(importUnitId, CardIdData)
            if (result === null) {
              showNotification({
                title: `错误的队伍编码：${importUnitId}`,
                message: '此编码无效，或来自更新版本的 INFO PRIDE。',
                color: 'red',
              })
              return
            }
            setUnitCards([
              undefined,
              ...result.map((x) => CardData.find((y) => y.id === x)),
            ])
            showNotification({
              title: '导入了队伍。',
              message: '队伍编码导入成功。',
              color: 'green',
            })
            setModalImportUnit(false)
          }}
        >
          导入
        </Button>
      </Modal>
      <p className="text-gray-500 dark:text-gray-400">
        本页面正在设计中。任何内容均可能发生变化。
      </p>
      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={6}>
          <Group>
            <div className="grow">
              队伍编码：
              {unitCode || '（请先选择所有位置的卡片。）'}
            </div>
            <Button
              onClick={() => {
                setModalImportUnit(true)
              }}
            >
              导入队伍编码
            </Button>
          </Group>
          <div className="grid grid-cols-5 gap-x-2 gap-y-1 mt-3">
            {[4, 2, 1, 3, 5].map((position, key) => (
              <UnitPosition
                key={key}
                col={key + 1}
                position={position}
                card={unitCards[position]}
                setCard={setPositionCard(position)}
                cardList={CardData}
              />
            ))}
          </div>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          {/* TODO: display notemap */}
        </Grid.Col>
      </Grid>
    </>
  )
}

const SkeletonUnitsPage = () => {
  const { data: CardData } = useApi('Card')

  const allData = {
    CardData,
  }

  return (
    <>
      <Title title="组队" />
      {allFinished(allData) ? (
        <UnitsPage {...allData} />
      ) : (
        <PageLoading data={allData} />
      )}
    </>
  )
}

export const getStaticProps = getI18nProps

export default SkeletonUnitsPage
