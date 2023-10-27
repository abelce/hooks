import isString from '@/utils/isString';
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

  /**
   * id = `${form.name}_${this.name}`
   */
  public get id() {
    return [this.formState.name, this.name].filter(Boolean).join('_');
  }

  private _value: StoreValue;

  private _valuePropName: string = 'value';

  public get valuePropName() {
    return this._valuePropName;
  }

  public get value() {
    return this._value;
  }

  public readonly initValue: StoreValue = undefined;

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
    this._value = this.initValue;
    if (this.options?.valuePropName && isString(this.options?.valuePropName)) {
      this._valuePropName = this.options?.valuePropName;
    }
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
  private updateIsDirty(oldValue: StoreValue, nextValue: StoreValue) {
    this.isDirty = oldValue !== nextValue;
  }

  private getRules(): RuleObject[] {
    return this.options?.rules || [];
  }

  public async validate(shouldFlush?: boolean) {
    this.isValidating = true;
    let nextErrors: string[] = [];
    return validateRules(this.name, this._value, this.getRules())
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

  public onChange<T extends ChangeEvent<HTMLInputElement>>(e: T) {
    const getNextValue = (): StoreValue => {
      /**
       * if e is instance of event, get the value from e.target
       * otherwise return e;
       */
      if (e instanceof Event) {
        const target = e.target;
        // const name = target.name;

        return target[this._valuePropName as keyof typeof target];
      }
      return e;
    };

    this.udpateValue(getNextValue());
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

  public getValue() {
    return this.value;
  }
}

export default FormField;
