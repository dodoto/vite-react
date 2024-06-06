import { Box, Flex, chakra, Text, Link } from "@chakra-ui/react";
import { motion, useTransform, cubicBezier, mix, useTime } from "framer-motion";
import { createNoise2D } from "simplex-noise";
import { PlayButton } from "./play-button";
import { useState } from "react";

const ChakraSvg = chakra("svg");
const Fill = chakra("rect");
const MotionChakraPath = chakra(motion.path);
const MotionChakraG = chakra(motion.g);

const WIDTH = 320;
const HEIGHT = 640;
const c = { x: WIDTH / 2, y: HEIGHT / 2 };
const C = 0.55228474983079;
const F = 20000;
const A = 0.4;
const r = 50;
const n1 = createNoise2D();
const n2 = createNoise2D();
const n3 = createNoise2D();
const n4 = createNoise2D();

const c0 = "#60d1b9";
const c1 = "#2ab8aa";
const c2 = "#3a9dbb";
const c3 = "#2a7fb8";
const easing = cubicBezier(0.37, 0, 0.63, 1);

const getCurve = (start: number, h: number) => {
  let path: string = "";
  path += `M 0, ${start}`;
  path += ` Q ${WIDTH / 2}, ${start - h} ${WIDTH}, ${start}`;
  path += ` L ${WIDTH}, ${HEIGHT}`;
  path += ` L 0, ${HEIGHT}`;
  return path;
};

const getProgress = (t: number, durationInFrames = 4000) => {
  const p = (t % durationInFrames) / durationInFrames;
  const currentIteration = Math.floor(t / durationInFrames);
  const isGoingBack = currentIteration % 2 === 0;
  const progress = isGoingBack ? 1 - p : p;
  return progress;
};

export const Headspace = () => {
  const clock = useTime();

  const [isPlay, setIsPlay] = useState(0);

  const progress1 = useTransform(clock, getProgress);
  const progress2 = useTransform(clock, value => getProgress(value, 4100));
  const progress3 = useTransform(clock, value => getProgress(value, 3800));

  const d1 = useTransform(progress1, value => getCurve(mix(c.y - 300, 200, easing(value)), mix(50, 60, easing(value))));
  const d2 = useTransform(progress2, value => getCurve(mix(c.y - 150, c.y, easing(value)), mix(40, 60, easing(value))));
  const d3 = useTransform(progress3, value => getCurve(mix(c.y + 75, c.y + 225, easing(value)), mix(30, 50, easing(value))));

  const d4 = useTransform(clock, value => {
    const C1 = C + A * n1(value / F, 0);
    const C2 = C + A * n2(value / F, 0);
    const C3 = C + A * n3(value / F, 0);
    const C4 = C + A * n4(value / F, 0);
    // console.log(C1, C2, C3, C4)
    let p = "";
    p += `M ${c.x  + C4 * r}, ${c.y - r}`;
    p += ` C ${c.x + C1 * r}, ${c.y - r} ${c.x + r}, ${c.y - r} ${c.x + r}, ${c.y}`;
    p += ` C ${c.x + r}, ${c.y +  r} ${c.x + C2 * r}, ${c.y + r} ${c.x}, ${c.y + r}`;
    p += ` C ${c.x - C3 * r}, ${c.y + r} ${c.x - r}, ${c.y + r} ${c.x - r}, ${c.y}`;
    p += ` C ${c.x - r}, ${c.y} ${c.x - r}, ${c.y - r} ${c.x + C4 * r}, ${c.y - r}`;
    return p;
  });
  const rotate = useTransform(clock, value => {
    // console.log(value, value / 2000);
    return value / 200;
  });

  return (
    <Flex h="100vh" w="100vw" flexDir="column" gap="10" justify="center" align="center">
      <Text>
        <Link href="https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season5/src/Headspace" target="__blank">react native headspace</Link> web achievement base on framer-motion
      </Text>
      <Box h={HEIGHT} w={WIDTH} borderRadius="md" shadow="lg">
        <ChakraSvg w="full" h="full">
          <Fill w={WIDTH} h={HEIGHT} fill={c0} />
          <MotionChakraPath fill={c1} d={d1}/>
          <MotionChakraPath fill={c2} d={d2}/>
          <MotionChakraPath fill={c3} d={d3}/>
          {/* circle */}
          <MotionChakraG translateX={c.x} translateY={c.y} style={{ rotate }} onClick={() => setIsPlay(p => p === 0 ? 1 : 0)}>
            <MotionChakraPath fill="#3B3A3A" d={d4} />
          </MotionChakraG>
          <g transform={`translate(${c.x - 10}, ${c.y - 12})`}>
            <PlayButton progress={isPlay}/>
          </g>
        </ChakraSvg>
      </Box>
    </Flex>
  );
};