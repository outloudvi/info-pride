interface LocaleObject {
    [key: string]: string | LocaleObject
}

const localeStrings: () => Promise<
    Record<string, LocaleObject>
> = async () => ({
    en: await import('./en/0000').then((x) => x.default),
    'zh-Hans': await import('./zh-Hans/0000').then((x) => x.default),
})

export default await localeStrings()
