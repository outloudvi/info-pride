import type { ReactNode } from 'react'

export default function Box({ children }: { children: ReactNode }) {
    return (
        <div className="my-1 p-2 text-white bg-[#4c4c4c] rounded">
            {children}
        </div>
    )
}
