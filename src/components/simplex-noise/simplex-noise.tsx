import React, { FC, useState, useRef, useEffect } from "react";
import { createNoise2D } from "simplex-noise";
import source from "../../assets/test.mp3";

const F = 20;

type Dot = { x: number, y: number };

const flattenPath = (d: Dot[]) => {
  return d.reduce((acc, curr, index) => {
    if (index === 0) {
      return `M ${curr.x || 0} ${curr.y || 0}`;
    } else {
      return `${acc} L ${curr.x} ${curr.y}`;
    }
    // if (index === 0) {
    //   return `M ${curr.x || 0} ${curr.y || 0}`;
    // } else if (index === d.length - 1) {
    //   return `${acc} L ${curr.x} ${curr.y} Z`;
    // } else {
    //   return `${acc} L ${curr.x} ${curr.y}`;
    // }
  }, '');
};

const curveFlattenPath = (d: Dot[]) => {
  return d.reduce((acc, curr, index) => {
    if (index === 0) {
      return `M ${curr.x || 0} ${curr.y || 0}`;
    } else if (index % 4 === 0) {
      const prevD = d[index - 2];
      return `${acc} C ${(prevD.x + curr.x) / 2} ${prevD.y}, ${(prevD.x + curr.x) / 2} ${curr.y}, ${curr.x} ${curr.y}`;
    } else {
      return acc;
    }
  }, '');
};

// length: 256
const AverageDeg = 360 / 256;
const getPoints = (amount = 256) => new Array(amount)
                .fill(1)
                .map((_, i) => i)
                .map(deg => {
                  const angle = deg * AverageDeg;
                  // const startPoint = { x: Math.cos(angle) * 100, y: Math.sin(angle) * 100 };
                  return {
                    deg: angle,
                    start: { x: Math.cos(angle) * 100, y: Math.sin(angle) * 100 },
                    end: { x: Math.cos(angle) * 100, y: Math.sin(angle) * 100 },
                  }
                })
                // .sort((a, b) => Math.abs(b.start.x) - Math.abs(a.start.x));
                .filter((_, i) => i % 2 === 0);
// 0 - 255 => 100 - 120            
const pointsMapping = (input: number) => {
  const diff = (255 - 0) / (120 - 100);
  return input / diff + 100; 
};
      
// 9个一段 [0, 5, 1, 6, 2, 7, 3, 8, 4]
const testSort = (points: { deg: number, start: Dot, end: Dot }[]) => {
  const start = [0, 5, 1, 6, 2, 7, 3, 8, 4];
  const result: { deg: number, start: Dot, end: Dot }[] = [];
  for (let i = 0; i < start.length; i++) {
    let index = 0;
    while(points[start[i] + index]) {
      result.push(points[start[i] + index]);
      index += 9;
    }
  }
  return result;
};

export const NoiseDemo: FC = () => {
  const [d, setD] = useState<Dot[]>([]);

  const Points = useRef(getPoints()).current;
  const [points, setPoints] = useState<{ deg: number, start: Dot, end: Dot }[]>(Points);

  const noise2D = useRef(createNoise2D()).current;

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current!;
    let isPlaying = false;

    audio.onended = () => isPlaying = false;
    audio.onpause = () => isPlaying = false;

    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;

    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    const arr = new Uint8Array(analyser.frequencyBinCount);
    const F = Math.ceil(window.innerWidth / 256);

    const drawNoise = () => {
      analyser.getByteFrequencyData(arr);
      const newD = [];
      for (let i = 0; i < arr.length; i++) {
        const noise = noise2D(i * 0.003, arr[i] * 0.003) ;
        newD.push({ x: i * F, y: 150 + Math.max(Math.min(arr[i] * noise, 150), -150)});
        // mapping
        if (Points[i]) {
          const r = pointsMapping(arr[i]);
          Points[i].end.x = Math.cos(Points[i].deg) * r;
          Points[i].end.y = Math.sin(Points[i].deg) * r;
        }
      }
      setPoints(Points);
      setD(newD);

      if (isPlaying) {
        requestAnimationFrame(drawNoise);
      }
      
    };

    audio.onplaying = () => {
      isPlaying = true;
      audioContext.resume();
      // draw noise
      drawNoise();
    };

  }, [audioRef]);

  const path = flattenPath(d);
  const curvePath = flattenPath(points.map(p => p.end));

  return (
    <>
      <audio id="audio" controls src={source} ref={audioRef}>
        this browser doesn't support audio
      </audio>
      <svg style={{ width: "100%", height: "300px" }}>
        <path d={path} stroke="black" fill="none"/>
        <g transform={`translate(${(window.innerWidth - 2 * 100) / 2 + 100}, 150)`}>
          <circle cx={0} cy={0} r={2} />
          {
            points.map((p, i) => (
              <path 
                key={i}
                stroke="black" 
                fill="none"
                strokeWidth={2} 
                strokeLinecap="round" 
                strokeLinejoin="round"
                d={`M ${p.start.x} ${p.start.y} L ${p.end.x} ${p.end.y}`}/>
            ))
          }
        </g>
      </svg>
      <svg style={{ width: "100%", height: "300px" }}>
        <g transform={`translate(${(window.innerWidth - 2 * 100) / 2 + 100}, 150)`}>
          <circle cx={0} cy={0} r={2} />
          {
            points.map((p, i) => (
              <path 
                key={i}
                stroke="black"
                fill="none"
                strokeWidth={2} 
                strokeLinecap="round" 
                d={`M ${p.end.x} ${p.end.y} L ${p.end.x} ${p.end.y}`}/>
            ))
          }
        </g>
      </svg>
      {/* <svg style={{ width: "100%", height: "300px" }}>
        <g transform={`translate(${(window.innerWidth - 2 * 100) / 2 + 100}, 150)`}>
          <path d={curvePath} stroke="black" fill="none" strokeLinecap="round" />
          <circle cx={0} cy={0} r={2} />
        </g>
      </svg> */}
    </>
  );
}; 