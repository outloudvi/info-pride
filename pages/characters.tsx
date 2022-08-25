import {
    Blockquote,
    Button,
    Divider,
    Global,
    Grid,
    Group,
    MediaQuery,
    ScrollArea,
    Table,
} from '@mantine/core'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import useApi from '#utils/useApi'
import { APIResponseOf, UnArray } from '#utils/api'
import ListButton from '#components/ListButton'
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'
import Paths from '#utils/paths'
import { IdolyFashionUrl, IdolyRoomUrl } from '#data/ipcmmu.data'
import { getMoveStyle, SizeStyle } from '#data/vendor/characterAnimation'
import allFinished from '#utils/allFinished'
import PageLoading from '#components/PageLoading'
import { Idols } from '#data/wikiPages'
import Title from '#components/Title'
import getI18nProps from '#utils/geti18nProps'

export const toHashColor = (r: string) => (r.startsWith('#') ? r : '#' + r)

const OrgName: Record<string, string> = {
    character_group_1: '月光风暴',
    character_group_2: 'SUNNY PEACE',
    character_group_3: 'TRINITYAiLE',
    character_group_4: 'LizNoir',
}

const HometownIntroductionPageUrl: Record<string, string> = {
    '私立 星見高校': Paths.ipcommu('o-009'),
    '公立 光ヶ崎高校': Paths.ipcommu('o-010'),
    '私立 麗葉女学院中等部': Paths.ipcommu('o-011'),
    '私立 麗葉女学院高等部': Paths.ipcommu('o-011'),
    '私立 月出高校 芸能コース': Paths.ipcommu('o-012'),
    '公立 紅花中学校': Paths.ipcommu('o-013'),
}

const ExtraLinks = {
    偶像关系图: Paths.ipcommu('o-004'),
    事务所关系图: Paths.ipcommu('o-005'),
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

const CharacterAnimation = ({ charId }: { charId: CharacterId }) => {
    const moveStyle = getMoveStyle(charId)
    return (
        <>
            <Global
                styles={() => ({
                    '@keyframes char-anim': {
                        from: {
                            backgroundPositionX: '0%',
                        },
                        to: {
                            backgroundPositionX: '100%',
                        },
                    },
                })}
            />

            <div
                style={{
                    // Animation
                    animationName: 'char-anim',
                    animationDuration: String(moveStyle[0]) + 's',
                    animationTimingFunction: `steps(${moveStyle[1]})`,
                    animationIterationCount: 'infinite',
                    // Background
                    backgroundImage: `url(${Paths.s3(
                        `sprite-idol/${charId}.png`
                    )})`,
                    backgroundSize: 'cover',
                    // Size
                    height: SizeStyle.sm.height,
                    width: SizeStyle.sm.width,
                }}
            />
        </>
    )
}

const CharacterItem = ({
    character,
}: {
    character: UnArray<APIResponseOf<'Character/List'>>
}) => {
    const $t = useTranslations('characters')

    const { id, characterGroupId, name, enName, color } = character

    const { data: CharacterData } = useApi('Character', { ids: id })

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
        ['CV', $t(cv)],
        ['生日', birthday],
        ['身高', height],
        ['体重', weight],
        ['星座', $t(zodiacSign)],
        [
            '学校',
            HometownIntroductionPageUrl[hometown] ? (
                <a href={HometownIntroductionPageUrl[hometown]}>
                    {$t(hometown)}
                </a>
            ) : (
                $t(hometown)
            ),
        ],
        ['喜欢的东西', $t(favorite)],
        ['讨厌的东西', $t(unfavorite)],
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
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <div className="uppercase text-3xl mt-1 text-gray-600 right-1 top-0 absolute">
                        {enName}
                    </div>
                </MediaQuery>
            </div>

            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <div className="uppercase text-2xl mt-1 text-gray-500">
                    {enName}
                </div>
            </MediaQuery>

            {catchphrase && (
                <Blockquote
                    className="text-gray-700 dark:text-gray-200"
                    lang="ja"
                >
                    <span
                        dangerouslySetInnerHTML={{
                            __html: catchphrase.replace(/\n/g, '<br />'),
                        }}
                    ></span>
                </Blockquote>
            )}
            {Idols[id] ? (
                <p>{Idols[id].desc}</p>
            ) : profile ? (
                <p>{profile}</p>
            ) : null}
            <Grid>
                <Grid.Col xs={12} lg={8}>
                    {CharacterData && (
                        <div>
                            <Table className="max-w-xl text-center mx-auto">
                                <tbody>
                                    {tableItem.map(([label, value], key) => (
                                        <tr
                                            key={key}
                                            className="border-0 border-solid border-b- border-b-gray-400 even:bg-gray-100 dark:even:bg-gray-800"
                                        >
                                            <td className="py-1  w-1/4">
                                                {label}
                                            </td>
                                            <td className="py-1">{value}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>代表色</td>
                                        <td>
                                            <SquareColor color={color} />{' '}
                                            {toHashColor(color)}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Group position="center" className="mt-4">
                                <a
                                    href={Paths.mgw(
                                        CharacterChineseNameList[
                                            id as CharacterId
                                        ]
                                    )}
                                >
                                    <Button>萌娘百科条目</Button>
                                </a>
                                {IdolyFashionUrl[id as CharacterId] && (
                                    <a
                                        href={
                                            IdolyFashionUrl[id as CharacterId]
                                        }
                                    >
                                        <Button>
                                            服装介绍 / IDOLY FASHION
                                        </Button>
                                    </a>
                                )}
                                {IdolyRoomUrl[id as CharacterId] && (
                                    <a href={IdolyRoomUrl[id as CharacterId]}>
                                        <Button>房间介绍 / IDOLY ROOM</Button>
                                    </a>
                                )}
                            </Group>
                        </div>
                    )}
                </Grid.Col>
                <Grid.Col
                    xs={12}
                    lg={4}
                    className="flex items-center justify-center"
                >
                    {!['char-kor', 'char-kan', 'char-mhk'].includes(id) && (
                        <CharacterAnimation charId={id as CharacterId} />
                    )}
                </Grid.Col>
            </Grid>
        </div>
    )
}

const CharactersPage = ({
    CharacterListData,
}: {
    CharacterListData: APIResponseOf<'Character/List'>
}) => {
    const NonNpcCharacterListData = CharacterListData.filter(
        (item) => CharacterChineseNameList[item.id as CharacterId]
    )
    const [chrOrderId, setChrOrderId] = useState(0)

    return (
        <>
            <Grid gutter={20} className="my-3">
                <Grid.Col xs={12} lg={4}>
                    <MediaQuery
                        smallerThan="sm"
                        styles={{
                            height: '300px !important',
                        }}
                    >
                        <ScrollArea style={{ height: 'min(1200px, 70vh)' }}>
                            {NonNpcCharacterListData.sort(
                                (a, b) => a.order - b.order
                            ).map((item, key) => (
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
                                            {
                                                CharacterChineseNameList[
                                                    item.id as CharacterId
                                                ]
                                            }
                                        </span>
                                    </div>
                                </ListButton>
                            ))}
                        </ScrollArea>
                    </MediaQuery>
                </Grid.Col>
                <Grid.Col xs={12} lg={8}>
                    {NonNpcCharacterListData?.[chrOrderId] && (
                        <CharacterItem
                            character={NonNpcCharacterListData[chrOrderId]}
                        />
                    )}
                </Grid.Col>
            </Grid>
            <Divider my="sm" />
            {Object.entries(ExtraLinks).map(([title, link], key) => (
                <a key={key} href={link} className="mr-3">
                    <Button>{title}</Button>
                </a>
            ))}
        </>
    )
}

export const getStaticProps = getI18nProps(['characters'])

const SkeletonCharactersPage = () => {
    const { data: CharacterListData } = useApi('Character/List')

    const allData = {
        CharacterListData,
    }

    return (
        <>
            <Title title="角色" />
            {allFinished(allData) ? (
                <CharactersPage {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export default SkeletonCharactersPage
