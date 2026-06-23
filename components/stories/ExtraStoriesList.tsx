'use client'

import { Button, Card, Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { uniqBy } from 'lodash'

import AssetImage from '#components/AssetImage'
import useApi from '#utils/useApi'

const ExtraStoriesList = ({ activate }: { activate: boolean }) => {
    const $c = useTranslations('common')
    const { data, isLoading } = useApi('Story/Extra', undefined, {
        enabled: activate,
    })

    if (!activate) return null
    if (isLoading) return <p>{$c('Loading')}</p>

    const dedupedData = uniqBy(data ?? [], 'name')

    return (
        <Flex gap="xs" m="xs" wrap="wrap" justify="center">
            {dedupedData
                .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
                .map(({ id, name, assetId, episodes }) => (
                    <div
                        key={id}
                        style={{
                            flex: '1 1 250px',
                            flexGrow: '0',
                        }}
                    >
                        <Card key={id} shadow="sm" p="sm">
                            <Card.Section>
                                <AssetImage
                                    name={assetId}
                                    ratio="3"
                                    alt={'Stories image'}
                                />
                            </Card.Section>
                            <Flex direction="column" mt="xs" mb="xs">
                                <b lang="ja">{name}</b>
                                <div>
                                    {episodes.map(
                                        ({ storyId, episode }, index) => {
                                            return (
                                                <Link
                                                    href={`/en/story/${storyId}`}
                                                    key={index}
                                                >
                                                    <Button
                                                        variant="subtle"
                                                        size="compact-sm"
                                                        color="teal"
                                                        key={index}
                                                    >
                                                        {episode}
                                                    </Button>
                                                </Link>
                                            )
                                        },
                                    )}
                                </div>
                            </Flex>
                        </Card>
                    </div>
                ))}
        </Flex>
    )
}

export default ExtraStoriesList
