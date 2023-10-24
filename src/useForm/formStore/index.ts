import { autobind } from 'core-decorators';
import { FormEvent } from 'react';
import FormField from './formField';
import {
  FormFieldInstance,
  FormFielOptions,
  FormInstance,
  Listener,
  StoreValue,
} from './type';

export type FormStateOptions = {
  initValues?: Record<string, any>;
  disabled?: boolean;
};

@autobind
class FormStore implements FormInstance {
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

  constructor(public options: FormStateOptions = {}) {}

  public formOptions(options: FormStateOptions) {
    this.options = {
      ...options,
      initValues: this.options?.initValues,
    };
  }

  private createFieldState(name: string, options: FormFielOptions) {
    return (this.fieldsMap[name] = new FormField(this, name, options));
  }

  /**
   * udpate field state
   * @param name
   * @param partialFieldState
   */
  private updateFieldState(name: string, options: FormFielOptions) {
    this.fieldsMap[name].updateOptions(options);
    return this.fieldsMap[name];
  }

  public async validate(names?: string[]) {
    const fields = Array.isArray(names)
      ? Object.values(this.fieldsMap).filter((field) =>
          names.includes(field.name),
        )
      : Object.values(this.fieldsMap);
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
  public register(name: string, options: FormFielOptions) {
    let field = this.fieldsMap[name];
    if (field) {
      field = this.updateFieldState(name, options);
    } else {
      field = this.createFieldState(name, options);
    }

    return {
      name,
      value: field?.value,
      disabled: field?.disabled,
      ref: field?.ref,
      onChange: field.onChange,
    };
  }

  /**
   * return all field value
   * @returns
   */
  public getFieldsValue(names?: string[]): Record<string, StoreValue> {
    const fields = Array.isArray(names)
      ? Object.entries(this.fieldsMap).filter(([name]) => names.includes(name))
      : Object.entries(this.fieldsMap);
    return fields.reduce((values: Record<string, any>, [name, state]) => {
      values[name] = state.value;
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
  /**
   * @param handleSubmit
   */
  public submit(
    onFinish: (values: Record<string, any>) => void,
    onFinishFailed: (errors: any, values: Record<string, any>) => void,
  ) {
    return async (e: FormEvent) => {
      e.preventDefault?.();

      await this.validate();

      const _values = this.getFieldsValue();
      if (this.errors?.length) {
        onFinishFailed?.(this.errors, _values);
        return;
      }
      onFinish?.(_values);
    };
  }

  /**
   * make the page scroll to the specific field
   * @param name
   */
  public scrollField(name: string) {
    const ele = this.fieldsMap[name]?.ref?.current;
    if (ele) {
      ele.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * validate fields
   * @param names
   */
  public async validateFields(names?: string[]) {
    await this.validate(names);
    if (this.errors) {
      return Promise.reject({
        values: this.getFieldsValue(names),
        errrors: this.errors,
      });
    }
    return this.getFieldsValue(names);
  }

  public resetFields(names?: string[]): void {
    const resetNames = Array.isArray(names)
      ? names
      : Object.keys(this.fieldsMap);
    resetNames.forEach((name) => {
      this.fieldsMap[name]?.resetField();
    });
  }

  public setFieldsValue(values: Record<string, StoreValue>) {
    for (const [name, value] of Object.entries(values)) {
      this.fieldsMap[name]?.setValue(value);
    }
  }
}

export default FormStore;
