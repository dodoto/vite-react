import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';

export interface IMessageProps {
  message: string;
  bg?: string;
  color?: string;
};

export const Message: FC<IMessageProps> = ({message, bg, color}) => {
  return (
    <Box py="2" px="4" bg={bg} borderRadius="md" shadow="lg">
      <Text color={color}>{message}</Text>
    </Box>
  );
};