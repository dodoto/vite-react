import {FC, ReactNode} from 'react';
import {Box, FormControl, FormLabel, Input, FormErrorMessage} from '@chakra-ui/react';
import {useFormContext, useController} from 'react-hook-form';
import {FormItemProps} from './form-types';


export const FormFileField: FC<FormItemProps> = ({label, name}) => {
  const {register, formState: {errors}, control} = useFormContext();
  const {field} = useController({control, name});

  return (
    <Box p="2">
      <FormControl isInvalid={!!errors[name]}>
        <FormLabel>{label}</FormLabel>
        <Input  type="file" onChange={({target: {files}}) => {
          field.onChange(files?.[0] || null);
        }}/>
        <FormErrorMessage>{(errors[name]?.message || '') as ReactNode}</FormErrorMessage>
      </FormControl>
    </Box>
  );

};