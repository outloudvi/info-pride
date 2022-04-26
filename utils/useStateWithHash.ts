import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import isFunction from 'lodash/isFunction'
import StateHashRegistry from './StateHashRegistry'

type Serializer<S> = (s: S) => string
type Deserializer<S> = (s: string) => S | undefined

function useStateWithHash<S>(
  initialState: S | (() => S),
  {
    name,
    serialize,
    deserialize,
  }: {
    name: string
    serialize: Serializer<S>
    deserialize: Deserializer<S>
  }
): [S, Dispatch<SetStateAction<S>>] {
  // only run initialState() once
  const initStateValue = isFunction(initialState)
    ? initialState()
    : initialState

  const [state, setState] = useState(initStateValue)

  // Updated hash -> state
  StateHashRegistry.listen(name, (str) => {
    const v = deserialize(str)
    if (v !== undefined) setState(v)
  })

  // Updated state -> hash
  const setStateWithHash = (sora: SetStateAction<S>) => {
    const nextState = isFunction(sora) ? sora(state) : sora
    setState(nextState)
    StateHashRegistry.set(name, serialize(nextState))
  }

  useEffect(() => {
    // Initial hash -> state
    const hashState = StateHashRegistry.getInitialHashState(name)
    if (hashState !== undefined) {
      const v = deserialize(hashState)
      if (v !== undefined) setStateWithHash(v)
      // Ignore initial state if there is hash
      return
    }

    // Initial state -> hash
    StateHashRegistry.set(name, serialize(initStateValue))
  }, [])

  return [state, setStateWithHash]
}

export default useStateWithHash
