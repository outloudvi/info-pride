import type { Line, Message, Voice } from '@hoshimei/adv/types'

export type MessageWithVoice = { _t: 'MWV' } & Omit<Message, '_t'> &
    Omit<Voice, '_t'>

export type AdvFromAsset = {
    v: string
    l: Line[]
}

export type CompositeLine = Line | MessageWithVoice

export type XBranch = {
    _t: 'XBranch'
    isChoice: boolean
    branches: BranchItem[]
}

export type BranchItem = {
    choiceText?: string
    lines: MergedLine[]
}

export type MergedLine = CompositeLine | XBranch
