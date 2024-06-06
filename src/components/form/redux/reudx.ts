import {useReducer, createContext, useContext} from "react";
import {FieldTypes} from '../form-types';

type Field = {
  id: string;
  title: string;
  helpText?: string;
  type: FieldTypes;
  // props: Record<string, string>;
  [key: string]: string | undefined;
};

type State = {
  title: string;
  fieldList: Field[];
};

export enum ActionTypes {
  EditFormTitle = 'EditFormTitle',
  AddFormField = 'AddFormField',
  RemoveFormField = 'RemoveFormField',
  EditFormField= 'EditFormField',
};

export type EditFormTitleAction = {type: ActionTypes.EditFormTitle, payload: string};
export type AddFormFieldAction = {type: ActionTypes.AddFormField, payload: Field};
export type RemoveFormFieldAction = {type: ActionTypes.RemoveFormField, payload: string};
export type EditFormFieldAction = {type: ActionTypes.EditFormField, payload: {id: string, [key: string]: any}};

type Actions = 
  EditFormTitleAction | 
  AddFormFieldAction | 
  RemoveFormFieldAction |
  EditFormFieldAction;

const initialState = {
  title: 'form title',
  fieldList: [],
};

const formReducer = (state: State, {type, payload}: Actions) => {
  switch (type) {
    case ActionTypes.EditFormTitle: 
      return {...state, title: payload};
    case ActionTypes.AddFormField:
      return {...state, fieldList: [...state.fieldList, payload]};  
    case ActionTypes.RemoveFormField:
      return {...state, fieldList: state.fieldList.filter(({id}) => id !== payload)};    
    case ActionTypes.EditFormField:
      return {...state, fieldList: state.fieldList.map(field => (field.id === payload.id ? {...field, ...payload} : field))};     
    default:
      return state;
  }
};

type FormReducerContext = {
  state: State;
  dispatch: React.Dispatch<Actions>;
}

export const FormReducerContext = createContext<FormReducerContext>({} as FormReducerContext);

export const useFormRedcuerContext = () => useContext(FormReducerContext);

export const useFormReducer = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return {
    state,
    dispatch,
  }
};
