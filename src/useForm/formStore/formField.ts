import { autobind } from 'core-decorators';
import { ChangeEvent, RefObject } from 'react';
import FormState from '.';
import { Rule, RuleObject } from './type';
import { validateRules } from './utils.ts/validateUtils';

export type FormFielOptions = {
  disabled?: boolean;
  // validation rules
  rules?: Rule[];
};

export type FieldRule = {
  required?: boolean;
};

@autobind
class FormField {
  public isDirty: boolean = false;

  public ref: RefObject<HTMLElement> = { current: null };

  public get disabled() {
    return this.formState.options?.disabled || this.options?.disabled;
  }

  private _value: any;
  public get value() {
    return this._value ?? this.initValue;
  }

  public readonly initValue: any = undefined;

  constructor(
    readonly formState: FormState,
    public readonly name: string,
    public options?: FormFielOptions,
  ) {
    this.initValue = formState.options.initValues?.[name];
  }

  /**
   * update isDirty
   * @param oldValue
   * @param newValue
   */
  private updateIsDirty(oldValue: any, newValue: any) {
    this.isDirty = oldValue === newValue;
  }

  private getRules(): RuleObject[] {
    const rules = this.options?.rules || [];
    return rules;
  }

  private validate() {
    validateRules(this.name, this.value, this.getRules());
  }

  // <! ------ public method ----------- >
  /**
   * allow dynamic updates of options
   * @param options
   */
  public updateOptions(options: FormFielOptions = {}) {
    this.options = options;
  }

  public onChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;
    if (name === this.name) {
      const value = target.value;
      const oldValue = this._value;
      this._value = value;
      this.updateIsDirty(oldValue, value);
    }
    this.validate();
    this.formState.flush();
  }
}

export default FormField;
