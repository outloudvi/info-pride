import { Progress } from '@mantine/core'
import { useTranslations } from 'next-intl'

const PageLoading = ({
    data,
}: {
    data: Record<string, unknown | undefined>
}) => {
    const $t = useTranslations('common')
    return (
        <>
            <div>
                {$t('load_progress', {
                    cur: Object.values(data).filter((x) => x !== undefined)
                        .length,
                    total: Object.keys(data).length,
                })}
            </div>
            <Progress
                value={
                    (Object.values(data).filter((x) => x !== undefined).length /
                        Object.keys(data).length) *
                    100
                }
                aria-label="Progress"
            />
        </>
    )
}

export default PageLoading
