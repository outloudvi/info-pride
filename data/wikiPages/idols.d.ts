/**
 * Idol data for wiki.biligame.com/idolypride
 */
export type TheRootSchema = Record<CharacterId, IdolInfo>
/**
 * Information for an idol
 */
export interface IdolInfo {
    nameJa?: string
    nameCn?: string
    birthday?: string
    team?:
        | '月のテンペスト'
        | 'サニーピース'
        | '星见事务所'
        | 'TRINITYAiLE'
        | 'LizNoir'
    cv?: string
    desc?: string
    [k: string]: unknown
}
