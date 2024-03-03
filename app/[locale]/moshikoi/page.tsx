import { Grid, GridCol } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { Link } from '#utils/navigation'
import Paths from '#utils/paths'
import MoshikoiMeta from '#data/moshikoi/meta'

const MoshikoiPage = ({
    params: { locale },
}: {
    params: { locale: string }
}) => {
    unstable_setRequestLocale(locale)

    const $t = useTranslations('moshikoi')
    const $vc = useTranslations('v-chr')

    return (
        <>
            <h2>
                {$t('Moshikoi')} (<span lang="ja">もし恋</span>)
            </h2>
            <p>{$t('description')}</p>
            <Grid>
                {Object.entries(MoshikoiMeta)
                    .reverse()
                    .map(([key, { title, characterId, startStory, img }]) => (
                        <GridCol
                            span={{ base: 12, md: 6, lg: 4, xl: 3 }}
                            key={key}
                        >
                            <Link
                                href={`/story/${startStory}`}
                                tabIndex={0}
                                className="w-full md:w-[370px]"
                            >
                                <div
                                    className="relative rounded-md"
                                    style={{
                                        aspectRatio: '16 / 9',
                                        backgroundImage: `url(${Paths.assetsImg(
                                            img,
                                        )})`,
                                        backgroundSize: '100% 100%',
                                    }}
                                >
                                    <div className="absolute left-0 right-0 bottom-0 bg-[#eeec] p-2 text-neutral-800">
                                        <b className="text-lg">{title}</b>
                                        <br />
                                        {$vc(characterId)}
                                    </div>
                                </div>
                            </Link>
                        </GridCol>
                    ))}
            </Grid>
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'moshikoi' })
    return {
        title: $t('Moshikoi'),
    }
}

export default MoshikoiPage
