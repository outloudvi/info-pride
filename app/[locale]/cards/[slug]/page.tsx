import { redirect } from 'next/navigation'

/**
 * Redirecting /cards/[slug] to /card/[slug] for uniformity.
 */
const CardsRedirect = async ({
    params,
}: {
    params: Promise<{
        locale: string
        slug: string
    }>
}) => {
    const { locale, slug } = await params
    redirect(`/${locale}/card/${slug}`)

    return <></>
}

export default CardsRedirect
