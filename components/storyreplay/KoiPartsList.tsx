import { Paper, NavLink } from '@mantine/core'
import { useTranslations } from 'next-intl'

const KoiPartsList = ({
    parts,
    baseId,
    currentPartId,
}: {
    parts: Record<string, string>
    baseId: string
    currentPartId: string
}) => {
    const $t = useTranslations('storyreplay')

    return (
        <Paper
            shadow="xs"
            p="xs"
            radius="md"
            className="hidden lg:block fixed -mt-1 left-2"
        >
            <div className="text-center mb-2">{$t('Related stories')}</div>
            {Object.entries(parts).map(([partId, text], index) => (
                <NavLink
                    key={index}
                    href={`/story/${baseId}-${partId}`}
                    active={currentPartId === partId}
                    variant="light"
                    label={text}
                />
            ))}
        </Paper>
    )
}

export default KoiPartsList
