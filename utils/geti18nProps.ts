const getI18nProps =
    (sources: string[] = []) =>
    async () => {
        const _m: Record<string, Record<string, string>> = {}
        for (const i of [...sources, 'common']) {
            _m[i] = (await import(`../locales/zh-Hans/${i}.json`)).default
        }
        return {
            props: {
                _m,
            },
        }
    }

export default getI18nProps
