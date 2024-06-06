import {FC, ReactNode} from 'react';
import {Box, FormControl, FormLabel, Input, Textarea, FormErrorMessage} from '@chakra-ui/react';
import {useFormContext} from 'react-hook-form';
import {FormItemProps} from './form-types';

type FormTextFieldProps = {
  useTextarea?: boolean;
}

export const FormTextField: FC<FormItemProps & FormTextFieldProps> = ({label, name, useTextarea}) => {
  const {register, formState: {errors}} = useFormContext();
  return (
    <Box p="2">
      <FormControl isInvalid={!!errors[name]}>
        <FormLabel>{label}</FormLabel>
        {
          !!useTextarea ?
          <Textarea {...register(name)}/> :
          <Input {...register(name)}/>
        }          
        <FormErrorMessage>{(errors[name]?.message || '') as ReactNode}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};