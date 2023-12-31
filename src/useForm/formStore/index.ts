import isFunction from '@/utils/isFunction';
import { autobind } from 'core-decorators';
import { FormEvent } from 'react';
import FormField from './formField';
import {
  FieldError,
  FieldInfo,
  FormFieldInstance,
  FormFielOptions,
  FormInstance,
  FormInstanceOptions,
  Listener,
  StoreValue,
} from './type';

@autobind
class FormStore implements FormInstance {
  public name?: string;
  private listeners: Listener[] = [];

  private fieldsMap: Record<string, FormFieldInstance> = {};

  public get errors(): Record<string, string[]> | null {
    let result: Record<string, string[]> | null = null;
    Object.values(this.fieldsMap).forEach((field) => {
      if (field.errors.length) {
        if (!result) {
          result = {
            [field.name]: field.errors,
          };
        } else {
          result[field.name] = field.errors;
        }
      }
    });

    return result;
  }

  public get isDirty() {
    return Object.values(this.fieldsMap).some((field) => field.isDirty);
  }

  constructor(public options: FormInstanceOptions = {}) {
    this.name = this.options?.name;
  }

  public formOptions(options: FormInstanceOptions) {
    this.options = {
      ...options,
      initValues: this.options?.initValues,
      name: this.options?.name,
    };
  }

  private createFieldState(name: string, options: FormFielOptions = {}) {
    return (this.fieldsMap[name] = new FormField(this, name, options));
  }

  /**
   * filter fields name
   * @param nameList
   * @returns
   */
  private getFieldNameList(nameList?: string[]): string[] {
    return Array.isArray(nameList) ? nameList : Object.keys(this.fieldsMap);
  }

  /**
   * udpate field state
   * @param name
   * @param partialFieldState
   */
  private updateFieldState(name: string, options?: FormFielOptions) {
    this.fieldsMap[name].updateOptions(options);
    return this.fieldsMap[name];
  }

  public async validate(nameList?: string[]) {
    const fields = this.getFieldNameList(nameList).map(
      (name) => this.fieldsMap[name],
    );

    await Promise.all(fields.map((field) => field.validate()));

    this.flush();
  }

  /**
   * call the listeners
   */
  public flush() {
    this.listeners.forEach((l) => {
      l(this.fieldsMap);
    });
  }

  // call the listeners after state changed
  public sub(fn: Listener) {
    this.listeners.push(fn);
  }

  /**
   * register field
   * @param name
   * @returns
   */
  public register(name: string, options: FormFielOptions = {}) {
    let field = this.fieldsMap[name];
    if (field) {
      field = this.updateFieldState(name, options);
    } else {
      field = this.createFieldState(name, options);
    }

    const fieldInfo = this.getField(name) as FieldInfo;

    return {
      id: fieldInfo.id,
      name: fieldInfo.name,
      ref: fieldInfo.ref,
      disabled: fieldInfo.disabled,
      [field.valuePropName]: field?.getValue(),
      onChange: field.onChange,
    };
  }

  // field value
  /**
   * return all field value
   * @returns
   */
  public getFieldsValue(nameList?: string[]): Record<string, StoreValue> {
    const names = this.getFieldNameList(nameList);
    return names.reduce((values: Record<string, StoreValue>, name) => {
      values[name] = this.fieldsMap[name].value;
      return values;
    }, {});
  }
  /**
   * get field value
   * @param name
   * @returns
   */
  public getFieldValue(name: string): StoreValue {
    return this.fieldsMap[name]?.value;
  }

  public setFieldsValue(values: Record<string, StoreValue>) {
    for (const [name, value] of Object.entries(values)) {
      this.fieldsMap[name]?.setValue(value);
    }
  }

  public async submit(
    callback: (errors: any, values: Record<string, StoreValue>) => void,
  ) {
    if (!isFunction(callback)) {
      throw new Error(
        `callback must be a function, but got a ${typeof callback}`,
      );
    }
    await this.validate();
    callback(this.errors, this.getFieldsValue());
  }
  /**
   * @param handleSubmit
   */
  public handleSubmit(
    onFinish: (values: Record<string, StoreValue>) => void,
    onFinishFailed?: (errors: any, values: Record<string, StoreValue>) => void,
  ) {
    return async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault?.();

      await this.validate();

      const _values = this.getFieldsValue();
      if (this.errors) {
        onFinishFailed?.(this.errors, _values);
        return;
      }
      onFinish?.(_values);
    };
  }

  public isFieldValidating(name: string) {
    if (this.fieldsMap[name]) {
      return this.fieldsMap[name].isValidating;
    }
    return false;
  }

  public isFieldsValidating(nameList?: string[]) {
    return this.getFieldNameList(nameList).some(
      (name) => this.fieldsMap[name].isValidating,
    );
  }

  /**
   * make the page scroll to the specific field
   * @param name
   */
  public scrollField(name: string) {
    const ele = this.fieldsMap[name]?.ref?.current;
    if (ele) {
      console.log(ele);
      ele.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * validate fields
   * @param nameList
   */
  public async validateFields(nameList?: string[]) {
    await this.validate(nameList);
    if (this.errors) {
      return Promise.reject({
        values: this.getFieldsValue(nameList),
        errrors: this.errors,
      }).catch((e) => e);
    }
    return this.getFieldsValue(nameList);
  }

  // field info
  public getField(name: string): FieldInfo | undefined {
    const field = this.fieldsMap[name];
    return {
      name,
      id: field?.id,
      isDirty: field?.isDirty,
      ref: field?.ref,
      disabled: field?.disabled,
      value: field?.getValue(),
      isValidating: field?.isValidating,
      errors: field?.errors,
    };
  }

  public getFields(nameList?: string[]): FieldInfo[] {
    const fields: FieldInfo[] = [];
    this.getFieldNameList(nameList).forEach((name) => {
      const _field = this.getField(name);
      if (_field) {
        fields.push(_field);
      }
    });

    return fields;
  }

  public resetFields(nameList?: string[]): void {
    this.getFieldNameList(nameList).forEach((name) => {
      this.fieldsMap[name]?.resetField();
    });
  }

  // errors
  public getFieldError(name: string) {
    return this.fieldsMap[name].errors;
  }

  public getFieldsError(nameList?: string[]) {
    const errors: FieldError[] = [];
    this.getFieldNameList(nameList).forEach((name) => {
      const _field = this.getField(name);
      if (_field) {
        errors.push({
          name,
          errors: _field.errors,
        });
      }
    });

    return errors;
  }
}

export default FormStore;
