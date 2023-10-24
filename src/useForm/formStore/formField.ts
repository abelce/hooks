import { autobind } from 'core-decorators';
import { ChangeEvent, RefObject } from 'react';
import FormState from '.';
import {
  FormFieldInstance,
  FormFielOptions,
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
  public isDirty: boolean = false;

  public ref: RefObject<HTMLElement> = { current: null };

  public get disabled() {
    return (
      (this.formState.options?.disabled || this.options?.disabled) ?? false
    );
  }

  private _value: any;

  public get value() {
    return this._value ?? this.initValue;
  }

  public readonly initValue: any = undefined;

  public isValidating: boolean = false;

  public errors: string[] = [];

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
      const oldValue = this._value;
      this._value = value;
      this.updateIsDirty(oldValue, value);
    }
    this.validate(true);
    this.formState.flush();
  }

  /**
   * reset field state
   */
  public resetField() {
    this._value = this.formState.options.initValues?.[this.name];
    this.errors = [];
    this.isValidating = false;
    this.isDirty = false;
  }

  /**
   * set the value to nextValue
   * @param nextValue
   */
  public setValue(nextValue: StoreValue) {
    this._value = nextValue;
  }
}

export default FormField;
