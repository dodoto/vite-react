import {FC, ReactNode} from 'react';
import {FormReducerContext, useFormReducer} from '../redux/reudx';

export const FormRoot:FC<{children: ReactNode}> = ({children}) => {
  const store = useFormReducer();

  return (
    <FormReducerContext.Provider value={store}>
      {children}
    </FormReducerContext.Provider>
  );
};