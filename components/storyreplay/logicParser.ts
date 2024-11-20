type Predicate1 = 'NOT'
type Predicate2 = 'AND' | 'OR'
type Predicate3 = 'EQU'
type Predicate4 = 'TRUE' | 'FALSE'
type Predicate5 = 'EVAL'

type Op = '+' | '-' | '*' | '/' | '>' | '<' | '='
type NumberOrCtxNumber = number | `[${string}]`
type NumberLike = readonly [NumberLike, Op, NumberLike] | NumberOrCtxNumber

type Logic1 = readonly [Predicate1, Logic]
type Logic2 = readonly [Predicate2, Logic, Logic]
type Logic3 = readonly [Predicate3, NumberOrCtxNumber, NumberOrCtxNumber]
type Logic4 = readonly [Predicate4]
type Logic5 = readonly [Predicate5, NumberLike]
export type Logic = Logic1 | Logic2 | Logic3 | Logic4 | Logic5

function getValue(
    str: `[${string}]` | number,
    context: Record<string, number>,
): number {
    if (typeof str !== 'string') return str
    if (str.startsWith('[') && str.endsWith(']'))
        return context[str.slice(1, -1)] ?? 0
    return Number(str)
}

export function evaluateLogic(
    logic: Logic,
    context: Record<string, number>,
): boolean {
    const [pred, left, right] = logic
    switch (pred) {
        case 'TRUE':
            return true
        case 'FALSE':
            return false
        case 'AND':
            return evaluateLogic(left, context) && evaluateLogic(right, context)
        case 'OR':
            return evaluateLogic(left, context) || evaluateLogic(right, context)
        case 'EQU':
            return getValue(left, context) === getValue(right, context)
        case 'NOT':
            return !evaluateLogic(left, context)
        case 'EVAL':
            return evaluate(left, context) > 0
    }
    throw new Error(`Non-covered logic: ${JSON.stringify(logic)}`)
}

export function evaluate(
    exp: NumberLike,
    context: Record<string, number>,
): number {
    if (typeof exp === 'number') {
        return exp
    }
    if (typeof exp === 'string') {
        return getValue(exp, context)
    }
    const [left, op, right] = exp
    switch (op) {
        case '+': {
            return evaluate(left, context) + evaluate(right, context)
        }
        case '-': {
            return evaluate(left, context) - evaluate(right, context)
        }
        case '*': {
            return evaluate(left, context) * evaluate(right, context)
        }
        case '/': {
            return evaluate(left, context) / evaluate(right, context)
        }
        case '>': {
            return evaluate(left, context) > evaluate(right, context) ? 1 : 0
        }
        case '<': {
            return evaluate(left, context) < evaluate(right, context) ? 1 : 0
        }
        case '=': {
            return evaluate(left, context) === evaluate(right, context) ? 1 : 0
        }
    }
    throw new Error('Unrecognized op')
}

export default function runLogics(
    rules: [Logic, string | null][],
    context: Record<string, number>,
): string | null {
    for (const [logic, result] of rules) {
        if (evaluateLogic(logic, context)) {
            return result
        }
    }
    throw new Error('No finalized condition')
}
