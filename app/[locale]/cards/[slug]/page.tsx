import { redirect } from 'next/navigation'

/**
 * Redirecting /cards/[slug] to /card/[slug] for uniformity.
 */
const CardsRedirect = ({
    params: { locale, slug },
}: {
    params: {
        locale: string
        slug: string
    }
}) => {
    redirect(`/${locale}/card/${slug}`)

    return <></>
}

export default CardsRedirect
