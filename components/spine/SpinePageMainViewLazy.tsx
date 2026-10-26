'use client'

import dynamic from 'next/dynamic'

// Next.js 15 forbids `ssr: false` in Server Components, so the lazy loader
// lives behind a client boundary of its own.
const SpinePageMainView = dynamic(
    () => import('#components/spine/SpinePageMainView'),
    { ssr: false },
)

export default SpinePageMainView
