'use client'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mantine/core'
import { useTranslations } from 'next-intl'

import type { SearchParams } from './sp'

import useSetSearchParams from '#utils/useSetSearchParams'

const BackButton = ({ style }: { style: 'icon' | 'button' }) => {
    const $c = useTranslations('common')
    const { setSearch } = useSetSearchParams<SearchParams>()
    const goBack = () => {
        setSearch('d', '')
    }

    if (style === 'icon')
        return (
            <FontAwesomeIcon
                icon={faArrowLeft}
                color="white"
                size="2x"
                className="lg:hidden"
                onClick={goBack}
            />
        )

    if (style === 'button') {
        return (
            <Button className="mt-2" onClick={goBack}>
                {$c('Back')}
            </Button>
        )
    }
}

export default BackButton
