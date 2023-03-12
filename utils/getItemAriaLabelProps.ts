export default function getItemAriaLabelProps(
    page: number | 'dots' | 'prev' | 'next' | 'first' | 'last'
): {
    'aria-label': string
} {
    if (typeof page === 'number') {
        return {
            'aria-label': `Page ${page}`,
        }
    }
    return {
        'aria-label': page[0].toUpperCase() + page.slice(1),
    }
}
