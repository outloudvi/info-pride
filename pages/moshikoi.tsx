import { useTranslations } from 'next-intl'
import { Grid } from '@mantine/core'
import Link from 'next/link'

import getI18nProps from '#utils/getI18nProps'
import Title from '#components/Title'
import type { CharacterId } from '#data/vendor/characterId'
import Paths from '#utils/paths'

const MainPageSiteData: Record<
    string,
    {
        title: string
        characterId: CharacterId
        startStory: string
        img: string
    }
> = {
    '230514': {
        title: 'もしも君の手に触れたら',
        characterId: 'char-rei',
        startStory: 'st-love-23-0514-001',
        img: 'img_photo_full_photo-love-23-0514-01',
    },
    '231114': {
        title: 'もしも幼なじみと恋をしたら',
        characterId: 'char-ngs',
        startStory: 'st-love-23-1114-001',
        img: 'img_photo_full_photo-love-23-1114-01',
    },
}

const Moshikoi = () => {
    const $t = useTranslations('moshikoi')
    const $vc = useTranslations('v-chr')

    return (
        <>
            <Title title={$t('Moshikoi')} noh2 />
            <h2>
                {$t('Moshikoi')} (<span lang="ja">もし恋</span>)
            </h2>
            <p>{$t('description')}</p>
            <Grid>
                {Object.entries(MainPageSiteData).map(
                    ([key, { title, characterId, startStory, img }]) => (
                        <Grid.Col span={12} md={6} lg={4} xl={3} key={key}>
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
                        </Grid.Col>
                    ),
                )}
            </Grid>
        </>
    )
}

export const getStaticProps = getI18nProps(['moshikoi', 'v-chr'])

export default Moshikoi
