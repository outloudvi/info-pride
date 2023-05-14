import type { Branch, BranchGroup, ChoiceGroup } from '@hoshimei/adv/types'

import type { CompositeLine, MergedLine, BranchItem } from './types'

export default function mergeChoices(lines: CompositeLine[]): MergedLine[] {
    const ret: MergedLine[] = []
    for (let i = 0; i < lines.length; i++) {
        const item = lines[i]
        if (item._t !== 'BranchGroup') {
            if (item._t !== 'ChoiceGroup') {
                ret.push(item)
            }
            continue
        }
        const maybeChoiceGroup = lines[i - 1] as ChoiceGroup | undefined
        const [branches, continueAt] = readBranches(
            lines,
            i,
            maybeChoiceGroup?.choices
        )
        ret.push({
            _t: 'XBranch',
            isChoice: maybeChoiceGroup?._t === 'ChoiceGroup',
            branches,
        })
        i = continueAt - 1
    }
    return ret
}

function readBranches(
    lines: CompositeLine[],
    branchGroupAt: number,
    choices?: string[]
): [BranchItem[], number] {
    const branches: BranchItem[] = []
    const branchGroup = lines[branchGroupAt] as BranchGroup
    let ptr = branchGroupAt
    for (let i = 0; i < branchGroup.groupLength; i++) {
        ptr++
        const branch = lines[ptr] as Branch
        branches.push({
            ...(choices ? { choiceText: choices?.[i] } : {}),
            lines: lines.slice(ptr + 1, ptr + 1 + branch.groupLength),
        })
        ptr += branch.groupLength
    }
    return [branches, ptr + 1]
}
