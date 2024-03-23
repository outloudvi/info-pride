import {
    Blockquote,
    Button,
    Grid,
    GridCol,
    Group,
    Stack,
    Table,
    TableTbody,
    TableTd,
    TableTr,
} from '@mantine/core'
import { useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { HometownIntroductionPageUrl } from './const'
import SquareColor from './SquareColor'
import CharacterAnimation from './CharacterAnimation'
import InGameVoice from './InGameVoice'
import styles from './index.module.css'

import ProfileData from '#data/profile.data'
import type { APIResponseOf, UnArray } from '#utils/api'
import type { CharacterId } from '#data/vendor/characterId'
import { PrimaryCharacterIds } from '#data/vendor/characterId'
import Paths from '#utils/paths'
import { IdolyFashionUrl, IdolyRoomUrl } from '#data/ipcmmu.data'
import BirthdayCommu from '#components/characters/BirthdayCommu'
import { toHashColor } from '#utils/toHashColor'
import AssetImage from '#components/AssetImage'
import { fetchApi } from '#utils/fetchApi'

const BirthdayCommuException: CharacterId[] = ['char-mna']
const VoiceException: CharacterId[] = ['char-mku']
const OriginalName: CharacterId[] = ['char-kor', 'char-kan', 'char-mhk']

function formatMonthDate(birthday: string): string {
    const match = birthday.match(/^(\d{1,2})月(\d{1,2})日$/)
    if (match === null) return birthday
    return `${match[1]}/${match[2]}`
}

const CharacterItem = async ({
    character,
}: {
    character: UnArray<APIResponseOf<'Character/List'>>
}) => {
    const $t = await getTranslations('characters')
    const $vc = await getTranslations('v-chr')
    const $vg = await getTranslations('v-group')
    const locale = useLocale()

    const { id, characterGroupId, name, enName, color } = character

    const CharacterData = await fetchApi('Character', { ids: id })
    const profileData = ProfileData?.[locale]?.[id as CharacterId]

    const shortId = id.replace(/^char-/, '')

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
                    <div
                        className={`uppercase text-3xl mt-1 text-gray-600 right-1 top-0 absolute ${styles.smHidden}`}
                    >
                        {enName}
                    </div>
                )}
            </div>
            {/* Hidden for en */}
            {locale !== 'en' && (
                <div
                    className={`uppercase text-2xl mt-1 text-gray-500 ${styles.nonsmHidden}`}
                >
                    {enName}
                </div>
            )}
            {catchphrase !== 'ー' && (
                <Blockquote
                    className="text-gray-700 dark:text-gray-200 !mb-2"
                    lang="ja"
                >
                    <span
                        dangerouslySetInnerHTML={{
                            __html: catchphrase.replace(/\n/g, '<br />'),
                        }}
                    ></span>
                </Blockquote>
            )}
            <p>{profileData ?? profile}</p>
            <Grid>
                <GridCol span={{ base: 12, lg: 8 }}>
                    {CharacterData && (
                        <div>
                            <Table className="max-w-xl text-center mx-auto">
                                <TableTbody>
                                    {tableItem.map(([label, value], key) => (
                                        <TableTr
                                            key={key}
                                            className="border-0 border-solid border-b- border-b-gray-400 even:bg-gray-100 dark:even:bg-gray-800"
                                        >
                                            <TableTd className="py-1  w-1/4">
                                                {label}
                                            </TableTd>
                                            <TableTd className="py-1">
                                                {value}
                                            </TableTd>
                                        </TableTr>
                                    ))}
                                    <TableTr>
                                        <TableTd>{$t('Theme color')}</TableTd>
                                        <TableTd>
                                            <SquareColor color={color} />{' '}
                                            {toHashColor(color)}
                                        </TableTd>
                                    </TableTr>
                                </TableTbody>
                            </Table>
                            <Group justify="center" className="mt-4">
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
                </GridCol>
                <GridCol
                    span={{
                        base: 12,
                        lg: 4,
                    }}
                    className="flex items-center justify-center"
                >
                    <Stack align="center">
                        <Group justify="center" gap="xl">
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
                                className="dark:invert"
                            />
                        </Group>
                        {PrimaryCharacterIds.includes(
                            id as (typeof PrimaryCharacterIds)[number],
                        ) && <CharacterAnimation charId={id as CharacterId} />}
                    </Stack>
                </GridCol>
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
