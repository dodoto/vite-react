import {FC} from 'react';
import {Box, VStack} from '@chakra-ui/react';
import {useFormRedcuerContext} from '../redux/reudx';
import {FieldEditLayout} from './field-edit-layout';

export const FormFiledList:FC = () => {
  const context = useFormRedcuerContext();
  return (
    <VStack spacing="24px">
      {
        context.state.fieldList.map((field) => (
          <FieldEditLayout key={field.id} id={field.id} title={field.title} helpText={field.helpText}>
            {field.type}
          </FieldEditLayout>
        ))
      }
    </VStack>
  );
};

const FormFiledItem = () => {
  return (
    <span>field item</span>
  );
};