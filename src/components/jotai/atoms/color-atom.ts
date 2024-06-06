import {atom, useAtom} from 'jotai';

/**
 * 如果颜色发生改变, 已经渲染的也会发生改变, 因为所有组件都依赖于这个 atom.
 * 1. 不使用 atom, 直接设置全局对象
 * 2. useEffect<[]> 提取颜色
 * 3. Provider 做隔离, 颜色从 setSvgColorAtom = atom(get => get(useSvgColorAtom), (get, set, color) => void) 获取
 */
export const svgColorAtom = atom('#000000');

export const useSvgColorAtom = () => useAtom(svgColorAtom);

// only get atom
// const selectedSvgColorAtom = atom(get => get(svgColorAtom) + '7D');

// export const useSelectedSvgColorAtom = () => useAtom(selectedSvgColorAtom);

// only write atom: atom(get, (get, set, params) => void) 
const setSvgColorAtom = atom(
  get => get(svgColorAtom), 
  (_get, set, color: string) => {
    set(svgColorAtom, color);
  },
);  

export const useSetSvgColorAtom = () => useAtom(setSvgColorAtom);