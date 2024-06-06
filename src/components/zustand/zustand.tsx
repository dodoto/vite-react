import { FC } from 'react';
import { useCountStore } from './store';
import { Heading, Button, Text } from '@chakra-ui/react';

const Counter: FC<{no: number}> = ({no}) => {
  const count = useCountStore(state => state[`count${no}` as `count${1 | 2}`])
  const increase = useCountStore(state => state[`increase${no} ` as `increase${1 | 2}`])
  const add = () => {
    // increase(1)
    console.log(increase)
  }
  return (
    <>
      <Heading as="h4">counter{no}</Heading>
      <Text>{count}</Text>
      <Button colorScheme="blue" onClick={add}>add</Button>
    </>
  );
}

export const ZustandDemo: FC = () => {
  return (
    <div>
      <Counter no={1}/>
      <Counter no={2}/>
      
    </div>
  )
}