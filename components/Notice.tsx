import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Skeleton } from '@mantine/core'

const Notice = () => {
  const [news, setNews] = useState<{ title: string; link?: string }[]>([])

  useEffect(() => {
    fetch('/api/news')
      .then((x) => x.json())
      .then((x) => setNews(x))
      .catch(() => {
        setNews([
          {
            title: '新闻加载失败',
          },
        ])
      })
  }, [])

  return news.length === 0 ? (
    <Skeleton height={200} />
  ) : (
    <ul>
      {news.map(({ title, link }, key) => (
        <li key={key}>
          <Link href={link ? link : '#'}>{title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Notice
