import { Modal, Group } from '@mantine/core'
import { useTranslations } from 'next-intl'
import type { Dispatch, SetStateAction } from 'react'

import AssetImage from '#components/AssetImage'
import useApi from '#utils/useApi'

const InsertStampModal = ({
    visible,
    setVisible,
    insertStamp,
}: {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    insertStamp: (x: string) => void
}) => {
    const $t = useTranslations('mtalk')
    const $c = useTranslations('common')

    const { data: Stamps } = useApi('Stamps')

    return (
        <Modal
            opened={visible}
            onClose={() => setVisible(false)}
            title={$t('Insert a stamp')}
            size="65%"
        >
            <Group>
                {Stamps
                    ? Stamps.map((stampAssetId, key) => (
                          <AssetImage
                              key={key}
                              name={`img_message_stamp_${stampAssetId}`}
                              ratio={1}
                              height="9rem"
                              alt={`Stamp: ${stampAssetId}`}
                              onClick={() => {
                                  insertStamp(stampAssetId)
                                  setVisible(false)
                              }}
                          />
                      ))
                    : $c('loading')}
            </Group>
        </Modal>
    )
}

export default InsertStampModal
