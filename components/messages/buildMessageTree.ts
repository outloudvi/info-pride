import { MessageDetail } from 'hoshimi-types/ProtoMaster'

export default function buildMessageTree(msgs: MessageDetail[]): {
  msgs: MessageDetail[]
  backlinks: Record<string, string[]>
} {
  if (msgs.length === 0) return { msgs: [], backlinks: {} }
  const ret: MessageDetail[] = []
  const backlinks: Record<string, string[]> = {}
  const queuedMessageIds = new Set()
  const queue: MessageDetail[] = [msgs[0]]
  for (let _ = 0; _ < msgs.length; _++) {
    const curr = queue.shift()
    if (!curr) break
    const nextMesssages = curr?.nextMessageDetailIds
    ret.push(curr)
    if (!nextMesssages) continue
    for (const i of nextMesssages) {
      if (!backlinks[i]) backlinks[i] = []
      backlinks[i].push(curr.messageDetailId)
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
    backlinks,
  }
}
