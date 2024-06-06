import {atom, useAtom} from 'jotai';

export type Dot = {x: number, y: number};

export const dotsAtom = atom<Dot[]>([]);

export const useDotsAtom = () => useAtom(dotsAtom);

const setDotsAtom = atom(null, (_get, set, dot: Dot | null) => {
  if (dot === null) {
    set(dotsAtom, []);
  } else {
    set(dotsAtom, prev => [...prev, dot]);
  }
});

export const useSetDotsAtom = () => useAtom(setDotsAtom);