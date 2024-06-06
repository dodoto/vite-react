import { VStack,  chakra, Text } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

const ChakraCanvas = chakra("canvas");

const SIZE = 500;
const LINE_LENGTH = 250;
const speed = 0.005 * 10;
const rSpeed = 1;

const drawStick = (pointer1: [number, number], pointer2: [number, number], ctx: CanvasRenderingContext2D) => {
    // draw line
    ctx.beginPath();
    ctx.moveTo(...pointer1);
    ctx.lineTo(...pointer2);
    ctx.stroke();
};

const getSecondPointerPos = (center: [number, number], deg: number, r: number): [number, number] => {
  const x = center[0] + Math.cos(deg) * r;
  const y = center[1] + Math.sin(deg) * r;
  return [x, y];
};

/**
 * 顺时针  minDeg ----> maxDeg 顺时针画
 * 逆时针  maxDeg ----> minDeg 逆时针画
 */

/**
 * 弧线对象 { startDeg, endDeg, dir(counterclockwise), r, center }
 * 线对象 { x1, y1, x2, y2 }
 */

const drawArc = (ctx: CanvasRenderingContext2D, center: [number, number], r: number, endDeg: number, dir: number) => {
  ctx.beginPath();
  const counterclockwise = dir === -1;   // -1 逆时针 1 顺时针
  const startDeg = counterclockwise ? Math.PI : 0;

  ctx.arc(...center, r, startDeg, endDeg, counterclockwise);
  ctx.stroke();
};

// history
// type Arc = { startDeg: number, endDeg: number, dir: 1 | -1, r: number, center: [number, number] };
// type Line = { x1: number, y1: number, x2: number, y2: number };
const history: { x: number, y: number }[] = [];

const drawHistory = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  history.forEach(({ x, y }, index) => {
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.moveTo(x, y);
    }
  });
  ctx.stroke();
  ctx.closePath();
};

export const Stick = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const center = useRef<[number, number]>([0, 0]);
  const deg = useRef(0);
  const destDeg = useRef(Math.PI);
  const r = useRef(LINE_LENGTH);
  const destR = useRef(LINE_LENGTH / 2); // [LINE_LENGTH / 4, LINE_LENGTH]
  const rDir = useRef<1 | -1>(-1);
  const dir = useRef<1 | -1>(1);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const origin: [number, number] = [SIZE / 2, SIZE / 2];
    
    center.current = [origin[0], origin[1]];
    drawStick(center.current, getSecondPointerPos(center.current, deg.current, LINE_LENGTH), ctx);
    // loop
    const loop = () => {
      if (r.current <= 0) {
        rDir.current = 1;
      }
      if (dir.current === 1) {
        if (deg.current < destDeg.current) {
          deg.current += speed;
        } else {
          // save to history before change
          deg.current = Math.PI;
          destDeg.current = 0;
          dir.current = -1;
          r.current = r.current + 6 * rDir.current;
        }
      } else {
        if (deg.current > destDeg.current) {
          deg.current -= speed;
        } else {
          // save to history before change
          deg.current = 0;
          destDeg.current = Math.PI;
          dir.current = 1;
          r.current = r.current + 6 * rDir.current;
        }
      }
      // console.log(history);
      // r.current += rSpeed * dir.current;

      // if (rDir.current === 1) {
      //   if (r.current < destR.current) {
      //     r.current += rSpeed;
      //   } else {
      //     r.current = destR.current;
      //     destR.current = LINE_LENGTH / 4;
      //     rDir.current = -1;
      //   }
      // } else {
      //   if (r.current > destR.current) {
      //     r.current -= rSpeed;
      //   } else {
      //     r.current = destR.current;
      //     destR.current = LINE_LENGTH;
      //     rDir.current = 1;
      //   }
      // }

      const secondPoint = getSecondPointerPos(center.current, deg.current, r.current);
      history.push({ x: secondPoint[0], y: secondPoint[1] });

      ctx.clearRect(0, 0, SIZE, SIZE);
      drawStick(center.current, secondPoint, ctx);

      // drawArc(ctx, center.current, r.current, deg.current, dir.current);
      // draw history
      drawHistory(ctx);
      requestAnimationFrame(loop);
    };

    loop();

    
    return () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
    };
  }, []);

  return (
    <VStack>
      <canvas style={{ width: `${SIZE}px`, height: `${SIZE}px` }} width={SIZE} height={SIZE} ref={ref}/>
    </VStack>
    
  );
};
