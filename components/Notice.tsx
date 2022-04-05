import { useState, useEffect } from 'react'
import Link from '@mui/material/Link'

const Notice = () => {
  const [news, setNews] = useState<{ title: string; link?: string }[]>([
    {
      title: '正在加载',
    },
  ])

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

  return (
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
