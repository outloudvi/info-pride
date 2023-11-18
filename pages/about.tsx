import { Avatar, Card, Grid } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import type { Contributor } from '#components/api/contributors/types'
import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'

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

const ContributorBox = ({ contrib }: { contrib: Contributor }) => {
    const $t = useTranslations('about')

    const { name, login, avatar_url, profile, contributions } = contrib
    return (
        <Card shadow="sm" p="sm" radius="md" className="flex items-center">
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

const AboutPage = () => {
    const $t = useTranslations('about')

    const [contribs, setContribs] = useState<Contributor[]>([])

    useEffect(() => {
        fetch('/api/contributors')
            .then((x) => x.json())
            .then((x) => setContribs(x))
            .catch(() => {
                //
            })
    }, [])
    return (
        <>
            <Title title={$t('About')} />
            <p>{$t('site_desc')}</p>
            {contribs.length === 0 ? (
                <p className="text-gray-500">{$t('loading_contribs')}</p>
            ) : (
                <>
                    <p>{$t('Contributors:')}</p>
                    <Grid>
                        {contribs.map((one, idx) => (
                            <Grid.Col
                                span={{ base: 12, md: 6, lg: 4 }}
                                key={idx}
                            >
                                <ContributorBox contrib={one} />
                            </Grid.Col>
                        ))}
                    </Grid>
                </>
            )}
        </>
    )
}

export const getStaticProps = getI18nProps(['about'])

export default AboutPage
