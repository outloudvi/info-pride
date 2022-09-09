import localeList from 'locales/locales'

const getI18nProps =
    (sources: string[] = []) =>
    async () => {
        return {
            props: {
                ...(await addI18nMessages(sources)),
            },
        }
    }

export const addI18nMessages = async (sources: string[] = []) => {
    const _m: Record<string, Record<string, any>> = {}
    for (const loc of localeList.map((x) => x.slug)) {
        for (const i of [...sources, 'common']) {
            if (!_m[loc]) _m[loc] = {}
            _m[loc][i] = (await import(`../locales/${loc}/${i}.json`)).default
        }
    }
    return {
        _m,
    }
}

export default getI18nProps
