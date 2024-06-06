import {FC, ReactNode} from 'react';
import {Box, Stack, FormControl, FormLabel, CheckboxGroup, Checkbox, FormErrorMessage,} from '@chakra-ui/react';
import {useFormContext, useController} from 'react-hook-form';
import {FormItemProps} from './form-types';


export const FormCheckboxField: FC<FormItemProps> = ({label, name}) => {
  const {formState: {errors}, control} = useFormContext();
  const { field } = useController({
    control,
    name,
  });
  return (
    <Box p="2">
      <FormControl isInvalid={!!errors[name]}>
        <FormLabel>{label}</FormLabel>
        <CheckboxGroup onChange={(value) => field.onChange(value)} defaultValue={field.value}>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox value="checkbox1" ref={ref => field.ref(ref)}>value1</Checkbox>
            <Checkbox value="checkbox2" ref={ref => field.ref(ref)}>value2</Checkbox>
            <Checkbox value="checkbox3" ref={ref => field.ref(ref)}>value3</Checkbox>
          </Stack>  
        </CheckboxGroup>
        <FormErrorMessage>{(errors[name]?.message || '') as ReactNode}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};