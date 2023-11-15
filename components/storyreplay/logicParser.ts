type Predicate1 = 'NOT'
type Predicate2 = 'AND' | 'OR'
type Predicate3 = 'EQU'
type Predicate4 = 'TRUE' | 'FALSE'

type Logic1 = [Predicate1, Logic]
type Logic2 = [Predicate2, Logic, Logic]
type Logic3 = [Predicate3, string | number, string | number]
type Logic4 = [Predicate4]
export type Logic = Logic1 | Logic2 | Logic3 | Logic4

function getValue(
    str: string | number,
    context: Record<string, number>,
): number {
    if (typeof str !== 'string') return str
    if (str.startsWith('[') && str.endsWith(']'))
        return context[str.slice(1, -1)]
    return Number(str)
}

function evaluateLogic(logic: Logic, context: Record<string, number>): boolean {
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
    }
    throw new Error(`Non-covered logic: ${JSON.stringify(logic)}`)
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
