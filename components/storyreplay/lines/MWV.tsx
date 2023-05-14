import { useTranslations } from 'next-intl'
import { atom, useAtom } from 'jotai'

import type { MessageWithVoice } from '../types'

import AssetImage from '#components/AssetImage'
import lfToBr from '#utils/lfToBr'
import AssetAudioButton from '#components/AssetAudioButton'
import managerize from '#utils/managerize'

const mwvCurrentPlayingAtom = atom<string | null>(null)

const CompMWV = ({ l }: { l: MessageWithVoice }) => {
    const $t = useTranslations('storyreplay')
    const [currMwv, setCurrMwv] = useAtom(mwvCurrentPlayingAtom)

    const darkText = l.text.startsWith('（') || l.text.endsWith('）')
    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('Message')}
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex md:flex-col items-center md:mr-2 md:w-32">
                    <div className="mr-2 md:mr-0">
                        {l.thumbnail && (
                            <AssetImage
                                name={l.thumbnail}
                                height={40}
                                ratio={1}
                                alt={'Avatar'}
                            />
                        )}
                    </div>
                    <div className="mt-1 bg-blue-300 px-2 rounded text-black">
                        {managerize(l.name)}
                    </div>
                    <div className="grow md:hidden"></div>
                    <div className="md:hidden">
                        <AssetAudioButton id={l.voice} />
                    </div>
                </div>
                <div
                    className={`grow mt-2 md:mt-0 ${
                        darkText ? 'text-[#c0c0c0]' : ''
                    }`}
                >
                    {lfToBr(
                        l.text
                            .replaceAll('\\n', '\n')
                            .replace(/\{user\}/g, $t('Manager'))
                    )}
                </div>
                <div className="hidden md:block">
                    <AssetAudioButton
                        id={l.voice}
                        atom={currMwv}
                        setAtom={setCurrMwv}
                    />
                </div>
            </div>
        </>
    )
}

export default CompMWV
