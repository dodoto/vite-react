import { Box, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

const ClockNumber = new Array(12).fill(1).map((_, index) => index + 1);

const Size = 300;

const TimeSize = 50;

const Padding = 80;

const getPosition = (index: number) => {
  const deg = Math.PI * (index + 10) / 6;
  const x = Size * Math.cos(deg) + Size - TimeSize / 2;
  const y = Size * Math.sin(deg) + Size - TimeSize / 2;
  return { left: `${x}px`, top: `${y}px` };
};

export const Clock = () => {
  const [step, setStep] = useState(2.5);
  const curIndex = useRef(0);
  // const [time, setTime] = useState(2.5);

  const handleClick = (index: number) => {
    const diff = index - curIndex.current;
    curIndex.current = index;

    // setStep(p => {
    //   console.log(p - 2.5, index)
    //   if (p === 13.5 && index === 0) {
    //     return p + 1;
    //   } 
    //   return p + diff;
    // });
    setStep(p => p + 1);
  };

  return (
    <Box w={Size * 2 + Padding} h={Size * 2 + Padding} bg="gray.100" rounded="full" transform="translate(100px, 100px)">
      <Box position="relative" w={Size * 2} h={Size * 2}  transform="translate(40px, 40px)">
        {ClockNumber.map((number, index) => (
          <Box 
            key={index} 
            position="absolute" 
            style={getPosition(index)} 
            w={TimeSize} 
            h={TimeSize} 
            textAlign="center" 
            lineHeight={`${TimeSize}px`} 
            rounded="full" 
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
            onClick={() => handleClick(index)}> 
            <Text>{number}</Text>
          </Box>       
        ))}
        <Box 
          position="absolute" 
          left={1} 
          top={1} 
          h={Size} 
          w={Size} 
          transformOrigin="right bottom" 
          pointerEvents="none"
          transition="transform 0.25s" 
          transform={`rotate(${step * 30}deg)`}>
          <Box position="absolute" left={Size / 2 - 1} top={Size * 0.1 - 1} h={Size * 0.8} w={2} bg="black" transform="translate(42px, 42px) rotate(-45deg)" rounded="md"></Box>
        </Box>
      </Box>
    </Box>
  );
};