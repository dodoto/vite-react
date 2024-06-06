import { useRef, useState, useEffect } from "react";
import { Box, Switch, HStack, Button, Text } from "@chakra-ui/react";

const DEFAULT_SIZE = 400
const BUFFER = 1

const getLeft = (curIndex: number, pageIndex: number, defaultSize = DEFAULT_SIZE) => (pageIndex - curIndex) * defaultSize

export const InfScrollView = () => {
  const [index, setIndex] = useState(0)
  const [hidden, setHidden] = useState(false)
  const scrollLeft = useRef(0)
  const isScroll = useRef(false)

  const pageIndices = [...Array(BUFFER * 2 + 1)].map((_, i) => {
    const bufferIndex = i - BUFFER;
    return Math.round(index - bufferIndex);
  })

  const animate = (value: number, dest: number, dir: 1 | -1) => {
    const step = 0.01 * dir
    if (parseFloat(value.toFixed(3)) !== dest) {
      requestAnimationFrame(() => {
        animate(value + step, dest, dir)
        setIndex(value)
      })
    } else {
      console.log('stop')
      requestAnimationFrame(() => {
        setIndex(dest)
        isScroll.current = false
      })
    }
  }

  const scroll = (dir: 1 | -1) => {
    if (!isScroll.current) {
      isScroll.current = true
      animate(index, index + dir, dir)
    }
  }

  useEffect(() => {
    scrollLeft.current = index * DEFAULT_SIZE 
    // console.log(`scroll left = ${Math.round(scrollLeft.current)}`)
  }, [index])

  return (
    <Box>
      <HStack justifyContent="center" p="8">
        <Switch checked={hidden} onChange={() => setHidden(!hidden)}/> 
        <Text>overflow hidden</Text>
      </HStack>
      <Box pos="relative" w="400px" h="300px" m="auto" borderWidth="2px" overflow={hidden ? "hidden" : "visible"}>
        {
          pageIndices.map((item) => (
            <Box 
              pos="absolute"
              top="50px"
              left="50px"
              w="300px"
              h="200px"
              borderWidth="2px"
              key={`item-${item}`}
              style={{transform: `translateX(${getLeft(index, item)}px)`}}>{item}</Box>
          ))
        }
      </Box>
      <Box pos="relative" w="225px" h="300px" mt="8" mx="auto" overflow="hidden" borderWidth="1px">
        {
          pageIndices.map((item) => (
            <Box 
              pos="absolute"
              inset="0"
              // borderWidth="2px"
              key={`item-${item}`}
              zIndex={1 - item}
              backgroundColor="AppWorkspace"
              boxShadow={item === Math.floor(index) - 1 && isScroll.current ? "0 0 4px rgba(0, 0, 0, .5)" : "none"}
              style={item === Math.floor(index) - 1 ? {transform: `translateX(${getLeft(index - 1, item, 450)}px)`} : {}}>{item}</Box>
          ))
        }
      </Box>
      <HStack justifyContent="center" p="8">
        <Button onClick={() => scroll(-1)} colorScheme="blue">prev</Button>
        <Button onClick={() => scroll(1)} colorScheme="blue">next</Button>
      </HStack>
    </Box>
  )
}
