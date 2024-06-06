import {ChangeEventHandler, MouseEventHandler, useRef} from 'react';
import {Box, HStack, Button , Input, Text} from '@chakra-ui/react';
import {SvgDots} from './svg-dots';
import {SvgPaths} from './svg-paths';
import {useSetSvgColorAtom, useSetDotsAtom, useSetPathsAtom, useDeletePathsAtom} from '../atoms';

export const SvgRoot = () => {
  const [, setSvgColorAtom] = useSetSvgColorAtom();
  const [, setDotsAtom] = useSetDotsAtom();
  const [, setPathsAtom] = useSetPathsAtom();
  const [, deletePathsAtom] = useDeletePathsAtom();
  const isDrawing = useRef(false);

  const reset = () => {
    deletePathsAtom(0);
  };

  const deletePath = () => {
    deletePathsAtom(1);
  };

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setSvgColorAtom(evt.target.value);
  };

  const handleMouseDown = () => {
    isDrawing.current = true;
  }; 

  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (evt) => {
    if (isDrawing.current) {
      const {offsetX: x, offsetY: y} = evt.nativeEvent;
      setDotsAtom({x, y});
    }
  };

  const handleMouseUp = () => {
    if (isDrawing.current) {
      isDrawing.current = false;
      setPathsAtom();
      setDotsAtom(null);
    }
  };

  return (
    <Box h="100vh" p="2" display="flex" flexDirection="column" gap="2">
      <HStack>
        <Button onClick={reset} colorScheme="red">Clear All</Button>
        <Button onClick={deletePath} colorScheme="orange">Delete Selected</Button>
        <Input type="color" onChange={handleColorChange} maxW="72px"/>
        <Text>all state on jotai</Text>
      </HStack>
      <svg
        style={{ flex: 1, background: '#fafafa' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        <SvgDots />
        <SvgPaths />
      </svg>
    </Box>
  );
};