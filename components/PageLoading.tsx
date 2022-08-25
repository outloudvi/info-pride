import { Progress } from '@mantine/core'

const PageLoading = ({
    data,
}: {
    data: Record<string, unknown | undefined>
}) => {
    return (
        <>
            <div>
                正在加载数据：完成{' '}
                {Object.values(data).filter((x) => x !== undefined).length}/
                {Object.keys(data).length}
            </div>
            <Progress
                value={
                    (Object.values(data).filter((x) => x !== undefined).length /
                        Object.keys(data).length) *
                    100
                }
            />
        </>
    )
}

export default PageLoading
