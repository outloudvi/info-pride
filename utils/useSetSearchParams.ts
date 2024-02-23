import { useSearchParams } from 'next/navigation'

import { useRouter, usePathname } from '#utils/navigation'

const useSetSearchParams = <T = Record<string, string>>() => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const setSearchs = (newParamsList: [keyof T, string][]) => {
        const params = new URLSearchParams(searchParams.toString())
        for (const [key, val] of newParamsList) {
            params.set(key as string, val)
        }
        const newParams = params.toString()
        router.push(pathname + '?' + newParams)
    }
    const setSearch = (key: keyof T, value: string) =>
        setSearchs([[key, value]])

    return {
        setSearch,
        setSearchs,
    }
}

export default useSetSearchParams
