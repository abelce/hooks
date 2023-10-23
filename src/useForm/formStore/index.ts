import { autobind } from 'core-decorators';
import { FormEvent } from 'react';
import FormField, { FormFielOptions } from './formField';
import { FormInstance, RuleValidateError, StoreValue } from './type';

type Listener = (fieldsStateMap: Record<string, FormField>) => void;

export type FormStateOptions = {
  initValues?: Record<string, any>;
  disabled?: boolean;
};

@autobind
class FormStore implements FormInstance {
  private listeners: Listener[] = [];

  private fieldsStateMap: Record<string, FormField> = {};

  public get errors() {
    return Object.values(this.fieldsStateMap).reduce(
      (errors: RuleValidateError[], fieldState) => {
        if (fieldState.errors?.length) {
          return [...errors, ...fieldState.errors];
        }
        return errors;
      },
      [],
    );
  }

  constructor(public options: FormStateOptions = {}) {}

  public formOptions(options: FormStateOptions) {
    this.options = {
      ...options,
      initValues: this.options?.initValues,
    };
  }

  private createFieldState(name: string, options: FormFielOptions) {
    this.fieldsStateMap[name] = new FormField(this, name, options);
    return this.fieldsStateMap[name];
  }

  /**
   * udpate field state
   * @param name
   * @param partialFieldState
   */
  private updateFieldState(name: string, options: FormFielOptions) {
    this.fieldsStateMap[name].updateOptions(options);
    return this.fieldsStateMap[name];
  }

  public async validate() {
    await Promise.all(
      Object.values(this.fieldsStateMap).map((fieldState) =>
        fieldState.validate(),
      ),
    );
    this.flush();
  }

  /**
   * call the listeners
   */
  public flush() {
    this.listeners.forEach((l) => {
      l(this.fieldsStateMap);
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
    let field = this.fieldsStateMap[name];
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
  public getFieldsValue(): Record<string, any> {
    return Object.entries(this.fieldsStateMap).reduce(
      (values: Record<string, any>, [name, state]) => {
        values[name] = state.value;
        return values;
      },
      {},
    );
  }
  /**
   * @param handleSubmit
   */
  public handleSubmit(
    onFinished: (values: Record<string, any>) => void,
    onFailed: (errors: any, values: Record<string, any>) => void,
  ) {
    return (e: FormEvent) => {
      e.preventDefault?.();

      console.log(onFinished, onFailed);

      onFinished(this.getFieldsValue());
    };
  }

  public getFieldValue(name: string): StoreValue {
    return this.fieldsStateMap[name].value;
  }
}

export default FormStore;
