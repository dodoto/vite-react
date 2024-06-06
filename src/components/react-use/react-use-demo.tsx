import {Box, List, ListItem, Center} from '@chakra-ui/react';
import {useScratch} from 'react-use';
import {useCallback, useEffect, useRef} from 'react';

const p = {
  slate00: '#1b1c1d',
  slate10: '#202225',
  slate20: '#292c2f',
  slate30: '#2e3235',
  slate40: '#35393d',
  slate100: '#767577',
  slate900: '#dddddd',
  blue70: '#2185d0'
}

const getRect = ({x = 0, y = 0, dx = 0, dy = 0}) => {
  if (dx < 0) [x, dx] = [x + dx, -dx];
  if (dy < 0) [y, dy] = [y + dy, -dy];
  return {x, y, dx, dy};
};

const activeItem = (itemList: HTMLLIElement[], bound: [number, number]) => {
  itemList.forEach(item => {
    const {offsetTop, clientHeight} = item;
    const inStart = (offsetTop + clientHeight / 2) >= bound[0];
    const inEnd = (offsetTop + clientHeight / 2) <= bound[1];
    if (inStart && inEnd) {
      item.innerText = 'active';
    } else {
      item.innerText = '';
    }
  });
};

export const ReactUseDemo = () => {
  const [ref, {isScratching, ...rest}] = useScratch();
  const {x, y, dx, dy} = getRect(rest);

  const listItemRefs = useRef<HTMLLIElement[]>([]).current;
  const toListItemRefs = useCallback((index: number, el: HTMLLIElement) => {
    listItemRefs[index] = el;
  }, []);

  useEffect(() => {
    if (isScratching) activeItem(listItemRefs, [y, y + dy]);
  }, [y, dy, isScratching]);

  return (
    <Box pos="relative" ref={ref}>
      <Center>
        <List>
          {
            Object.values(p).map((value, index) => (
              <ListItem 
                key={value} 
                w="24" 
                h="24" 
                m="1" 
                bg={value} 
                userSelect="none"
                color="white" 
                ref={ref => toListItemRefs(index, ref!)}></ListItem>
            ))
          }
        </List>
      </Center>
      {
        isScratching && 
        <Box 
          pos="absolute" 
          left={x}
          top={y}
          w={dx}
          h={dy}
          pointerEvents="none" 
          userSelect="none"
          border="1px"
          borderColor="blue.200"/>
      }
    </Box>
  );
};