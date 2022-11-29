import { Button, Group } from '@mantine/core'
import { useTranslations } from 'next-intl'
import type { Dispatch, SetStateAction } from 'react'

import type { EditorPref } from './types'

const EditorMenu = ({
    setPref,
}: {
    setPref: Dispatch<SetStateAction<EditorPref>>
}) => {
    const $t = useTranslations('mtalk')
    return (
        <Group className="m-2">
            <Button
                onClick={() => {
                    setPref((x) => ({
                        ...x,
                        editMode: !x.editMode,
                    }))
                }}
            >
                {$t('Toggle Editor Mode')}
            </Button>
        </Group>
    )
}

export default EditorMenu
