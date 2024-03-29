import { useSearchParams } from 'next/navigation'

import { useRouter, usePathname } from '#utils/navigation'

const useSetSearchParams = <T = Record<string, string>>() => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const setSearchs = (newParamsList: [keyof T, string][]) => {
        let changed = false
        const params = new URLSearchParams(searchParams.toString())
        for (const [key, val] of newParamsList) {
            if ((params.get(key as string) ?? '') !== val) {
                changed = true
            }
            if (val === '') {
                params.delete(key as string)
            } else {
                params.set(key as string, val)
            }
        }
        const newParams = params.toString()
        if (changed) {
            router.push(pathname + '?' + newParams)
        }
    }
    const setSearch = (key: keyof T, value: string) =>
        setSearchs([[key, value]])

    return {
        setSearch,
        setSearchs,
    }
}

export default useSetSearchParams
