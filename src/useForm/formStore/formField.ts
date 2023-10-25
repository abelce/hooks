import { autobind } from 'core-decorators';
import { ChangeEvent } from 'react';
import {
  FormFieldInstance,
  FormFielOptions,
  FormInstance,
  RuleError,
  RuleObject,
  StoreValue,
} from './type';
import { validateRules } from './utils.ts/validateUtils';

export type FieldRule = {
  required?: boolean;
};

@autobind
class FormField implements FormFieldInstance {
  public ref: { current: any } = { current: null };

  public get id() {
    return [this.formState.name, this.name].filter(Boolean).join('_');
  }

  private _value: any;

  public get value() {
    return this._value ?? this.initValue;
  }

  public readonly initValue: any = undefined;

  public get disabled() {
    return (
      (this.formState.options?.disabled || this.options?.disabled) ?? false
    );
  }
  public isDirty: boolean = false;

  public isValidating: boolean = false;

  public errors: string[] = [];

  constructor(
    readonly formState: FormInstance,
    public readonly name: string,
    public options?: FormFielOptions,
  ) {
    this.initValue = formState.options?.initValues?.[name];
  }

  private udpateValue(nextValue: StoreValue) {
    const oldValue = this._value;
    this._value = nextValue;
    this.updateIsDirty(oldValue, this._value);
  }

  /**
   * update isDirty
   * @param oldValue
   * @param nextValue
   */
  private updateIsDirty(oldValue: any, nextValue: any) {
    this.isDirty = oldValue !== nextValue;
  }

  private getRules(): RuleObject[] {
    return this.options?.rules || [];
  }

  public async validate(shouldFlush?: boolean) {
    this.isValidating = true;
    let nextErrors: string[] = [];
    return validateRules(this.name, this.value, this.getRules())
      .catch((ruleErrors) => ruleErrors)
      .then((ruleErrors: RuleError[]) => {
        if (ruleErrors.length) {
          ruleErrors.forEach(({ errors }) => {
            nextErrors.push(...errors);
          });
        }
      })
      .finally(() => {
        this.isValidating = false;
        this.errors = nextErrors;
        if (shouldFlush) {
          this.formState.flush();
        }
      });
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
      this.udpateValue(value);
    }
    this.validate(true);
    this.formState.flush();
  }

  /**
   * reset field state
   */
  public resetField() {
    this._value = this.formState.options?.initValues?.[this.name];
    this.errors = [];
    this.isValidating = false;
    this.isDirty = false;
  }

  /**
   * set the value to nextValue
   * @param nextValue
   */
  public setValue(nextValue: StoreValue) {
    this.udpateValue(nextValue);
  }
}

export default FormField;
