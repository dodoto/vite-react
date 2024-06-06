import {FC, ReactNode} from 'react';
import {Box, FormControl, FormLabel, Select, FormErrorMessage} from '@chakra-ui/react';
import {useFormContext} from 'react-hook-form';
import {FormItemProps} from './form-types';

export const FormSelectField: FC<FormItemProps> = ({label, name}) => {
  const {register, formState: {errors}} = useFormContext();
  return (
    <Box p="2">
      <FormControl isInvalid={!!errors[name]}>
        <FormLabel>{label}</FormLabel>
        <Select {...register(name)}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <FormErrorMessage>{(errors[name]?.message || '') as ReactNode}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};