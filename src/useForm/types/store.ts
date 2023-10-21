import { RefObject } from 'react';

export type FieldState = {
  name: string;
  value: any;
  isDirty: boolean;
  initValue?: any;
  ref: RefObject<HTMLElement>;
  disabled?: boolean;
};

export type FieldOptions = {
  disabled?: boolean;
};
