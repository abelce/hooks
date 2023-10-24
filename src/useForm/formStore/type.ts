import { ValidateError } from 'async-validator';
import { ChangeEvent, ReactElement, RefObject } from 'react';

export type StoreValue = any;

export type Listener = (fieldsMap: Record<string, FormFieldInstance>) => void;

export interface FormInstance {
  // Origin Form API
  // getFieldValue: (name: NamePath) => StoreValue;
  getFieldValue: (name: string) => StoreValue;
  // getFieldsValue: (() => Values) &
  //   ((nameList: NamePath[] | true, filterFunc?: FilterFunc) => any) &
  //   ((config: GetFieldsValueConfig) => any);
  // getFieldError: (name: NamePath) => string[];
  // getFieldsError: (nameList?: NamePath[]) => FieldError[];
  // getFieldWarning: (name: NamePath) => string[];
  // isFieldsTouched: ((nameList?: NamePath[], allFieldsTouched?: boolean) => boolean) &
  //   ((allFieldsTouched?: boolean) => boolean);
  // isFieldTouched: (name: NamePath) => boolean;
  // isFieldValidating: (name: NamePath) => boolean;
  // isFieldsValidating: (nameList?: NamePath[]) => boolean;
  resetFields: (names?: string[]) => void;
  // setFields: (fields: FieldData[]) => void;
  // setFieldValue: (name: NamePath, value: any) => void;
  setFieldsValue: (values: Record<string, StoreValue>) => void;
  validateFields: (names?: string[]) => Promise<Record<string, StoreValue>>;
  // // New API
  // submit: () => void;
  sub: (fn: Listener) => void;
}

export type FormFielOptions = {
  disabled?: boolean;
  // validation rules
  rules?: Rule[];
};

export interface FormFieldInstance {
  name: string;
  isDirty: boolean;
  ref: RefObject<HTMLElement>;
  disabled: boolean;
  value: StoreValue;
  isValidating: boolean;
  errors: string[];
  validate: (shouldFlush?: boolean) => Promise<void>;
  updateOptions: (options: FormFielOptions) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetField: () => void;
  setValue: (value: StoreValue) => void;
}

export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email';

type AggregationRule = BaseRule & Partial<ValidatorRule>;

interface ArrayRule extends Omit<AggregationRule, 'type'> {
  type: 'array';
  defaultField?: RuleObject;
}

export type RuleObject = AggregationRule | ArrayRule;

export type RuleRender = (form: FormInstance) => RuleObject;

// export type Rule = RuleObject | RuleRender;
export type Rule = RuleObject;

type Validator = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void,
) => Promise<void | any> | void;

export interface ValidatorRule {
  // warningOnly?: boolean;
  message?: string | ReactElement;
  validator: Validator;
}

interface BaseRule {
  // warningOnly?: boolean;
  // enum?: StoreValue[];
  //   len?: number;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
  message?: string | ReactElement;
  pattern?: RegExp;
  required?: boolean;
  type?: RuleType;
}

export type Aggregation = BaseRule;

export type RuleValidateError = ValidateError;

export type RuleError = {
  errors: string[];
  rule: RuleObject;
};
