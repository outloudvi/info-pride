declare module 'base58' {
    export function base58_to_int(str: string): number
    export function decode(str: string): number
    export function int_to_base58(num: number): string
    export function encode(num: number): string
}
