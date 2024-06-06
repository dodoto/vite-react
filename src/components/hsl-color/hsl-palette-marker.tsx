import {useRef, forwardRef, useImperativeHandle, MouseEventHandler} from 'react';

export type ExposeMarkerRef = {
  marker: HTMLDivElement | null;
};

export const HSLpaletteMarker = forwardRef<ExposeMarkerRef>((_props, ref) => {
  const markerRef = useRef<HTMLDivElement>(null); 
  useImperativeHandle(ref, () => ({
    marker: markerRef.current,
  }), [markerRef]);
  return (
    <div 
      ref={markerRef}
      className="hsl-palette-marker" 
    />
  );
});