import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon } from '@mantine/core'

const EditMenu = ({ deleteThis }: { deleteThis: () => void }) => {
    return (
        <>
            <ActionIcon
                variant="outline"
                className="ml-2"
                onClick={() => {
                    deleteThis()
                }}
            >
                <FontAwesomeIcon icon={faTrash} color="white" />
            </ActionIcon>
        </>
    )
}

export default EditMenu
