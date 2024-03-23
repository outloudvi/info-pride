import { getTranslations } from 'next-intl/server'

import getSiteNews from './getSiteNews'

import { Link } from '#utils/navigation'

const SiteNotice = async () => {
    const $c = await getTranslations('common')
    const news = await getSiteNews()

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
