import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import type { CharacterIdWithManager } from './types'

import AssetImage from '#components/AssetImage'

const CharacterIcon = ({ id }: { id: CharacterIdWithManager }) =>
    id === '' ? (
        <div className="h-[3rem]">
            <FontAwesomeIcon
                icon={faUserCircle}
                color="white"
                className="rounded-full h-full"
            />
        </div>
    ) : (
        <AssetImage
            name={`img_chr_icon_${id.split('-')[1]}`}
            ratio={1}
            height="3rem"
            alt="Chat icon"
        />
    )

export default CharacterIcon
