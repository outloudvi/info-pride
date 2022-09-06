import { Avatar, Card, Grid } from '@mantine/core'
import { useEffect, useState } from 'react'

import type { Contributor } from '#components/api/contributors/types'
import Title from '#components/Title'

/**
 * MIT License (MIT) Copyright (c) 2016 Kent C. Dodds, 2019 Jake Bolam, 2020 Maximilian Berkmann
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Adopted from https://github.com/all-contributors/cli/blob/e9c1f55beb2c18391a5d5f0c9e8243dc3f89ebe3/src/util/contribution-types.js
const EmojiTypes = {
    a11y: {
        symbol: '️️️️♿️',
        description: '可访问性',
    },
    audio: {
        symbol: '🔊',
        description: '音频',
    },
    blog: {
        symbol: '📝',
        description: '文章',
    },
    bug: {
        symbol: '🐛',
        description: '问题报告',
    },
    code: {
        symbol: '💻',
        description: '代码',
    },
    content: {
        symbol: '🖋',
        description: '内容',
    },
    data: {
        symbol: '🔣',
        description: '数据',
    },
    design: {
        symbol: '🎨',
        description: '设计',
    },
    doc: {
        symbol: '📖',
        description: '文档',
    },
    translation: {
        symbol: '🌍',
        description: '翻译',
    },
}

const ContributorBox = ({ contrib }: { contrib: Contributor }) => {
    const { name, login, avatar_url, profile, contributions } = contrib
    return (
        <Card shadow="sm" p="sm" radius="md" className="flex items-center">
            <Avatar src={avatar_url} size="lg" className="rounded-full" />
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
                    const typ = EmojiTypes[c as keyof typeof EmojiTypes]
                    if (typ) {
                        return (
                            <a key={key} href="#" title={typ.description}>
                                {typ.symbol}
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
            <Title title="关于" />
            <p>
                INFO PRIDE 是一个为 IDOLY PRIDE
                企划同好及游戏玩家设计的信息站点。
            </p>
            {contribs.length === 0 ? (
                <p className="text-gray-500">正在加载贡献列表...</p>
            ) : (
                <>
                    <p>贡献者们：</p>
                    <Grid>
                        {contribs.map((one, idx) => (
                            <Grid.Col xs={12} md={6} lg={4} key={idx}>
                                <ContributorBox contrib={one} />
                            </Grid.Col>
                        ))}
                    </Grid>
                </>
            )}
        </>
    )
}

export default AboutPage
