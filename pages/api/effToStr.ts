import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { EffectWithTarget } from 'hoshimi-types/Skillx'
import handlebars from 'handlebars'

import apiData from 'locales/apiData'

import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import { DEFAULT_LANGUAGE } from '#utils/constants'
import setupHbs from '#utils/setupHbs'

setupHbs(handlebars)

const SkillxTemplates = apiData.skillX
const SkillxParts = apiData.skillXParts

function parseTrigger(trigger: string, locale: string): string {
    const parts = trigger.split('-').slice(1) // it always starts with "tg-"
    return handlebars.compile(
        SkillxParts?.[locale][parts[0]] ?? `TG-${parts[0]}`
    )({
        ...parts,
        locale,
    })
}

const EffToStr = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['effToStr']>
) => {
    const body: (Omit<EffectWithTarget, 'owner'> & { trigger?: string })[] =
        req.body
    const locale = req.query.locale
        ? pickFirstOrOne(req.query.locale)
        : DEFAULT_LANGUAGE
    if (body === null || !Array.isArray(body)) {
        res.status(400).json({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-errors
            message: 'Invalid body',
        })
        return
    }
    res.status(200).json(
        body.map((x) => {
            const trigger = x.trigger
                ? handlebars.compile(SkillxParts?.[locale]?.['_when'])({
                      text: parseTrigger(x.trigger, locale),
                      locale,
                  })
                : ''
            const target = handlebars.compile(
                SkillxTemplates?.[locale][x.target.typ] ?? `T-${x.target.typ}`
            )({
                ...x.target,
                locale,
            })
            const skill = handlebars.compile(
                SkillxTemplates?.[locale][x.effect.typ] ?? `E-${x.effect.typ}`
            )({
                ...x.effect,
                locale,
            })
            const prefixString = [trigger, target]
                .filter((x) => x.length > 0)
                .map((x) => `[${x}]`)
                .join('')
            return `${prefixString ? `${prefixString} ` : ''}${skill}`
        })
    )
}

export default withSentry(EffToStr)

export const config = {
    api: {
        externalResolver: true,
    },
}
