import {useRef, MouseEventHandler, useEffect, useState, useCallback} from 'react';
import {HSLpaletteMarker, ExposeMarkerRef} from './hsl-palette-marker';

type DocumentMouseEventListener = (this: Document, ev: MouseEvent) => any

type DragEvent = {
  startX: number;
  startY: number;
  startPositionX: number;
  startPositionY: number;
  translateX: number;
  translateY: number;
  isDragable: boolean;
  centerX: number;
  centerY: number;
  angle: number;
};

const PALETTE_CENTER = {x: 100, y: 100};

const getBoundary = (translateX: number, translateY: number) => {
  // 获取角度
  const angle = Math.atan2(PALETTE_CENTER.y - translateY, translateX - PALETTE_CENTER.x) * 180 / Math.PI;
  // 获取圆周坐标
  const x = 100 * Math.cos(angle * Math.PI / 180);
  const y = 100 * Math.sin(angle * Math.PI / 180);
  // 换算成 marker 坐标
  return {
    x: PALETTE_CENTER.x + x,
    y: PALETTE_CENTER.y - y,   // 和实际坐标是相反的
    a: angle,
  };
};

const getFixedTrans = (translateX: number, translateY: number) => {
  const {x, y, a} = getBoundary(translateX, translateY);
  if (x < PALETTE_CENTER.x) {
    translateX = Math.max(x, translateX);
  } else {
    translateX = Math.min(x, translateX);
  }
  if (y < PALETTE_CENTER.y) {
    translateY = Math.max(y, translateY);
  } else {
    translateY = Math.min(y, translateY);
  }
  return {x: translateX, y: translateY, a};
};

export const HSLpalette = () => {
  const [h, setH] = useState(0);
  const backgroundStyle = {
    backgroundColor: `hsl(${h}, 100%, 50%)`, 
  };
  const markerRef = useRef<ExposeMarkerRef>(null);
  const drag = useRef<DragEvent>({
    startX: 0,
    startY: 0,
    startPositionX: PALETTE_CENTER.x,
    startPositionY: PALETTE_CENTER.y / 2,
    translateX: 0,
    translateY: 0,
    isDragable: false,
    centerX: 0,
    centerY: 0,
    angle: 0,
  });

  const handleDragStart: MouseEventHandler<HTMLDivElement> = useCallback(evt => {
    // console.log('drag start');
    drag.current.isDragable = true;
    const {clientX, clientY} = evt;
    drag.current.startX = clientX;
    drag.current.startY = clientY;

    const handleDrag: DocumentMouseEventListener = evt => {
      const {isDragable, startX, startY, startPositionX, startPositionY} = drag.current;
      const {clientX, clientY} = evt; 
      const {marker} = markerRef.current!;
      if (isDragable) {
        let translateX = drag.current.translateX = startPositionX + clientX - startX;
        let translateY = drag.current.translateY = startPositionY + clientY - startY;
        const {x, y, a} = getFixedTrans(translateX, translateY);
        drag.current.angle = a;
        setH(a - 90);
        marker!.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    const handleDragEnd: DocumentMouseEventListener = () => {
      // console.log('drag end');
      const {isDragable, angle} = drag.current; 
      if (isDragable) {
        drag.current.isDragable = false;
        drag.current.startPositionX = drag.current.translateX;
        drag.current.startPositionY = drag.current.translateY;
        console.log(`hsl h = ${angle}`)
      }
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  }, [drag, markerRef]);

  useEffect(() => {
    const {marker} = markerRef.current!;
    const {startPositionX, startPositionY} = drag.current;
    marker!.style.transform = `translate(${startPositionX}px, ${startPositionY}px)`;
  }, []);

  return (
    <>
      <div className="hsl-result" style={backgroundStyle}></div>
      <div className="hsl-palette" onMouseDown={handleDragStart} >
        <HSLpaletteMarker ref={markerRef} />
      </div>
    </>
  );
};
