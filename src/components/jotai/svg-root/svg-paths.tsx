import {memo} from 'react';
import {
  usePathsAtom,
  useSelectedPathIdAtom,
  useSetSelectedPathIdAtom,
  Path,
} from '../atoms';

const SvgPath = memo(({id, d, selected, color}: Path & {selected: boolean}) => {
  // @ts-ignore
  const [, setPathId] = useSetSelectedPathIdAtom(); 
  const opacity = selected ? '0.3' : '0';
  const selectedPath = () => {
    setPathId(id);
  };

  return (
    <g onClick={selectedPath}>
      <path 
        fill="none"
        strokeWidth="12"
        d={d} 
        opacity={opacity}
        stroke={color}/>
      <path
        fill="none"
        strokeWidth="4" 
        d={d} 
        stroke={color}/>
    </g>
  );
});

export const SvgPaths = () => {
  const [paths] = usePathsAtom();
  const [pathId] = useSelectedPathIdAtom();

  return (
    <>
      {
        paths.map(path => (
          <SvgPath {...path} selected={pathId === path.id} key={path.id}/>
        ))
      }
    </>
  );
};