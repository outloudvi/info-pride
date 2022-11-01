export default function lfToBr(str: string): JSX.Element {
    const split = str.split('\n')
    const ret = []
    for (let i = 0; i < split.length; i++) {
        ret.push(split[i])
        if (i + 1 !== split.length) {
            ret.push(<br />)
        }
    }
    return <>{ret}</>
}
