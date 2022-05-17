import Link from 'next/link'
import useSWR from 'swr'

const Notice = () => {
  const { data: news } = useSWR<{ title: string; link?: string }[]>(
    '/api/news',
    (u) => fetch(u).then((x) => x.json())
  )

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

export default Notice
