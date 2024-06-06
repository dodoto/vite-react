import {useDotsAtom, useSvgColorAtom} from '../atoms';

export const SvgDots = () => {
  const [dots] = useDotsAtom();
  const [svgColor] = useSvgColorAtom();
  return (
    <g>
      {
        dots.map((dot, index) => (
          <circle cx={dot.x} cy={dot.y} r="2" fill={svgColor} key={index} />
        ))
      }
    </g>
  );
};