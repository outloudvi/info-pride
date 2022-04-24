import { Blockquote, Grid, Skeleton } from '@mantine/core'
import useSWR from 'swr'
import { useState } from 'react'

import Layout from '../components/Layout'
import { APIResponseOf, UnArray } from '../utils/api'
import ListButton from '../components/ListButton'
import {
  CharacterChineseNameList,
  CharacterId,
} from '../data/vendor/characterId'

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
      border: '1px solid #555',
      borderRadius: '3px',
      display: 'inline-block',
      backgroundColor: '#' + color,
    }}
  ></div>
)

const CharacterItem = ({
  character,
}: {
  character: UnArray<APIResponseOf<'Character/List'>>
}) => {
  const { id, characterGroupId, name, enName, color } = character

  const { data: CharacterData, error: CharacterDataError } = useSWR<
    APIResponseOf<'Character'>
  >(`Character?ids=${id}`)

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
  } = CharacterData?.[0] ?? {}

  return (
    <div>
      <div>
        <b className="text-4xl" lang="zh-hans">
          {CharacterChineseNameList[id as CharacterId]}
        </b>{' '}
        <span className="text-2xl ml-4" lang="ja">
          {name}
        </span>
      </div>
      <div className="uppercase text-2xl mt-1 text-gray-600">{enName}</div>
      {catchphrase && (
        <Blockquote className="text-gray-700" lang="ja">
          {catchphrase}
        </Blockquote>
      )}
      {profile && <p>{profile}</p>}
      {CharacterData && (
        <div>
          <ul>
            {OrgName[characterGroupId] && (
              <li>所属团体 / {OrgName[characterGroupId]}</li>
            )}
            <li>年龄 / {age}</li>
            <li>CV / {cv}</li>
            <li>生日 / {birthday}</li>
            <li>身高 / {height}</li>
            <li>体重 / {weight}</li>
            <li>星座 / {zodiacSign}</li>
            <li>学校 / {hometown}</li>
            <li>喜爱的东西 / {favorite}</li>
            <li>讨厌的东西 / {unfavorite}</li>
            <li>习惯手 / {isLeftHanded ? '左手' : '右手'}</li>
            <li>
              代表色 / #{color} <SquareColor color={color} />
            </li>
            <li>三围 / {threeSize}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

const CharactersPage = () => {
  const { data: CharacterListData, error: CharacterListDataError } =
    useSWR<APIResponseOf<'Character/List'>>('Character/List')

  const NonNpcCharacterListData = (CharacterListData ?? []).filter(
    (item) => CharacterChineseNameList[item.id as CharacterId]
  )
  const [chrOrderId, setChrOrderId] = useState(0)

  return (
    <Layout>
      <h2>角色</h2>

      <Skeleton visible={Boolean(CharacterListData)}>
        <Grid gutter={20} className="my-3">
          <Grid.Col xs={12} lg={4}>
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
          </Grid.Col>
          <Grid.Col xs={12} lg={8}>
            {NonNpcCharacterListData?.[chrOrderId] && (
              <CharacterItem character={NonNpcCharacterListData[chrOrderId]} />
            )}
          </Grid.Col>
        </Grid>
      </Skeleton>
    </Layout>
  )
}

export default CharactersPage
