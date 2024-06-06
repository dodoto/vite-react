import {HSLpalette} from './hsl-palette';
import {HSLpaletteMarker} from './hsl-palette-marker';
import './hsl.css';

export const HSLColorPicker = () => {
  return (
    <div className="hsl-color-picker">
      <HSLpalette />
    </div>
  );
};