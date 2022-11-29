import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import type { CharacterIdWithManager } from './types'

import AssetImage from '#components/AssetImage'

const CharacterIcon = ({ id }: { id: CharacterIdWithManager }) =>
    id === '' ? (
        <FontAwesomeIcon
            icon={faUserCircle}
            color="white"
            className="rounded-full ml-2 -mr-2 h-[3rem]"
        />
    ) : (
        <AssetImage
            name={`img_message_icon_${id.split('-')[1]}`}
            ratio={1}
            height="3rem"
            className="rounded-full ml-2"
            alt="Chat icon"
        />
    )

export default CharacterIcon
