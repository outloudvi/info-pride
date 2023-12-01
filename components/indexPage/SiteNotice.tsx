'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import useFrontendApi from '#utils/useFrontendApi'

const SiteNotice = () => {
    const $c = useTranslations('common')
    const { data: news } = useFrontendApi('news')

    return news && news.length > 0 ? (
        <ul>
            {news.map(({ title, link }, key) => (
                <li key={key}>
                    <Link href={link ? link : '#'}>{title}</Link>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-gray-500">{$c('loading')}</p>
    )
}

export default SiteNotice
