import {FC} from 'react';
import {ButtonGroup, Button, Box} from '@chakra-ui/react';
import { useFormRedcuerContext, ActionTypes } from '../redux/reudx';
import { FieldTypes } from '../form-types';

export const FormController:FC = () => {
  const context = useFormRedcuerContext();

  const handleClick = (type: FieldTypes) => {
    const id = new Date().getTime().toString();
    context.dispatch({type: ActionTypes.AddFormField, payload: {
      id,
      title: 'untitled',
      helpText: 'help text',
      type,
    }});
    requestAnimationFrame(() => {
      window.scroll({
        left: 0,
        top: 99999,
      })
    });
  };

  return (
    <Box textAlign="center">
      <ButtonGroup gap="4">
        <Button colorScheme='gray' onClick={() => handleClick(FieldTypes.Checkbox)}>checkbox</Button>
        <Button colorScheme='red' onClick={() => handleClick(FieldTypes.File)}>file</Button>
        <Button colorScheme='orange' onClick={() => handleClick(FieldTypes.Radio)}>radio</Button>
        <Button colorScheme='green' onClick={() => handleClick(FieldTypes.Select)}>select</Button>
        <Button colorScheme='blue' onClick={() => handleClick(FieldTypes.Table)}>table</Button>
        <Button colorScheme='cyan' onClick={() => handleClick(FieldTypes.Text)}>text</Button>
      </ButtonGroup>
    </Box>
  );
};