import { RuleType, ValidateError } from 'async-validator';
import { ChangeEvent, FormEvent, ReactElement } from 'react';

export type StoreValue = any;

export type Listener = (fieldsMap: Record<string, FormFieldInstance>) => void;

export type FormInstanceOptions = {
  // form name，if not pass, will gen auto
  name?: string;
  initValues?: Record<string, StoreValue>;
  disabled?: boolean;
};

export interface RegisterReturn
  extends Pick<FieldInfo, 'id' | 'name' | 'ref' | 'disabled'> {
  onChange: FormFieldInstance['onChange'];
}

export interface FormInstance {
  name?: string;
  options?: FormInstanceOptions;
  errors: Record<string, string[]> | null;
  isDirty: boolean;
  // methods
  register: (name: string, options?: FormFielOptions) => RegisterReturn;
  getFieldValue: (name: string) => StoreValue;
  getFieldError: (name: string) => string[];
  getFieldsError: (nameList?: string[]) => FieldError[];
  // validate
  validateFields: (nameList?: string[]) => Promise<Record<string, StoreValue>>;
  isFieldValidating: (name: string) => boolean;
  isFieldsValidating: (nameList?: string[]) => boolean;
  // get field info
  getField: (name: string) => FieldInfo | undefined;
  getFields: (nameList?: string[]) => FieldInfo[];
  resetFields: (nameList?: string[]) => void;
  setFieldsValue: (values: Record<string, StoreValue>) => void;
  scrollField: (name: string) => void;

  // the callback for form onSubmit method
  handleSubmit: (
    onFinish: (values: Record<string, StoreValue>) => void,
    onFinishFailed?: (errors: any, values: Record<string, StoreValue>) => void,
  ) => (event: FormEvent<HTMLFormElement>) => Promise<void>;
  // submit form
  submit: (
    callback: (errors: any, values: Record<string, StoreValue>) => void,
  ) => Promise<void>;

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
  valuePropName?: string;
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
} & Record<string, any>;

export interface FormFieldInstance extends FieldInfo {
  valuePropName: string;
  validate: (shouldFlush?: boolean) => Promise<void>;
  updateOptions: (options?: FormFielOptions) => void;
  onChange: (e: ChangeEvent<HTMLInputElement> | any) => void;
  resetField: () => void;
  setValue: (value: StoreValue) => void;
  getValue: () => StoreValue;
}

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
