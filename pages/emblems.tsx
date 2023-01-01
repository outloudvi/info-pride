import { useTranslations } from 'next-intl'
import { Button, Checkbox, SimpleGrid } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import useApi from '#utils/useApi'
import type { APIResponseOf } from '#utils/api'
import Emblem from '#components/emblems/Emblem'

const EmblemsPage = () => {
    const $t = useTranslations('emblems')

    const router = useRouter()
    const routePath = useRouter().asPath
    const showHidden = router.query.showHidden === '1'
    const [currItemList, setCurrItemList] = useState<
        APIResponseOf<'Emblems'>['data']
    >([])
    const [currOffset, setCurrOffset] = useState(0)
    const { data: ApiData, isFetching } = useApi('Emblems', {
        limit: String(16),
        offset: String(currOffset),
        showHidden: String(showHidden),
    })
    useEffect(() => {
        setCurrOffset(0)
        setCurrItemList([])
    }, [routePath])
    useEffect(() => {
        if (!ApiData) return
        setCurrItemList((x) => [...x, ...ApiData.data])
    }, [ApiData])

    const loadMore = () => {
        setCurrOffset((x) => x + 16)
    }

    return (
        <>
            <Title title={$t('Emblems')} />
            <div className="mt-2 mb-4 rounded-md border-solid border-6 border-sky-500 p-2">
                <Checkbox
                    label={$t('Show hidden emblems')}
                    checked={showHidden}
                    onChange={() => {
                        const { pathname } = router
                        router.push({
                            pathname,
                            query: { showHidden: showHidden ? '0' : '1' },
                        })
                    }}
                />
            </div>
            <SimpleGrid
                className="max-w-7xl mx-auto"
                cols={4}
                spacing="lg"
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]}
            >
                {currItemList.map((item, key) => (
                    <Emblem key={key} item={item} />
                ))}
            </SimpleGrid>
            <Button
                onClick={() => loadMore()}
                className="mt-2"
                disabled={isFetching}
            >
                {isFetching ? $t('btn_loading') : $t('btn_more')}
            </Button>
        </>
    )
}

export const getStaticProps = getI18nProps(['emblems'])

export default EmblemsPage
