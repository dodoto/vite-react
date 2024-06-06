import {useEffect, useState, useRef, ChangeEventHandler} from 'react';
import {Box, VStack, Heading, Input, FormControl} from '@chakra-ui/react';
import gsap from 'gsap';

export const NumberAnimation = () => {
  const [target, setTarget] = useState({value: 0});
  const gsapId = useRef<gsap.core.Tween>();
  const startTarget = useRef({value: 0}).current;

  useEffect(() => {
    return () => {
      gsapId.current && gsapId.current.kill();
    };
  }, [gsapId]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    gsapId.current = gsap.to(startTarget, {
      duration: 1, 
      value: parseInt(value || '0'),
      onUpdate() {
        setTarget({...startTarget});
      },
    });
  };

  return (
    <Box maxW="500px" mx="auto" my="12" borderWidth="1px" rounded="sm">
      <VStack p="4">
        <FormControl p="4">
          <Input placeholder="input number" onChange={handleChange} type="number" autoComplete="off"/>
        </FormControl>
        <Heading>{Math.round(target.value)}</Heading>
      </VStack>
    </Box>
  );
};