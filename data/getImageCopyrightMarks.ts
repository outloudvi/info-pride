export default function getCopyrightMarks(id: string): string[] {
    var ret = ['© PIP']
    if (id.includes('mku') || id.includes('ymk') || id.includes('miku')) {
        ret.push('© CFM') // Crypton Future Media
        return ret
    }

    if (
        id.includes('chk') ||
        id.includes('rik') ||
        id.includes('yo') ||
        id.includes('sush')
    ) {
        ret.push('© 2017 PL!S') // Project Love Live! Superstar
        return ret
    }

    if (
        id.includes('chk') ||
        id === 'card-ai-02-eve-01' ||
        id.includes('kion')
    ) {
        ret.push('© K-H/S') // K-ON!
        return ret
    }

    if (id.includes('hruh') || id === 'card-ski-02-eve-01') {
        ret.push('© 2006 N·N/SOS') // The Melancholy of Haruhi Suzumiya
        return ret
    }

    return ret
}
