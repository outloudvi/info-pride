import { redirect } from 'next/navigation'
import { parse } from 'node-html-parser'
import type { NextRequest } from 'next/server'

function convert(html: string): string {
    const $ = parse(html)
    $.querySelectorAll('a').map((x) => {
        const hrefText = x.getAttribute('href')
        if (!hrefText) return
        const href = new URL(hrefText)
        if (
            href.protocol === 'uniwebview:' &&
            href.host === 'link' &&
            href.searchParams.get('type') === 'ExternalWebPage'
        ) {
            const actualHref = href.searchParams.get('detail')
            if (actualHref) {
                x.setAttribute('href', actualHref)
                x.setAttribute('target', '_blank')
            }
        }
    })
    $.querySelector('body')?.insertAdjacentHTML(
        'beforeend',
        `<style>
*,
*:before,
*:after {
  cursor: revert;
  -webkit-user-select: revert;
  user-select: revert;
}
        </style>`,
    )

    return $.toString()
}

function tryConvert(html: string): string {
    try {
        return convert(html)
    } catch (e) {
        return html
    }
}

export async function GET(request: NextRequest) {
    const urlText = new URL(request.url).searchParams.get('url') ?? ''

    // let it throw on invalid URL
    const url = new URL(urlText)

    if (url.hostname !== 'stat.game-idolypride.jp') {
        redirect(urlText)
    }

    const pageHtml = await fetch(url, {
        headers: {
            'User-Agent': 'info-pride-pagecache/1.0',
        },
    }).then((x) => x.text())

    return new Response(tryConvert(pageHtml), {
        headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'public, s-maxage=86400',
        },
    })
}
