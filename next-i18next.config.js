/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('node:path')

module.exports = {
  i18n: {
    // "H" in "Hans" MUST be UPPERCASED
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
    localePath: path.resolve('./public/locales'),
  },
}
