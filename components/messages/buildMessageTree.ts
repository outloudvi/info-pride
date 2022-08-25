import { MessageDetail } from 'hoshimi-types/ProtoMaster'

function findBranchSrc(
    curMsgId: string,
    backlinks: Record<string, string[]>,
    branchedMessageIds: Set<string>
): string | undefined {
    let last = ''
    let cur = curMsgId
    if (branchedMessageIds.has(cur)) {
        // this is a branch
        return undefined
    }
    while (backlinks[cur]) {
        // backlinks[curMsgId] must be nonnull and nonempty
        // but it will happen at cur = 1 (first message)
        // then we return undefined (curMsgId is not in a branch)

        if (branchedMessageIds.has(cur)) {
            // we've found the branch site
            return last
        }

        if (backlinks[cur].length > 1) {
            // It's the end of a branch, don't mark it
            return undefined
        }

        last = cur
        cur = backlinks[cur][0]
    }

    return undefined
}

export default function buildMessageTree(msgs: MessageDetail[]): {
    msgs: MessageDetail[]
    branchSrc: Record<string, string | undefined>
} {
    if (msgs.length === 0) return { msgs: [], branchSrc: {} }
    const ret: MessageDetail[] = []
    const backlinks: Record<string, string[]> = {}
    const branchSrc: Record<string, string | undefined> = {}
    const queuedMessageIds: Set<string> = new Set()
    const branchedMessageIds: Set<string> = new Set()
    const queue: MessageDetail[] = [msgs[0]]
    for (let _ = 0; _ < msgs.length; _++) {
        const curr = queue.shift()
        if (!curr) break
        const nextMesssages = curr?.nextMessageDetailIds
        ret.push(curr)
        if (!nextMesssages) continue
        if (nextMesssages.length > 1) {
            branchedMessageIds.add(curr.messageDetailId)
        }
        for (const i of nextMesssages) {
            if (!backlinks[i]) backlinks[i] = []
            backlinks[i].push(curr.messageDetailId)
            branchSrc[i] = findBranchSrc(i, backlinks, branchedMessageIds)
            const nextMsg = msgs.filter((x) => x.messageDetailId === i)[0]
            if (queuedMessageIds.has(nextMsg.messageDetailId)) {
                continue
            }
            queuedMessageIds.add(nextMsg.messageDetailId)
            queue.push(nextMsg)
        }
    }
    return {
        msgs: ret,
        branchSrc,
    }
}
