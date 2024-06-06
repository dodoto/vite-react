import {FC, ReactNode} from 'react';
import {FormControl, FormHelperText, FormLabel, HStack, IconButton, Box} from '@chakra-ui/react';
import {EditIcon, CloseIcon} from '@chakra-ui/icons';
import { useFormRedcuerContext, ActionTypes } from '../redux/reudx';
import {useTitleInput} from './form-header';

type FieldEditLayoutProps = {
  id: string;
  title: string;
  helpText?: string;
  children: ReactNode
};

export const FieldEditLayout:FC<FieldEditLayoutProps> = ({id, title, helpText, children}) => {
  const context = useFormRedcuerContext();

  const handleTitleBlur = (title: string) => {
    context.dispatch({type: ActionTypes.EditFormField, payload: {id, title}});
  };

  const handleHelpTextBlur = (text: string) => {
    context.dispatch({type: ActionTypes.EditFormField, payload: {id, helpText: text}});
  };

  const {state: titleState, on: titleOn, InputEl: TitleInput} = useTitleInput(title, handleTitleBlur);
  const {state: helpTextState, on: helpTextOn, InputEl: HelpTextInput} = useTitleInput(helpText || 'help text', handleHelpTextBlur);

  const handleCloseClick = () => {
    context.dispatch({type: ActionTypes.RemoveFormField, payload: id});
  };

  return (
    <FormControl p="4" _hover={{bg: '#f8f8f8'}}>      
      <HStack mb="3">
        {
          titleState ?
          TitleInput :
          <>
            <FormLabel flex="1" m="0" cursor="pointer" _hover={{color: 'primary'}} onClick={titleOn}>
              {title} <EditIcon fontSize="xs"/>
            </FormLabel>
            <IconButton 
              aria-label="remove field" 
              icon={<CloseIcon/>} 
              bg="transparent"
              ml="auto"
              size="xs" 
              display="none"
              _groupHover={{display: 'block'}}
              onClick={handleCloseClick}/>
          </>
        }
      </HStack>
      {children}
      <Box>
        {
          helpTextState ?
          HelpTextInput :
          <FormHelperText cursor="pointer" _hover={{color: 'primary'}} onClick={helpTextOn}>
            {helpText} <EditIcon fontSize="2xs"/>
          </FormHelperText>
        }
      </Box>
      
    </FormControl>
  );
};