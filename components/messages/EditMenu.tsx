import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Tooltip } from '@mantine/core'
import { useTranslations } from 'next-intl'

const EditMenu = ({ deleteThis }: { deleteThis: () => void }) => {
    const $t = useTranslations('messages')
    return (
        <>
            <Tooltip label={$t('Delete')}>
                <ActionIcon
                    variant="outline"
                    className="ml-2"
                    onClick={() => {
                        deleteThis()
                    }}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        color="white"
                        aria-label={$t('Delete')}
                    />
                </ActionIcon>
            </Tooltip>
        </>
    )
}

export default EditMenu
