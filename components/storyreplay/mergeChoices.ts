import type { Branch, BranchGroup, ChoiceGroup } from '@hoshimei/adv/types'

import type { CompositeLine, MergedLine, BranchItem } from './types'

/**
 * Read {consumeCount} lines of instructions.
 *
 * @param lines The instructions.
 * @param consumeCount The limit of lines to read.
 * @returns The results as well as the next line to read (after reaching the limit).
 */
export default function mergeChoices(
    lines: readonly CompositeLine[],
    consumeCount?: number,
): [MergedLine[], number] {
    const ret: MergedLine[] = []
    let consumedLinesCnt = 0
    for (let i = 0; i < lines.length; i++) {
        if (consumedLinesCnt === consumeCount) {
            return [ret, i]
        }
        const item = lines[i]
        if (item._t !== 'BranchGroup') {
            // Question: Does BranchGroup/ChoiceGroup count as 1 line?

            if (item._t === 'ChoiceGroup') {
                // let BranchGroup (should be the next) handle this
                consumedLinesCnt += 1
                continue
            }

            ret.push(item)
            consumedLinesCnt += 1
            continue
        }
        const maybeChoiceGroup =
            item.type === 'Choice' ? (lines[i - 1] as ChoiceGroup) : null
        const [branches, continueAt] = readBranches(
            lines,
            i,
            maybeChoiceGroup?.choices,
        )
        ret.push({
            _t: 'XBranch',
            isChoice: maybeChoiceGroup !== null,
            branches,
        })
        consumedLinesCnt += 1
        i = continueAt - 1
    }
    return [ret, lines.length]
}

function readBranches(
    lines: readonly CompositeLine[],
    branchGroupAt: number,
    choices?: string[],
): [BranchItem[], number] {
    const branches: BranchItem[] = []
    const branchGroup = lines[branchGroupAt] as BranchGroup
    let ptr = branchGroupAt
    for (let i = 0; i < branchGroup.groupLength; i++) {
        ptr++
        const branch = lines[ptr] as Branch
        const [branchLines, continueAt] = mergeChoices(
            lines.slice(ptr + 1),
            branch.groupLength,
        )
        branches.push({
            ...(choices ? { choiceText: choices?.[i] } : {}),
            lines: branchLines,
        })
        ptr = ptr + 1 + continueAt - 1
    }
    return [branches, ptr + 1]
}
