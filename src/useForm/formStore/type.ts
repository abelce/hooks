import { RuleType, ValidateError } from 'async-validator';
import { ChangeEvent, FormEvent, ReactElement } from 'react';

export type StoreValue = any;

export type Listener = (fieldsMap: Record<string, FormFieldInstance>) => void;

export type FormInstanceOptions = {
  // form name，if not pass, will gen auto
  name?: string;
  initValues?: Record<string, any>;
  disabled?: boolean;
};

export interface FormInstance {
  name?: string;
  options?: FormInstanceOptions;
  errors: Record<string, string[]> | null;
  isDirty: boolean;
  register: (
    name: string,
    options: FormFielOptions,
  ) => FieldInfo & {
    onChange: FormFieldInstance['onChange'];
  };
  // Origin Form API
  // getFieldValue: (name: NamePath) => StoreValue;
  getFieldValue: (name: string) => StoreValue;
  // getFieldsValue: (() => Values) &
  //   ((nameList: NamePath[] | true, filterFunc?: FilterFunc) => any) &
  //   ((config: GetFieldsValueConfig) => any);
  getFieldError: (name: string) => string[];
  getFieldsError: (nameList?: string[]) => FieldError[];
  // getFieldWarning: (name: NamePath) => string[];
  // isFieldsTouched: ((nameList?: NamePath[], allFieldsTouched?: boolean) => boolean) &
  //   ((allFieldsTouched?: boolean) => boolean);
  // isFieldTouched: (name: NamePath) => boolean;
  // isFieldValidating: (name: NamePath) => boolean;
  // isFieldsValidating: (nameList?: NamePath[]) => boolean;
  // get field info
  getField: (name: string) => FieldInfo | undefined;
  getFields: (nameList?: string[]) => FieldInfo[];
  resetFields: (nameList?: string[]) => void;
  // setFields: (fields: FieldData[]) => void;
  // setFieldValue: (name: NamePath, value: any) => void;
  setFieldsValue: (values: Record<string, StoreValue>) => void;
  scrollField: (name: string) => void;
  validateFields: (nameList?: string[]) => Promise<Record<string, StoreValue>>;
  // // New API
  submit: (
    onFinish: (values: Record<string, any>) => void,
    onFinishFailed?: (errors: any, values: Record<string, any>) => void,
  ) => (e: FormEvent<HTMLFormElement>) => Promise<void>;

  sub: (fn: Listener) => void;
  flush: () => void;
}

export type FieldError = {
  name: string;
  errors: string[];
};

export type FormFielOptions = {
  disabled?: boolean;
  // validation rules
  rules?: Rule[];
};

export type FieldInfo = {
  id: string;
  name: string;
  isDirty: boolean;
  ref: { current: any };
  disabled: boolean;
  value: StoreValue;
  isValidating: boolean;
  errors: string[];
};

export interface FormFieldInstance extends FieldInfo {
  validate: (shouldFlush?: boolean) => Promise<void>;
  updateOptions: (options: FormFielOptions) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetField: () => void;
  setValue: (value: StoreValue) => void;
}

// export type RuleType =
//   | 'string'
//   | 'number'
//   | 'boolean'
//   | 'method'
//   | 'regexp'
//   | 'integer'
//   | 'float'
//   | 'object'
//   | 'enum'
//   | 'date'
//   | 'url'
//   | 'hex'
//   | 'email';

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
  enum?: StoreValue[];
  len?: number;
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
