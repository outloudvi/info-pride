import type { NextApiRequest, NextApiResponse } from 'next'
import zip from 'lodash/zip'
import * as cheerio from 'cheerio'

import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'

const NEWS_PAGE = 'https://idolypride.jp/recent-news/'

export async function getNews() {
    const html = await fetch(NEWS_PAGE).then((x) => x.text())

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

const news = async (
    _req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['news']>,
) => {
    // Cache for 1d
    res.setHeader('Cache-Control', 'max-age=86400')
    res.status(200).json(await getNews())
}

export default news

export const config = {
    api: {
        externalResolver: true,
    },
}
