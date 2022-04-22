import type { NextApiRequest, NextApiResponse } from 'next'
import zip from 'lodash/zip'
import got from 'got'
import * as cheerio from 'cheerio'

const NEWS_PAGE = 'https://idolypride.jp/recent-news/'

type News = {
  title: string
  link: string
}

export async function getNews() {
  const html = await got
    .get(NEWS_PAGE, {
      responseType: 'text',
    })
    .text()

  const $ = cheerio.load(html)
  const titles = $('li a')
    .map(function () {
      return $(this).text()
    })
    .toArray()
  const links = $('li a')
    .map(function () {
      return $(this).attr('href')
    })
    .toArray()
  const items = zip(titles, links)
  return items
    .filter((x) => x.length === 2)
    .map(([title, link]) => ({
      title: title as string,
      link: String(new URL(link as string, 'https://idolypride.jp')),
    }))
}

const News = async (req: NextApiRequest, res: NextApiResponse<News[]>) => {
  // Cache for 1d
  res.setHeader('Cache-Control', 'max-age=86400')
  res.status(200).json(await getNews())
}

export default News
