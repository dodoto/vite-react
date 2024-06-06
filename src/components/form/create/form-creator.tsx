import {FC, useState, memo, useCallback} from 'react';
import {Stack, Container, Box, List, ListItem, Center} from '@chakra-ui/react';
import {FormProvider, useForm} from 'react-hook-form';
import {Container as DragContainer, Draggable, OnDropCallback} from 'react-smooth-dnd';
import {FormCheckboxField} from '../form-checkbox-field';
import {FormFileField} from '../form-file-field';
import {FormRadioField} from '../form-radio-field';
import {FormSelectField} from '../form-select-field';
import {FormLeftTableField, FormTableField, FormTopTableField} from '../form-table-field';
import {FormTextField} from '../form-text-field';
import {FormElement} from '../form-types';
import { FormRoot } from './form-root';
import { FormFiledList } from './form-field-list';
import { FormHeader } from './form-header';
import { FormController } from './form-controller';

const list = [
  {title: 'checkbox', bg: 'blue.200', component: FormCheckboxField},
  {title: 'file', bg: 'red.200', component: FormFileField},
  {title: 'radio', bg: 'teal.200', component: FormRadioField},
  {title: 'select', bg: 'green.200', component: FormSelectField},
  {title: 'table', bg: 'yellow.200', component: FormTableField},
  {title: 'input', bg: 'telegram.200', component: FormTextField},
];

// export const FormCreator: FC = () => {
//   const method = useForm();
//   const [data, setData] = useState<FormElement[]>([]);

//   const handleDrop: OnDropCallback = useCallback(({addedIndex, payload, removedIndex}) => {
//     setData(p => {
//       if (removedIndex === null && addedIndex === null) return p;
              
//       const result = [...p];
//       let itemToAdd: FormElement;

//       if (removedIndex !== null) {
//         itemToAdd = result.splice(removedIndex, 1)[0];
//       } else {
//         itemToAdd = {
//           label: payload.title, 
//           name: `${+new Date()}`,
//           component: payload.component,
//         };
//       }
    
//       if (addedIndex !== null) {
//         result.splice(addedIndex, 0, itemToAdd);
//       }
//       return result;
//     });
//   }, []);
//   console.log(data)
//   return (
//     <Box h="100vh">
//       <Stack h="full" direction={['column', 'row']}>
//         <Container w={['full', '350px']}  margin="0">
//           <DragContainer 
//             behaviour="copy"
//             groupName="test"
//             getChildPayload={index => list[index]}
//             render={ref => (
//               <List ref={ref}>
//                 {
//                   list.map(item => (
//                     <Draggable key={item.bg} render={() => (
//                       <ListItem bg={item.bg} w="50%" userSelect="none" cursor="cell" >
//                         <Center w="full" h="100">{item.title}</Center>
//                       </ListItem>
//                     )}/>
//                   ))
//                 }
//               </List>
//             )}
//           />
//         </Container>
//         <Container flex="1" margin="0" maxW="none">
//           <FormProvider {...method}>
//             <DragContainer 
//               groupName="test"
//               onDrop={handleDrop}
//               render={ref => (
//                 <List ref={ref} h="full" w="full">
//                   {
//                     data.map((item) => (<DraggableFormItem key={item.name} {...item}/>))
//                   }
//                 </List>
//               )}
//             />
//           </FormProvider>
//         </Container>
//       </Stack>
//     </Box>
//   );
// };

const DraggableFormItem: FC<FormElement> = memo(element => {
  return (
    <Draggable 
      render={() => (
        <ListItem bg="gray.50" w="full" userSelect="none" cursor="cell" p="4">
          <element.component label={element.label} name={element.name}/>
        </ListItem>
      )}
    />
  );
});

export const FormCreator:FC = () => {
  return (
    <Box bg="whitesmoke">
      <FormRoot>
        <Container bg="white" p="0">
          <FormHeader/>
          <FormFiledList/>
        </Container>  
        <FormController/>
      </FormRoot>
    </Box>
  );
};