import { Blockquote, Grid, ScrollArea, Table } from '@mantine/core'
import useSWR from 'swr'
import { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Layout from '../components/Layout'
import { APIResponseOf, fetchDb, UnArray } from '../utils/api'
import ListButton from '../components/ListButton'
import {
  CharacterChineseNameList,
  CharacterId,
} from '../data/vendor/characterId'
import SWRWrapped from '../components/SWRWrapped'

const toHashColor = (r: string) => (r.startsWith('#') ? r : '#' + r)

const OrgName: Record<string, string> = {
  character_group_1: '月光风暴',
  character_group_2: 'SUNNY PEACE',
  character_group_3: 'TRINITYAiLE',
  character_group_4: 'LizNoir',
}

const SquareColor = ({ color }: { color: string }) => (
  <div
    style={{
      height: '14px',
      width: '14px',
      border: '1px solid #7f7f7f',
      borderRadius: '3px',
      display: 'inline-block',
      backgroundColor: toHashColor(color),
    }}
  ></div>
)

const CharacterItem = ({
  character,
}: {
  character: UnArray<APIResponseOf<'Character/List'>>
}) => {
  const { t: $t } = useTranslation('characters')

  const { id, characterGroupId, name, enName, color } = character

  const { data: CharacterData, error: CharacterDataError } = useSWR<
    APIResponseOf<'Character'>
  >(`/Character?ids=${id}`)

  if (!CharacterData) {
    return <></>
  }

  const {
    cv,
    age,
    birthday,
    height,
    weight,
    zodiacSign,
    hometown,
    favorite,
    unfavorite,
    profile,
    isLeftHanded,
    threeSize,
    catchphrase,
  } = CharacterData[0] ?? {}

  const tableItem = [
    ...(OrgName[characterGroupId]
      ? [['所属团体', OrgName[characterGroupId]]]
      : []),
    ['年龄', age.replace('歳', '岁')],
    ['CV', cv],
    ['生日', birthday],
    ['身高', height],
    ['体重', weight],
    ['星座', $t(zodiacSign)],
    ['学校', hometown],
    ['喜欢的东西', favorite],
    ['讨厌的东西', unfavorite],
    ['习惯手', isLeftHanded ? '左手' : '右手'],
    ['三围', threeSize],
  ]

  return (
    <div>
      <div
        className="relative py-2 rounded-r-md"
        style={{
          background: `linear-gradient(-90deg, ${toHashColor(
            color
          )} 50%, transparent 75%)`,
        }}
      >
        <b className="text-4xl" lang="zh-hans">
          {CharacterChineseNameList[id as CharacterId]}
        </b>{' '}
        <span className="text-2xl ml-4" lang="ja">
          {name}
        </span>
        <div className="uppercase text-3xl mt-1 text-gray-600 right-1 top-0 absolute">
          {enName}
        </div>
      </div>

      {catchphrase && (
        <Blockquote className="text-gray-700 dark:text-gray-200" lang="ja">
          <span
            dangerouslySetInnerHTML={{
              __html: catchphrase.replace(/\n/g, '<br />'),
            }}
          ></span>
        </Blockquote>
      )}
      {profile && <p>{profile}</p>}
      {CharacterData && (
        <div>
          <Table className="max-w-xl text-center mx-auto">
            {tableItem.map(([label, value], key) => (
              <tr
                key={key}
                className="border-0 border-solid border-b- border-b-gray-400 even:bg-gray-100 dark:even:bg-gray-800"
              >
                <td className="py-1  w-1/4">{label}</td>
                <td className="py-1">{value}</td>
              </tr>
            ))}
            <tr>
              <td>代表色</td>
              <td>
                <SquareColor color={color} /> {toHashColor(color)}
              </td>
            </tr>
          </Table>
        </div>
      )}
    </div>
  )
}

const CharactersPage = () => {
  const { data: CharacterListData, error: CharacterListDataError } =
    useSWR<APIResponseOf<'Character/List'>>('/Character/List')

  const NonNpcCharacterListData = (CharacterListData ?? []).filter(
    (item) => CharacterChineseNameList[item.id as CharacterId]
  )
  const [chrOrderId, setChrOrderId] = useState(0)

  return (
    <Layout>
      <h2>角色</h2>

      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={4}>
          <ScrollArea style={{ height: 'min(1200px, 70vh)' }}>
            {NonNpcCharacterListData.sort((a, b) => a.order - b.order).map(
              (item, key) => (
                <ListButton
                  key={key}
                  selected={chrOrderId === key}
                  onClick={() => {
                    setChrOrderId(key)
                  }}
                >
                  <div className="text-base">
                    <span lang="zh-CN">
                      <SquareColor color={item.color} />{' '}
                      {CharacterChineseNameList[item.id as CharacterId]}
                    </span>
                  </div>
                </ListButton>
              )
            )}
          </ScrollArea>
        </Grid.Col>
        <Grid.Col xs={12} lg={8}>
          {NonNpcCharacterListData?.[chrOrderId] && (
            <CharacterItem character={NonNpcCharacterListData[chrOrderId]} />
          )}
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const characterList = await fetchDb('Character/List')()
  return {
    props: {
      fallback: {
        '/Character/List': characterList,
      },
      ...(await serverSideTranslations(locale, ['common', 'characters'])),
    },
  }
}

export default SWRWrapped(CharactersPage)
