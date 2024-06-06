import { atom, selector, useRecoilValue, useRecoilState } from "recoil";
import shortid from "shortid";
import { data } from "./todo-data";

export type TodoItem = {
  id: string;
  subject: string;
  done: boolean;
};

export const todoState = atom<{
  colorMode: 'light' | 'dark'
  isAdding: boolean
  list: TodoItem[]
}>({
  key: 'todoState',
  default: {
    colorMode: 'light',
    isAdding: false,
    list: data,
  },
});

// list selector
const todoList = selector({
  key: 'todoList',
  get({get}) {
    return get(todoState).list;
  }
});

export const useTodoList = () => useRecoilValue(todoList);

// color mode selector
const colorMode = selector({
  key: 'colorMode',
  get({get}) {
    return get(todoState).colorMode;
  }
});
export const useColorMode = () => useRecoilValue(colorMode);

// add todo selector
const isAdding = selector({
  key: 'isAdding',
  get({get}) {
    return get(todoState).isAdding;
  }
});
export const useIsAdding = () => useRecoilValue(isAdding);

// get color in the color mode
const getCustomColor = (color: string) => `var(--${color})`;
export const useColorModeValue = (colorL: string, colorD: string) => {
  const colorMode = useColorMode();
  return colorMode === 'light' ? getCustomColor(colorL) : getCustomColor(colorD);
};

// colorModeState
export const useColorModeState = (): ['light' | 'dark', () => void] => {
  const [state, setState] = useRecoilState(todoState);
  return [state.colorMode, () => {
    setState(p => ({...p, colorMode: p.colorMode === 'light' ? 'dark' : 'light'}));
  }];
};

// isAddingState
export const useIsAddingState = (): [boolean, () => void] => {
  const [state, setState] = useRecoilState(todoState);
  return [state.isAdding, () => {
    setState(p => ({...p, isAdding: !p.isAdding}));
  }];
};

// add
export const useAddTodo = () => {
  const [, setState] = useRecoilState(todoState);
  return (subject: string) => setState(p => ({...p, isAdding: false, list: [{ id: shortid(), done: false, subject }, ...p.list]}));
};

// done
export const useDoneTodo = () => {
  const [, setState] = useRecoilState(todoState);
  return (id: string) => setState(p => ({...p, list: p.list.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo)}));
};

// remove
export const useRemoveTodo = () => {
  const [, setState] = useRecoilState(todoState);
  return (id: string) => setState(p => ({...p, list: p.list.filter(todo => todo.id !== id)}));
};

