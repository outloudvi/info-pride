// sync with updateVendorStrings.mjs
export default function $tp(x: string): string {
    return x.replaceAll('.', '__')
}
