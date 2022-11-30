import { useTranslations } from 'next-intl'
import { Group } from '@mantine/core'
import type { Dispatch, SetStateAction } from 'react'

import type { CharacterIdWithManager } from './types'
import CharacterIcon from './CharacterIcon'

import type { CharacterId } from '#data/vendor/characterId'

const CharacterItem = ({
    id,
    active,
    setActive,
}: {
    id: CharacterId | ''
    active: boolean
    setActive: Dispatch<SetStateAction<CharacterIdWithManager>>
}) => {
    const $vc = useTranslations('v-chr')
    const $tm = useTranslations('messages')

    return (
        <Group
            className={`py-2 ${active ? 'bg-blue-800' : ''}`}
            onClick={() => setActive(id)}
        >
            <div className="ml-2">
                <CharacterIcon id={id} />
            </div>
            <div>
                <b className="text-white">
                    {id === '' ? $tm('Manager') : $vc(id)}
                </b>
            </div>
        </Group>
    )
}

export default CharacterItem
