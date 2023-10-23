import { ValidateError } from 'async-validator';
import { ReactElement } from 'react';

export type StoreValue = any;

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
  // resetFields: (fields?: NamePath[]) => void;
  // setFields: (fields: FieldData[]) => void;
  // setFieldValue: (name: NamePath, value: any) => void;
  // setFieldsValue: (values: RecursivePartial<Values>) => void;
  // validateFields: ValidateFields<Values>;
  // // New API
  // submit: () => void;
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
