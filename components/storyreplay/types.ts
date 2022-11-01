import { Line, Message, Voice } from '@hoshimei/adv/types'

export type MessageWithVoice = { _t: 'MWV' } & Omit<Message, '_t'> &
    Omit<Voice, '_t'>

export type MergedLine = Line | MessageWithVoice
