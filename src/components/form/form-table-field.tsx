import {FC, ReactNode} from 'react';
import {
  Box, 
  HStack,
  FormControl, 
  FormLabel, 
  Table,
  Thead,
  Tbody, 
  Tr, 
  Th,
  Td, 
  Input, 
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import {useFormContext, useFieldArray} from 'react-hook-form';
import {FormItemProps} from './form-types';


const useFormTableField = (name: FormItemProps['name']) => {
  const {register, formState: {errors}, control} = useFormContext();
  const {fields, append} = useFieldArray({control, name});

  return {
    register,
    errors,
    fields,
    append,
  }
};

export const FieldList = ['name', 'trender', 'email', 'address'];

const TableHead: FC<{fieldList: string[], children?: ReactNode}> = ({fieldList, children}) => {
  return (
    <Thead>
      <Tr>
        {children}
        {fieldList.map(field => (
          <Th borderWidth="2px" key={field}>{field}</Th>
        ))}
      </Tr>
    </Thead>
  );
};

const TableCell: FC<{children: ReactNode, isInvalid?: boolean}> = ({children, isInvalid = false}) => {
  return (
    <Td 
      borderWidth="2px" 
      position="relative" 
      _focusWithin={{
        _after: {borderColor: 'blue.500'},
      }}
      _after={{
        content: `""`, 
        display: 'block', 
        position: 'absolute',
        top: '-1px',
        right: '-1px', 
        bottom: '-1px',
        left: '-1px',
        borderWidth: '2px',
        borderColor: isInvalid ? 'red.500' : 'transparent',
        pointerEvents: 'none', 
      }}>
      {children}
    </Td>
  );
};

export const FormTopTableField: FC<FormItemProps> = ({label, name}) => {
  const {register, errors, fields, append} = useFormTableField(name);
  console.log(errors[name])

  return (
    <Box p="2">
      <FormControl isInvalid={!!errors[name]}>
        <FormLabel>{label}</FormLabel>
        <Table>
          <TableHead fieldList={FieldList}/>
          <Tbody>
            {
              fields.map((field,index) => (
                <Tr key={field.id}>
                  {
                    FieldList.map((key, keyIndex) => (
                      <TableCell key={key} isInvalid={!!(errors[name] as any)?.[index][FieldList[keyIndex]]}>
                        <Input variant="unstyled" {...register(`${name}.${index}.${FieldList[keyIndex]}`)}/>
                      </TableCell>
                    ))
                  }
                </Tr>
              ))
            }
          </Tbody>
        </Table>
        <HStack py="3" justify="flex-end">
          <Button onClick={() => {
              append({name: '', trender: '', email: '', address: ''});
            }} size="sm">+</Button>
        </HStack>
        {(errors[name]) && <FormErrorMessage>required field is empty</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};

export const FormLeftTableField: FC<FormItemProps> = ({label, name}) => {
  const {register, errors, fields, append} = useFormTableField(name);
  return (
    <Box p="2">
      <FormControl isInvalid={!!errors[name]}>
        <FormLabel>{label}</FormLabel>
        <Table>
          <Tbody>
            {
              FieldList.map((key, keyIndex) => (
                <Tr key={key}>
                  <Th borderWidth="2px">{key}</Th>
                  {
                    fields.map((item, index) => (
                      <TableCell key={item.id} isInvalid={!!(errors[name] as any)?.[index][FieldList[keyIndex]]}>
                        <Input variant="unstyled" {...register(`${name}.${index}.${FieldList[keyIndex]}`)}/>
                      </TableCell>
                    ))
                  }
                </Tr>
              ))
            }
          </Tbody>
        </Table>
        <HStack py="3" justify="flex-end">
          <Button onClick={() => {
              append({name: '', trender: '', email: '', address: ''});
            }} size="sm">+</Button>
        </HStack>
        {(errors[name]) && <FormErrorMessage>required field is empty</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};

export const FormTableField: FC<FormItemProps> = ({label, name}) => {
  const {register, errors} = useFormTableField(name);

  return (
    <Box p="2">
      <FormControl isInvalid={!!errors[name]}>
        <FormLabel>{label}</FormLabel>
        <Table>
          <TableHead fieldList={FieldList}>
            <Th borderWidth="2px"></Th>
          </TableHead>
          <Tbody>
            {
              FieldList.map(sideField => (
                <Tr key={sideField}>
                  <Th borderWidth="2px">{sideField}</Th>
                  {FieldList.map(headField => (
                    <TableCell key={headField} isInvalid={!!(errors[name] as any)?.[`${sideField +'-' + headField}`]}>
                      <Input 
                        variant="unstyled" 
                        {...register(`${name}.${sideField +'-' + headField}`)}/>
                    </TableCell>
                  ))}
                </Tr>
              ))
            }
          </Tbody>
        </Table>

        {(errors[name]) && <FormErrorMessage>required field is empty</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};