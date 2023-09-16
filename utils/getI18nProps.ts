const getI18nProps =
    (sources: string[] = []) =>
    async ({ locale }: { locale: string }) => {
        return {
            props: {
                ...(await addI18nMessages(locale, sources)),
            },
        }
    }

export const getI18nMessages = async (
    locale: string,
    source: string,
    key: string,
) => import(`../locales/${locale}/${source}.json`).then((x) => x.default?.[key])

export const addI18nMessages = async (
    locale: string,
    sources: string[] = [],
) => {
    const _m: Record<string, Record<string, string>> = {}
    for (const i of [...sources, 'common']) {
        _m[i] = (await import(`../locales/${locale}/${i}.json`)).default
    }
    return {
        _m,
    }
}

export default getI18nProps
