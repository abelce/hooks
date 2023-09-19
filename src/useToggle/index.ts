import { Reducer, useReducer } from 'react';

const toggleReducer = (state: boolean, newValue?: boolean) =>
  typeof newValue === 'boolean' ? newValue : !state;

const useToggle = (
  initialValue?: boolean,
): [boolean, (nextValue?: boolean) => void] => {
  return useReducer<Reducer<boolean, any>>(
    toggleReducer,
    typeof initialValue === 'boolean' ? initialValue : false,
  );
};

export default useToggle;
