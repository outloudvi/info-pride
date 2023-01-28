export default function managerize(s: string): string {
    return s === '{user}' ? 'マネジャー' : s
}
