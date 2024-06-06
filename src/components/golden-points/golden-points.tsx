import { FC, useRef, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import "./golden-points.css";

const COLORS = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
] as const;

type Center = { x: number, y: number };

class Point {
  x: number;
  y: number;
  r: number;
  radius: number;
  maxRadius: number;
  minRadius: number;
  index: number;
  center: Center;
  goldenAngle: number;
  ctx: CanvasRenderingContext2D;
  dir: 1 | -1 = 1;
  color: typeof COLORS[number];

  constructor(center: Center, index: number, ctx: CanvasRenderingContext2D, radius = 10) {
    this.index = index;
    this.center = center;
    // const goldenAngle1 = Math.PI * (3 - Math.sqrt(6));
    // 修改 goldenAngle1 的值
    const goldenAngle2 = this.goldenAngle = Math.PI * (3 - Math.sqrt(5));
    this.minRadius = this.radius = radius;
    this.maxRadius = 4 * radius;

    // const angle1 = index * goldenAngle1;
    // const distance1 = radius * Math.sqrt(index);
    // const x1 = center.x + distance1 * Math.cos(angle1);
    // const y1 = center.y + distance1 * Math.sin(angle1);
    
    const angle2 = index * goldenAngle2;
    const distance2 = radius * Math.sqrt(index);
    const x2 = center.x + distance2 * Math.cos(angle2);
    const y2 = center.y + distance2 * Math.sin(angle2);

    const distance = 300 - 18 * Math.sqrt(index);
    this.r = Math.sqrt(distance / Math.PI);

    this.x = x2;
    this.y = y2;

    this.ctx = ctx;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
const points = Array(600).fill(1).map((_, i) => i);
export const GoldenPoints: FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const radiusRef = useRef(0);
  const rangeRef = useRef<HTMLInputElement>(null);
  const isPlaying = useRef(true);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleChange = (value: string) => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const { innerWidth, innerHeight } = window;
    const center = { x: innerWidth / 2, y: innerHeight / 2 };
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    radiusRef.current = parseInt(value);

    points.map(point => new Point(center, point, ctx, radiusRef.current)).forEach(p => {
      p.render();
    });
  };

  const controlPlayStatus = () => {
    const btnEl = btnRef.current!;
    if (isPlaying.current) {
      btnEl.innerText = "Play";
    } else {
      btnEl.innerText = "Pause";
    }
    isPlaying.current = !isPlaying.current;
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = ref.current!;
      const ctx = canvas.getContext("2d")!;
      const { innerWidth, innerHeight } = window;
      const center = { x: innerWidth / 2, y: innerHeight / 2 };

      canvas.width = innerWidth;
      canvas.height = innerHeight;
      // ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, innerWidth, innerHeight);

      points.map(point => new Point(center, point, ctx, radiusRef.current)).forEach(p => {
        p.render();
      });

      
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  useEffect(() => {
    let i = 0;
    let dir = 1;
    let raf: number;
    const animate = () => {
      if (isPlaying.current) {
        if (i > 60) dir = -1;
        if (i < 0) dir = 1;
        i += dir * 0.4;
        handleChange(i + ''); 
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas id="golden-points" ref={ref}>
        this browser dosen't support canvas
      </canvas>
      <Button ref={btnRef} onClick={controlPlayStatus} pos="fixed" left="4" top="8" colorScheme="blue">Pause</Button>
      <input type="range" ref={rangeRef} defaultValue={0} id="point-radius" min="0" max="60" onChange={(event) => handleChange(event.target.value)}/>
    </>
  );
};
