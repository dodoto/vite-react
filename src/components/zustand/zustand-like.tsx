import { useState, FC, useEffect, memo } from 'react';
import { Button, Text } from '@chakra-ui/react';

const createStore: <T>(initialState: T) => {
  setState: (nextState: T) => void
  getState: () => T
  subscribe: (callback: () => void) => () => void
} = (initialState) => {
  let state = initialState;
  const listeners = new Set<() => void>()
  const getState = () => state;
  const setState = (nextState: typeof state) => {
    state = nextState
    listeners.forEach(listener => listener())
  }
  
  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return { getState, setState, subscribe }
}

let moduleState = { count: 0 };

const store = createStore(moduleState)

const useStore = () => {
  const [state, setState] = useState(store.getState())

  // add listner when child component set state trigger rerender
  useEffect(() => {
    const callback = () => {
      setState(store.getState())
    }

    const unsubscribe = store.subscribe(callback)
    return unsubscribe
  }, [])

  return state;
};

const IncCounter = () => {
  const inc = () => {
    const nextState = { count: store.getState().count + 1 };
    store.setState(nextState);
  };

  return (
    <Button onClick={inc}>+1</Button>
  );
};

const DesCounter = () => {
  const des = () => {
    const nextState = {count: store.getState().count - 1 };
    store.setState(nextState);
  };

  return (
    <Button onClick={des}>-1</Button>
  );
};

export const TestCounter: FC = () => {
  const state = useStore();

  return (
    <>
      <Text>{state.count}</Text>
      <IncCounter />
      <DesCounter />
    </>
  )
}

