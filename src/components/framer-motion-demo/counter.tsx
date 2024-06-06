import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@chakra-ui/react";

const getUnitsAndTens = (value: number) => {
  if (value < 0) {
    return [0, value]
  } else {
    const tens = Math.floor(value / 10)
    const units = value - tens * 10
    return [tens, units]
  }
}

const getCount = () => {
  let time: number[] = []
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()
  time = time.concat(getUnitsAndTens(h)).concat(getUnitsAndTens(m)).concat(getUnitsAndTens(s))
  return time
}

const FramerMotionCount = ({ count = 0, id }: { count: number, id: string}) => {
  const [y, setY] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { height } = wrapRef.current!.getBoundingClientRect();
    setY(height);
  }, []);

  return (
    <Box ref={wrapRef} pos="relative" h="40px" w="16px" overflow="hidden">    
      <AnimatePresence>
        <motion.div 
          key={`${id}-${count}`}
          style={{ position: "absolute", inset: 0, lineHeight: "40px" }}
          initial={{ y }}
          animate={{ y: 0 }}
          exit={{ y: -y }}
          transition={{
            ease: "linear",
            duration: 0.3,
          }}>{ count }</motion.div>
      </AnimatePresence>      
    </Box>
  );
}

export const FramerMotionCounter = () => {
  const [counts, setCounts] = useState(getCount())

  useEffect(() => {
    const timer = setInterval(() => {
      setCounts(getCount())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <Box display="flex" justifyContent="center" alignItems="center" w="100vw" h="100vh" fontSize="calc(10px + 2vmin)">      
      <FramerMotionCount count={counts[0]} id="H0"/>
      <FramerMotionCount count={counts[1]} id="0H"/>
      :
      <FramerMotionCount count={counts[2]} id="M0"/>
      <FramerMotionCount count={counts[3]} id="0M"/>
      :
      <FramerMotionCount count={counts[4]} id="S0"/>
      <FramerMotionCount count={counts[5]} id="0S"/>
  </Box>
  );
}