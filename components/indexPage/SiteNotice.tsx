import Link from 'next/link'

import useFrontendApi from '#utils/useFrontendApi'

const SiteNotice = () => {
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
        <p className="text-gray-500">新闻加载中。</p>
    )
}

export default SiteNotice
