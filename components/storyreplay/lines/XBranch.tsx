import { useTranslations } from 'next-intl'
import { Button } from '@mantine/core'
import { Fragment, useContext, useEffect, useState } from 'react'

import type { XBranch } from '../types'
import { displayLine } from '../StoryReplayView'
import Box from '../Box'
import StoryContext from '../StoryContext'

const CompXBranch = ({
    l,
    backgroundGroup,
    index,
}: {
    l: XBranch
    backgroundGroup: Record<string, string>
    index: string
}) => {
    const $t = useTranslations('storyreplay')
    const [sel, setSel] = useState(0)
    const storyContext = useContext(StoryContext)

    useEffect(() => {
        const currSelection = storyContext.get(index)
        if (currSelection !== null) {
            setSel(currSelection)
        }
    }, [storyContext, index])

    return (
        <>
            <Box>
                <span className="text-gray-300 float-right">#{index}</span>
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
                                storyContext.set(index, key)
                            }}
                        >
                            {choice.choiceText ?? key + 1}
                        </Button>
                    ))}
                </div>
            </Box>
            <div
                className={`${
                    index.includes('.') ? 'border-pink-600' : 'border-pink-300'
                } border-0 border-l-4 border-solid pl-2`}
            >
                {l.branches[sel].lines.map((line, key) => (
                    <Fragment key={key}>
                        {displayLine(line, backgroundGroup, `${index}.${key}`)}
                    </Fragment>
                ))}
            </div>
        </>
    )
}

export default CompXBranch
