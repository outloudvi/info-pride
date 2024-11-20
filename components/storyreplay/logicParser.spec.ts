import { describe, it } from 'mocha'
import { expect } from 'chai'

import { evaluate, evaluateLogic } from './logicParser'

import { yuPointNumber } from '#data/moshikoi/st-love-24-1114'

const okFlag0 = {
    '002:20': 1,
    '002:45': 0,
    '005:20': 1,
    '007:4.60': 0,
}
const okFlag2 = {
    '002:20': 1,
    '002:45': 0,
    '005:20': 1,
    '007:4.60': 1,
}
const badFlag4 = {
    '002:20': 0,
    '002:45': 0,
    '005:20': 0,
    '007:4.60': 0,
}

describe('evaluate', function () {
    it('Moshikoi Yu - Good end', function () {
        expect(evaluate(yuPointNumber, okFlag0)).to.eq(0)
        expect(evaluateLogic(['EVAL', [yuPointNumber, '>', 3]], okFlag0)).to.eq(
            false,
        )

        expect(evaluate(yuPointNumber, okFlag2)).to.eq(2)
        expect(evaluateLogic(['EVAL', [yuPointNumber, '>', 3]], okFlag2)).to.eq(
            false,
        )
    })

    it('Moshikoi Yu - Bad end', function () {
        expect(evaluate(yuPointNumber, badFlag4)).to.eq(4)
        expect(
            evaluateLogic(['EVAL', [yuPointNumber, '>', 3]], badFlag4),
        ).to.eq(true)
    })
})
