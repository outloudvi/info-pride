import { getRequestConfig } from 'next-intl/server'

import localeData from '#locales/localeData'

export default getRequestConfig(async ({ locale }) => {
    return {
        messages: localeData?.[locale] ?? {},
    }
})
