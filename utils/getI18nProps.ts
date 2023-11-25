import fs from 'node:fs'

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
) =>
    JSON.parse(
        fs.readFileSync(`./locales/${locale}/${source}.json`, 'utf-8'),
    )?.[key]

export const addI18nMessages = async (
    locale: string,
    sources: string[] = [],
) => {
    const _m: Record<string, Record<string, string>> = {}
    for (const i of [...sources, 'common']) {
        _m[i] = JSON.parse(
            fs.readFileSync(`./locales/${locale}/${i}.json`, 'utf-8'),
        )
    }
    return {
        _m,
    }
}

export default getI18nProps
