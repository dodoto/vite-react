import { FC, FormEventHandler, useEffect, useRef, useState } from 'react';
import { Box, VStack, FormControl, Input, Button } from '@chakra-ui/react';
import { Query } from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';
import { Message } from './message';
import { useCollection, database } from '../db';
import { MessageModel, IMessageModelAddableFields, AuthorModel } from '../models';

export const MessageWall: FC = () => {
  const { data, add } = useCollection<MessageModel, IMessageModelAddableFields>('messages');

  const handleSubmit = (text: string) => {
    add({content: text});
  };

  return (
    <Box p="8" h="100vh">
      <Box h="full" shadow="2px 4px 16px rgba(0, 0, 0, 0.25)" bg="whitesmoke">
        <VStack h="full" alignItems="stretch" gap="4" pos="relative" bg="gray.800">
          {data && <MessageList messages={data}/>}
          <MessageForm onSubmit={handleSubmit}/>
        </VStack>
      </Box>
    </Box>
  );
};

interface IEnhanceMessageListProps {
  messages: Query<MessageModel>;
};

interface IMessageListProps {
  messages: MessageModel[];
};

const enhance = withObservables(['messages'], ({messages}: IEnhanceMessageListProps) => ({
  messages: messages.observe(),
}));


const MessageList = enhance(({messages}: IMessageListProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (behavior?: ScrollBehavior) => {
    const listEl = listRef.current!;
    listEl.scroll({
      left: 0,
      top: listEl.scrollHeight,
      behavior,
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages]);

  return (
    <>
      <VStack alignItems="flex-start" p="8" gap="4" overflowY="auto" flex="1" ref={listRef}>
        {
          messages.map(message => (
            <Message message={message.content} key={message.id} bg="white" color="transparent"/>
          ))
        }
      </VStack>
      <VStack pos="absolute" inset="0" mixBlendMode="darken" bg="linear-gradient(45deg, #9512C2, #058BEF)" alignItems="flex-start" p="8" gap="4" overflowY="auto" flex="1" ref={listRef}>
        {
          messages.map(message => (
            <Message color="white" message={message.content} key={message.id}/>
          ))
        }
      </VStack>
    </>
  );
});

interface IMessageFormProps {
  onSubmit?: (text: string) => void;
};

const MessageForm: FC<IMessageFormProps> = ({onSubmit}) => {
  const [value, setValue] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit?.(value);
    }
    setValue('');
  };

  return (
    <Box p="8">
      <form onSubmit={handleSubmit}>
        <FormControl display="flex" gap="4">
          <Input borderColor="whiteAlpha.400" _hover={{borderColor: 'whiteAlpha.500'}} color="white" autoComplete="off" value={value} onChange={({target:{value}}) => setValue(value)} placeholder="input will be save to indexedDB by watermelondb"/>
          <Button bg="whiteAlpha.400" _hover={{bg: 'whiteAlpha.500'}} color="white">Send</Button>
        </FormControl>
      </form>
    </Box>
  );
};