import {
    Blockquote,
    Button,
    Grid,
    Group,
    MediaQuery,
    Skeleton,
    Table,
} from '@mantine/core'
import { useTranslations } from 'next-intl'

import { HometownIntroductionPageUrl, OrgName } from './const'
import SquareColor from './SquareColor'
import CharacterAnimation from './CharacterAnimation'
import InGameVoice from './InGameVoice'

import useApi from '#utils/useApi'
import { APIResponseOf, UnArray } from '#utils/api'
import {
    CharacterChineseNameList,
    CharacterId,
    PrimaryCharacterIds,
} from '#data/vendor/characterId'
import Paths from '#utils/paths'
import { IdolyFashionUrl, IdolyRoomUrl } from '#data/ipcmmu.data'
import { Idols } from '#data/wikiPages'
import BirthdayCommu from '#components/characters/BirthdayCommu'
import { toHashColor } from '#utils/toHashColor'

const BirthdayCommuException: CharacterId[] = ['char-mna']
const VoiceException: CharacterId[] = ['char-mku']

const CharacterItem = ({
    character,
}: {
    character: UnArray<APIResponseOf<'Character/List'>>
}) => {
    const $t = useTranslations('characters')

    const { id, characterGroupId, name, enName, color } = character

    const { data: CharacterData, isSuccess } = useApi('Character', { ids: id })

    if (!isSuccess) {
        return <Skeleton height={700} />
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
                    {PrimaryCharacterIds.includes(id) && (
                        <CharacterAnimation charId={id as CharacterId} />
                    )}
                </Grid.Col>
            </Grid>
            {!BirthdayCommuException.includes(id) && (
                <>
                    <h2>生日剧情</h2>
                    <BirthdayCommu charaId={id} />
                </>
            )}
            {!VoiceException.includes(id) && (
                <>
                    <h2>语音</h2>
                    <InGameVoice charaId={id} />
                </>
            )}
        </div>
    )
}

export default CharacterItem
