import {
    Blockquote,
    Button,
    Grid,
    Group,
    MediaQuery,
    Skeleton,
    Stack,
    Table,
    useMantineColorScheme,
} from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'

import { HometownIntroductionPageUrl } from './const'
import SquareColor from './SquareColor'
import CharacterAnimation from './CharacterAnimation'
import InGameVoice from './InGameVoice'

import useApi from '#utils/useApi'
import type { APIResponseOf, UnArray } from '#utils/api'
import type { CharacterId } from '#data/vendor/characterId'
import { PrimaryCharacterIds } from '#data/vendor/characterId'
import Paths from '#utils/paths'
import { IdolyFashionUrl, IdolyRoomUrl } from '#data/ipcmmu.data'
import BirthdayCommu from '#components/characters/BirthdayCommu'
import { toHashColor } from '#utils/toHashColor'
import useFrontendApi from '#utils/useFrontendApi'
import AssetImage from '#components/AssetImage'

const BirthdayCommuException: CharacterId[] = ['char-mna']
const VoiceException: CharacterId[] = ['char-mku']
const OriginalName: CharacterId[] = ['char-kor', 'char-kan', 'char-mhk']

function formatMonthDate(birthday: string): string {
    const match = birthday.match(/^(\d{1,2})月(\d{1,2})日$/)
    if (match === null) return birthday
    return `${match[1]}/${match[2]}`
}

const CharacterItem = ({
    character,
}: {
    character: UnArray<APIResponseOf<'Character/List'>>
}) => {
    const $t = useTranslations('characters')
    const $vc = useTranslations('v-chr')
    const $vg = useTranslations('v-group')
    const locale = useLocale()
    const { colorScheme } = useMantineColorScheme()

    const { id, characterGroupId, name, enName, color } = character

    const { data: CharacterData, isSuccess } = useApi('Character', { ids: id })
    const { data: ProfileData } = useFrontendApi('characters/profile', {
        id,
        locale,
    })
    const shortId = id.replace(/^char-/, '')

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
        ...(OriginalName.includes(id as CharacterId)
            ? [[$t('Name'), $t(`name-${id}`)]]
            : []),
        [$t('Group'), $vg(characterGroupId)],
        [$t('Age'), $t('age', { age: age.replace('歳', '') })],
        [$t('CV'), $t(cv)],
        [$t('Birthday'), formatMonthDate(birthday)],
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

    return (
        <div>
            <div
                className="relative py-2 rounded-r-md"
                style={{
                    background: `linear-gradient(-90deg, ${toHashColor(
                        color,
                    )} 50%, transparent 75%)`,
                }}
            >
                <b className="text-4xl" lang="zh-Hans">
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
            {catchphrase !== 'ー' && (
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
            <p>{ProfileData?.profile ?? profile}</p>
            <Grid>
                <Grid.Col span={{ base: 12, lg: 8 }}>
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
                                {locale === 'zh-Hans' && (
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
                    <Stack align="center">
                        <Group spacing="xl" className="justify-center">
                            <AssetImage
                                name={`img_chr_icon_${shortId}`}
                                alt={$t('Avatar')}
                                ratio={1}
                                width={100}
                            />
                            <AssetImage
                                name={`img_chr_sign_${shortId}`}
                                alt={$t('Signature')}
                                ratio={1}
                                width={150}
                                style={{
                                    filter:
                                        colorScheme === 'dark'
                                            ? ''
                                            : 'invert(1)',
                                }}
                            />
                        </Group>
                        {PrimaryCharacterIds.includes(
                            id as (typeof PrimaryCharacterIds)[number],
                        ) && <CharacterAnimation charId={id as CharacterId} />}
                    </Stack>
                </Grid.Col>
            </Grid>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any  */}
            {PrimaryCharacterIds.includes(id as any) &&
                !BirthdayCommuException.includes(id as CharacterId) && (
                    <>
                        <h2>{$t('Birthday stories')}</h2>
                        <BirthdayCommu charaId={id} />
                    </>
                )}
            {!VoiceException.includes(id as CharacterId) && (
                <>
                    <h2>{$t('In-game voices')}</h2>
                    <InGameVoice charaId={id} />
                </>
            )}
        </div>
    )
}

export default CharacterItem
