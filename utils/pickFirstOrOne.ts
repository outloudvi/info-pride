export default function pickFirstOrOne(s: string | string[]): string {
    return Array.isArray(s) ? s[0] : s
}
