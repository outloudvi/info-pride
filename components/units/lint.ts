/* eslint-disable import/order */

import type { Skill } from 'hoshimi-types/ProtoMaster'
import type { LintMessage } from './types'

// linting rules
import spAbsentWhenNeeded from './rules/sp-absent-when-needed'
import ctOvertime from './rules/ct-overtime'
import { useTranslations } from 'next-intl'

const rules = [spAbsentWhenNeeded, ctOvertime]

export default function lint(
    skills: Skill[],
    chartLine: number[],
    defaultMessage: string = '一切正常。'
): LintMessage[] {
    // TODO: inter-track effects

    if (skills.length < 3) {
        // TODO: report to Sentry
        console.warn('Skill not enough.')
    }

    const messages: LintMessage[] = rules
        .map((ruleFunc) => ruleFunc(skills, chartLine) ?? [])
        .reduce((a, b) => [...a, ...b])

    if (messages.length === 0) {
        messages.push({
            text: defaultMessage,
            severity: 0,
        })
    }
    return messages
}
