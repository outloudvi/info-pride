import type { Bgm } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'
import { atom, useAtom } from 'jotai'

import AssetAudio from '#components/AssetAudio'

const bgmCurrentPlayingAtom = atom<string | null>(null)

const CompBgm = ({ l }: { l: Bgm }) => {
    const $t = useTranslations('storyreplay')
    const [currBgm, setCurrBgm] = useAtom(bgmCurrentPlayingAtom)

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('BGM')}
                <div className="mt-1">
                    <AssetAudio
                        id={l.bgm}
                        atom={currBgm}
                        setAtom={setCurrBgm}
                    />
                </div>
            </div>
        </>
    )
}

export default CompBgm
