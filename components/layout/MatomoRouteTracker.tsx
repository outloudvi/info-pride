import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

declare global {
    interface Window {
        _paq?: any[]
    }
}

export default function MatomoRouteTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url =
            pathname + (searchParams?.toString() ? `?${searchParams}` : '')
        window._paq = (window._paq || []) as any[]
        window._paq.push(['setCustomUrl', url])
        window._paq.push(['setDocumentTitle', document.title])
        window._paq.push(['trackPageView'])
    }, [pathname, searchParams])

    return null
}
