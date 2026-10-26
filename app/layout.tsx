import type * as React from 'react'

// well, we still need this due to `not-found.tsx`...
const DummyRootLayout = ({ children }: { children: React.ReactNode }) => {
    return children
}

export default DummyRootLayout
