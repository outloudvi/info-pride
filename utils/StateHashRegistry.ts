import { createBrowserHistory } from 'history'

const CurrentState: Record<string, string> = {}
const isClientSide = typeof window !== 'undefined'
const history = isClientSide ? createBrowserHistory() : undefined
const Listeners: Record<string, ((s: string) => void)[]> = {}

let initialStateRequested = false

history?.listen(({ location: { hash } }) => {
  const items = parseHash(hash)
  for (const [k, v] of Object.entries(items)) {
    if (CurrentState[k] === v) continue
    CurrentState[k] = v
    if (Listeners[k]) {
      for (const actor of Listeners[k]) {
        actor(v)
      }
    }
  }
})

function mergeHash(r: Record<string, string>): string {
  return (
    '#' +
    Object.entries(r)
      .filter(([k, v]) => Boolean(k) && Boolean(v))
      .map(([k, v]) => k + '=' + v)
      .join('&')
  )
}

function parseHash(hash: string): Record<string, string> {
  const h = hash.replace(/^#/, '').split('&')
  const ret: Record<string, string> = {}
  for (const i of h) {
    const [k, v] = i.split('=')
    ret[k] = v
  }
  return ret
}

function updateHashStates() {
  if (!history) return
  history.push({
    hash: mergeHash(CurrentState),
  })
}

function set(key: string, value: string) {
  CurrentState[key] = value
  updateHashStates()
}

function listen(key: string, act: (s: string) => void) {
  if (!Listeners[key]) Listeners[key] = []
  Listeners[key].push(act)
}

function getInitialHashStates() {
  if (initialStateRequested) return
  if (!history) return
  const items = parseHash(history.location.hash)
  for (const [k, v] of Object.entries(items)) {
    CurrentState[k] = v
  }
  initialStateRequested = true
}

function getInitialHashState(name: string): string | undefined {
  getInitialHashStates()
  return CurrentState[name]
}

export default {
  set,
  listen,
  getInitialHashState,
}
