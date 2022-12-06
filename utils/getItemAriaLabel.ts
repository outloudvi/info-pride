export default function getItemAriaLabel(
    page: number | 'dots' | 'prev' | 'next' | 'first' | 'last'
): string {
    if (typeof page === 'number') {
        return `Page ${page}`
    }
    return page[0].toUpperCase() + page.slice(1)
}
