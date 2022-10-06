import {
    Blockquote,
    Button,
    Grid,
    Group,
    MediaQuery,
    Skeleton,
    Table,
} from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'

import { HometownIntroductionPageUrl } from './const'
import SquareColor from './SquareColor'
import CharacterAnimation from './CharacterAnimation'
import InGameVoice from './InGameVoice'

import useApi from '#utils/useApi'
import { APIResponseOf, UnArray } from '#utils/api'
import { CharacterId, PrimaryCharacterIds } from '#data/vendor/characterId'
import Paths from '#utils/paths'
import { IdolyFashionUrl, IdolyRoomUrl } from '#data/ipcmmu.data'
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
    const $vc = useTranslations('v-chr')
    const $vg = useTranslations('v-group')
    const locale = useLocale()

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
        [$t('Group'), $vg(characterGroupId)],
        [$t('Age'), $t('age', { age: age.replace('歳', '') })],
        [$t('CV'), $t(cv)],
        [$t('Birthday'), birthday],
        [$t('Height'), height],
        [$t('Weight'), weight],
        [$t('Zodiac sign'), $t(zodiacSign)],
        [
            $t('School'),
            HometownIntroductionPageUrl[hometown] ? (
                <a href={HometownIntroductionPageUrl[hometown]}>
                    {$t(hometown)}
                </a>
            ) : (
                $t(hometown)
            ),
        ],
        [$t('Like'), $t(favorite)],
        [$t('Hate'), $t(unfavorite)],
        [$t('Accustomed hand'), isLeftHanded ? $t('Left') : $t('Right')],
        [$t('Three size'), threeSize],
    ]

    console.log(`profile.${id}`, $t(`profile.${id}`))

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
                    {$vc(id)}
                </b>{' '}
                <span className="text-2xl ml-4" lang="ja">
                    {name}
                </span>
                {/* Hidden for en */}
                {locale !== 'en' && (
                    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                        <div className="uppercase text-3xl mt-1 text-gray-600 right-1 top-0 absolute">
                            {enName}
                        </div>
                    </MediaQuery>
                )}
            </div>
            {/* Hidden for en */}
            {locale !== 'en' && (
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <div className="uppercase text-2xl mt-1 text-gray-500">
                        {enName}
                    </div>
                </MediaQuery>
            )}

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
            {profile ? (
                <p>
                    {$t(`profile.${id}`) !== `profile.${id}`
                        ? $t(`profile.${id}`)
                        : profile}
                </p>
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
                                        <td>{$t('Theme color')}</td>
                                        <td>
                                            <SquareColor color={color} />{' '}
                                            {toHashColor(color)}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Group position="center" className="mt-4">
                                {/* Chinese only */}
                                {locale === 'zh-hans' && (
                                    <a href={Paths.mgw($vc(id))}>
                                        <Button>萌娘百科条目</Button>
                                    </a>
                                )}
                                {IdolyFashionUrl[id as CharacterId] && (
                                    <a
                                        href={
                                            IdolyFashionUrl[id as CharacterId]
                                        }
                                    >
                                        <Button>{$t('IDOLY FASHION')}</Button>
                                    </a>
                                )}
                                {IdolyRoomUrl[id as CharacterId] && (
                                    <a href={IdolyRoomUrl[id as CharacterId]}>
                                        <Button>{$t('IDOLY ROOM')}</Button>
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
                    <h2>{$t('Birthday stories')}</h2>
                    <BirthdayCommu charaId={id} />
                </>
            )}
            {!VoiceException.includes(id) && (
                <>
                    <h2>{$t('In-game voices')}</h2>
                    <InGameVoice charaId={id} />
                </>
            )}
        </div>
    )
}

export default CharacterItem
