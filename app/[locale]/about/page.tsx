import { Avatar, Card, Grid, GridCol } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

const ALLCONTRIBUTORS_CONFIG_URL =
    'https://raw.githubusercontent.com/outloudvi/info-pride/master/.all-contributorsrc'

/**
 * MIT License (MIT) Copyright (c) 2016 Kent C. Dodds, 2019 Jake Bolam, 2020 Maximilian Berkmann
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Adopted from https://github.com/all-contributors/cli/blob/e9c1f55beb2c18391a5d5f0c9e8243dc3f89ebe3/src/util/contribution-types.js
const EmojiTypes: Record<string, string> = {
    a11y: '️️️️♿️',
    audio: '🔊',
    blog: '📝',
    bug: '🐛',
    code: '💻',
    content: '🖋',
    data: '🔣',
    design: '🎨',
    doc: '📖',
    translation: '🌍',
}

type Contributor = {
    login: string
    name: string
    avatar_url: string
    profile: string
    contributions: string[]
}

const ContributorBox = ({ contrib }: { contrib: Contributor }) => {
    const $t = useTranslations('about')

    const { name, login, avatar_url, profile, contributions } = contrib
    return (
        <Card
            shadow="sm"
            p="sm"
            radius="md"
            className="flex flex-row items-center"
        >
            <Avatar
                src={avatar_url}
                size="lg"
                className="rounded-full"
                alt={`Avatar for ${name}`}
            />
            <div className="ml-2">
                <b>{name}</b> (
                <a href={`https://github.com/${login}`} rel="nofollow noopener">
                    @{login}
                </a>
                ) <br />
                <a href={profile} rel="nofollow noopener" className="break-all">
                    {profile.replace(/^https?:\/\//, '')}
                </a>
                <br />
                {contributions.map((c, key) => {
                    const typ = EmojiTypes[c]
                    if (typ) {
                        return (
                            <a key={key} href="#" title={$t(`emoji_${c}`)}>
                                {typ}
                            </a>
                        )
                    }
                    return <span key={key}>{c}</span>
                })}
            </div>
        </Card>
    )
}

const AboutPage = async () => {
    const $t = await getTranslations('about')

    const contributors: Contributor[] = await fetch(ALLCONTRIBUTORS_CONFIG_URL)
        .then((x) => x.json())
        .then((x) => x.contributors)

    return (
        <>
            <h2>{$t('About')}</h2>
            <p>{$t('site_desc')}</p>
            {contributors.length === 0 ? (
                <p className="text-gray-500">{$t('loading_contribs')}</p>
            ) : (
                <>
                    <p>{$t('Contributors:')}</p>
                    <Grid className="pb-2">
                        {contributors.map((one, idx) => (
                            <GridCol
                                span={{ base: 12, md: 6, lg: 4 }}
                                key={idx}
                            >
                                <ContributorBox contrib={one} />
                            </GridCol>
                        ))}
                    </Grid>
                </>
            )}
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'about' })
    return {
        title: $t('About'),
    }
}

export default AboutPage
