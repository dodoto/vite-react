import { memo } from "react";

const COLORS = [
  "#f3e8ff",
  "#e9d5ff",
  "#d8b4fe",
  "#c084fc",
  "#a855f7",
  "#9333ea",
  "#7e22ce",
  "#6b21a8",
  "#581c87",
];

type Props = {
  size?: number;
  url?: string;
};

export default memo(function SquircleAvatar({ size = 40, url }: Props) {
  const hasUrl = !!url;

  const fill = COLORS[Math.floor(Math.random() * COLORS.length)];
  // console.log(url)
  return (
    <svg style={{ width: `${size}px` , height: `${size}px` }} viewBox="0 0 200 200">
      {
        hasUrl && <defs>
          <pattern id={`squircle-${url}`} patternUnits="userSpaceOnUse" width="200" height="200">
              <image xlinkHref={url} x="0" y="0" width="200" height="200" />
          </pattern>
        </defs>
      }
        <path d="M100,200c43.8,0,68.2,0,84.1-15.9C200,168.2,200,143.8,200,100s0-68.2-15.9-84.1C168.2,0,143.8,0,100,0S31.8,0,15.9,15.9C0,31.8,0,56.2,0,100s0,68.2,15.9,84.1C31.8,200,56.2,200,100,200z" fill={ hasUrl ? `url(#squircle-${url})` : fill } />
    </svg>
  );
});