import { Paper, NavLink } from '@mantine/core'

const KoiPartsList = ({
    parts,
    baseId,
    currentPartId,
}: {
    parts: Record<string, string>
    baseId: string
    currentPartId: string
}) => {
    return (
        <Paper
            shadow="xs"
            p="xs"
            radius="md"
            className="hidden lg:block fixed -mt-1 left-2"
        >
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
