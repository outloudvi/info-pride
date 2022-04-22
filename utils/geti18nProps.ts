import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const getI18nProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'vendor'])),
    },
  }
}

export default getI18nProps
