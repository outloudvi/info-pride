import zip from 'lodash/zip'
import * as cheerio from 'cheerio'

const NEWS_PAGE = 'https://idolypride.jp/recent-news/'

async function getNews() {
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

export async function GET() {
    return Response.json(await getNews(), {
        headers: {
            'Cache-Control': 'max-age=86400',
        },
    })
}
