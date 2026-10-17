import type { MessageDetail } from 'hoshimi-types/ProtoMaster'

/**
 * Records which option the user picked at a branch point:
 * `{ [branching messageDetailId]: optionIndex }`.
 */
export type BranchSelection = Record<string, number>

export type BranchPoint = {
    /**
     * The id of the message that offers the choices. The choices themselves are
     * its `nextMessageDetailIds`.
     */
    nodeId: string
    /**
     * The messages the user can pick from. They are always Manager (self)
     * messages.
     */
    options: MessageDetail[]
    /**
     * The index of the option that is currently displayed. Guaranteed to be a
     * valid index into `options`.
     */
    selected: number
}

export type MessagePath = {
    /** The messages to display on the currently selected path, in order. */
    msgs: MessageDetail[]
    /**
     * The branch points met on the current path, keyed by the id of the chosen
     * option message. The choice menu is rendered right after that message
     * (i.e. below the user's reply).
     */
    branchAfter: Record<string, BranchPoint>
}

function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
}

/**
 * Walks the message graph from its root, following the user's branch
 * selections. This displays exactly one branch at a time instead of flattening
 * all branches into a single linear log.
 */
export default function buildMessagePath(
    details: MessageDetail[],
    selections: BranchSelection = {},
): MessagePath {
    if (details.length === 0) return { msgs: [], branchAfter: {} }

    const byId = new Map(details.map((d) => [d.messageDetailId, d]))
    const msgs: MessageDetail[] = []
    const branchAfter: Record<string, BranchPoint> = {}
    // Guards against accidental cycles in malformed data.
    const visited: Set<string> = new Set()

    // `details[0]` is always the root of the conversation.
    let current: MessageDetail | undefined = details[0]

    while (current && !visited.has(current.messageDetailId)) {
        visited.add(current.messageDetailId)
        msgs.push(current)

        const nextIds = (current.nextMessageDetailIds ?? []).filter((id) =>
            byId.has(id),
        )

        if (nextIds.length === 0) break

        if (nextIds.length === 1) {
            current = byId.get(nextIds[0])
            continue
        }

        const options = nextIds.map((id) => byId.get(id) as MessageDetail)
        const selected = clamp(
            selections[current.messageDetailId] ?? 0,
            0,
            options.length - 1,
        )
        const chosen = options[selected]
        branchAfter[chosen.messageDetailId] = {
            nodeId: current.messageDetailId,
            options,
            selected,
        }
        current = chosen
    }

    return { msgs, branchAfter }
}
