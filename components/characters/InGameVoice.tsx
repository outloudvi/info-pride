import { Grid, NativeSelect } from '@mantine/core'
import { useState } from 'react'

import AssetAudio from '#components/AssetAudio'

const VoiceSlugs: [string, string][] = [
    ['QualiArts', 'sud_vo_cmn_%s_corp-01'],
    ['标题', 'sud_vo_other_%s_title-01'],
    ['标题后半', 'sud_vo_other_%s_title-shout-01'],
    ['礼物', 'sud_vo_cmn_%s_transit-gift-top'],
    ['商店', 'sud_vo_cmn_%s_transit-shop-top'],
]

const InGameVoice = ({ charaId }: { charaId: string }) => {
    const charaShortId = charaId.replace(/^char-/, '')
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
                        label="选择音频"
                    />
                </span>
            </Grid.Col>
            <Grid.Col>{voiceSlug && <AssetAudio id={voiceSlug} />}</Grid.Col>
        </Grid>
    )
}

export default InGameVoice
