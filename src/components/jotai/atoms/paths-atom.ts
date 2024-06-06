import {atom, useAtom} from 'jotai';
import {dotsAtom} from './dots-atom';
import {svgColorAtom} from './color-atom';

export type Path = {id: string; d: string, color: string};

const pathsAtom = atom<Path[]>([]);

export const usePathsAtom = () => useAtom(pathsAtom);

const setPathsAtom = atom(
  null,
  (get, set) => {
    const dots = get(dotsAtom);
    const color = get(svgColorAtom);
    if (dots.length > 1) {
      let d = '';
      for (let i = 0; i < dots.length; i++) {
        const {x, y} = dots[i];
        if (d === '') {
          d = `M ${x} ${y}`;
        } else {
          d += ` L ${x} ${y}`;
        }
      }
      set(pathsAtom, prev => {
        return [...prev, {id: `${+new Date()}`, d, color}];
      });
    }
  },
);

export const useSetPathsAtom = () => useAtom(setPathsAtom);

const selectedPathIdAtom = atom('');

export const useSelectedPathIdAtom = () => useAtom(selectedPathIdAtom);

const setSelectedPathIdAtom = atom(
  null,
  (_get, set, id: string) => {
    set(selectedPathIdAtom, id);
  }
);

export  const useSetSelectedPathIdAtom = () => useAtom(setSelectedPathIdAtom);

const deletePathsAtom = atom(
  null,
  (get, set, type: 0 | 1) => {
    set(pathsAtom, prev => {
      // delete all
      if (type === 0) {
        return [];
      } else {
      // delete selected  
        const id = get(selectedPathIdAtom);
        if (id) {
          return prev.filter(path => path.id !== id);
        } else {
          console.log('no path selected');
          return prev;
        }
      }
    })
  },
);

export const useDeletePathsAtom = () => useAtom(deletePathsAtom);
