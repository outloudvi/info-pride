'use client'

import {
    Grid,
    GridCol,
    NativeSelect,
    NavLink,
    ScrollArea,
    Skeleton,
} from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import PhotoAioItem from './PhotoAioItem'

import useApi from '#utils/useApi'

const PhotoAioView = ({ names }: { names: string[] }) => {
    const $t = useTranslations('photos')

    const [selectedName, setSelectedName] = useState(names[0])
    const [selectedPhoto, setSelectedPhoto] = useState('')
    const { data: photos, isFetched } = useApi('Photo/AIO/List', {
        name: selectedName,
    })
    const { data: photoData } = useApi(
        'Photo/AIO',
        {
            id: selectedPhoto,
        },
        {
            enabled: selectedPhoto !== '',
        },
    )

    return (
        <>
            <NativeSelect
                data={names}
                value={selectedName}
                onChange={(event) => setSelectedName(event.currentTarget.value)}
                label={$t('Character Group')}
            />
            <Grid gutter={20} className="my-3">
                <GridCol span={{ base: 12, lg: 3 }}>
                    <ScrollArea style={{ height: 'min(1200px, 70vh)' }}>
                        {isFetched
                            ? (photos ?? []).map((item, key) => (
                                  <NavLink
                                      key={key}
                                      active={item.id === selectedPhoto}
                                      variant="light"
                                      onClick={() => {
                                          setSelectedPhoto(item.id)
                                      }}
                                      label={item.placeName}
                                      description={item.eventName}
                                  />
                              ))
                            : $t('loading_photo_list')}
                    </ScrollArea>
                </GridCol>
                <GridCol span={{ base: 12, lg: 9 }}>
                    {selectedPhoto ? (
                        photoData ? (
                            <PhotoAioItem data={photoData} />
                        ) : (
                            <Skeleton height={300} />
                        )
                    ) : (
                        <p>{$t('select_a_photo')}</p>
                    )}
                </GridCol>
            </Grid>
        </>
    )
}

export default PhotoAioView
