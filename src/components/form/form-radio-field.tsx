import {FC, ReactNode} from 'react';
import {Box, Stack, FormControl, FormLabel, RadioGroup, Radio, FormErrorMessage} from '@chakra-ui/react';
import {useFormContext, useController} from 'react-hook-form';
import {FormItemProps} from './form-types';


export const FormRadioField: FC<FormItemProps> = ({label, name}) => {
  const {formState: {errors}, control} = useFormContext();
  const { field } = useController({
    control,
    name,
  });
  return (
    <Box p="2">
      <FormControl isInvalid={!!errors[name]}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup onChange={(value) => field.onChange(value)} defaultValue={field.value}>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Radio value="value1">value1</Radio>
            <Radio value="value2">value2</Radio>
          </Stack>
        </RadioGroup>
        <FormErrorMessage>{(errors[name]?.message || '') as ReactNode}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};