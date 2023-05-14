import { useTranslations } from 'next-intl'
import { Button } from '@mantine/core'
import { useState } from 'react'

import type { MergedLine, XBranch } from '../types'
import { displayLine } from '../StoryReplayView'
import Box from '../Box'

const CompXBranch = ({
    l,
    backgroundGroup,
}: {
    l: XBranch
    backgroundGroup: Record<string, string>
}) => {
    const $t = useTranslations('storyreplay')
    const [sel, setSel] = useState(0)

    return (
        <>
            <Box>
                <div className="uppercase text-gray-300 text-sm mb-2">
                    {l.isChoice ? $t('ChoiceGroup') : $t('BranchGroup')}
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-2 mx-3">
                    {l.branches.map((choice, key) => (
                        <Button
                            key={key}
                            color={sel === key ? 'green' : 'blue'}
                            onClick={() => {
                                setSel(key)
                            }}
                        >
                            {choice.choiceText ?? key + 1}
                        </Button>
                    ))}
                </div>
            </Box>
            <div className="border-pink-400 border-0 border-l-4 border-solid pl-2">
                {l.branches[sel].lines.map((line, key) => (
                    <div
                        key={key}
                        className="my-1 p-2 text-white bg-[#4c4c4c] rounded"
                    >
                        {displayLine(line, backgroundGroup)}
                    </div>
                ))}
            </div>
        </>
    )
}

export default CompXBranch
