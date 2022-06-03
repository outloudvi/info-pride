import path from 'node:path'

export const i18n = {
  // "H" in "Hans" MUST be UPPERCASED
  defaultLocale: 'zh-Hans',
  locales: ['zh-Hans'],
  localePath: path.resolve('./public/locales'),
}
