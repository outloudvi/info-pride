import Link from 'next/link'
import { useQuery } from 'react-query'

import { frontendQueryFn } from '#utils/api'

const SiteNotice = () => {
  const { data: news } = useQuery<{ title: string; link?: string }[]>({
    queryKey: '/api/news',
    queryFn: frontendQueryFn,
  })

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
