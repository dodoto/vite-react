import {FC, KeyboardEventHandler, useRef} from 'react';
import {Heading, useBoolean, Input, Text} from "@chakra-ui/react";
import {EditIcon} from '@chakra-ui/icons';
import { useFormRedcuerContext, ActionTypes } from '../redux/reudx';

export const useTitleInput = (defaultValue: string, onBlur: (value: string) => void) => {
  const [state, {on, off}] = useBoolean();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    off();
    const value = inputRef.current!.value;
    if (value) {
      onBlur(value);
    }
  };

  const handleKeyup:KeyboardEventHandler = (evt) => {
    if (evt.code === 'Enter') {
      inputRef.current!.blur();
    }
  };

  const InputEl = (<Input 
    autoFocus
    onBlur={handleBlur} 
    onKeyUp={handleKeyup} 
    defaultValue={defaultValue} 
    ref={inputRef}/>);

  return {state, on, InputEl};
};

export const FormHeader:FC = () => {
  const context = useFormRedcuerContext();

  const handleBlur = (value: string) => {
    context.dispatch({type: ActionTypes.EditFormTitle, payload: value});
  };

  const {on, state, InputEl} = useTitleInput(context.state.title, handleBlur);

  return (
    <Heading size="lg" textAlign="center" onClick={on} py="4">
      {
        state ?
        InputEl : 
        <Text cursor="pointer" _hover={{color: 'primary'}}>{context.state.title} <EditIcon fontSize="md"/></Text>
      }
    </Heading>
  );
};