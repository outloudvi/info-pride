'use client'

import { Grid, NativeSelect } from '@mantine/core'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import AssetAudio from '#components/AssetAudio'

const InGameVoice = ({ charaId }: { charaId: string }) => {
    const $t = useTranslations('characters')
    const charaShortId = charaId.replace(/^char-/, '')

    const VoiceSlugs: [string, string][] = [
        [$t('QualiArts'), 'sud_vo_cmn_%s_corp-01'],
        [$t('Title'), 'sud_vo_other_%s_title-01'],
        [$t('After title'), 'sud_vo_other_%s_title-shout-01'],
        [$t('Gifts'), 'sud_vo_cmn_%s_transit-gift-top'],
        [$t('Store'), 'sud_vo_cmn_%s_transit-shop-top'],
    ]
    const [selectedVoice, setSelectedVoice] = useState(VoiceSlugs[0][0])

    const [, voiceSlugSuffix] =
        VoiceSlugs.find((x) => x[0] === selectedVoice) ?? []

    const voiceSlug = voiceSlugSuffix?.replace('%s', charaShortId)

    // No hooks below

    return (
        <Grid>
            <Grid.Col span={6}>
                <span>
                    <NativeSelect
                        data={VoiceSlugs.map((x) => x[0])}
                        value={selectedVoice}
                        onChange={(event) =>
                            setSelectedVoice(event.currentTarget.value)
                        }
                        label={$t('Audio type')}
                    />
                </span>
            </Grid.Col>
            <Grid.Col>{voiceSlug && <AssetAudio id={voiceSlug} />}</Grid.Col>
        </Grid>
    )
}

export default InGameVoice
