import { ChangeEvent, FormEvent } from 'react';
import { FieldOptions, FieldState } from './types/store';

type Listener = (fieldsStateMap: Record<string, FieldState>) => void;

class Store {
  private listeners: Listener[] = [];

  private fieldsStateMap: Record<string, FieldState> = {};

  private shouldFlush: boolean = false;

  constructor(
    private readonly options: {
      initValues: Record<string, any>;
      disabled?: boolean;
    },
  ) {}

  private createFieldState(name: string, options: FieldOptions) {
    const newFieldState: FieldState = {
      name,
      value: this.options?.initValues?.[name],
      isDirty: false,
      ref: { current: null },
      disabled: this.options.disabled || options.disabled,
    };
    this.fieldsStateMap[name] = newFieldState;
  }

  /**
   * udpate field state
   * @param name
   * @param partialFieldState
   */
  private updateFieldState(
    name: string,
    partialFieldState: Partial<FieldState> = {},
  ) {
    const newFieldValue = {
      ...this.fieldsStateMap[name],
      ...partialFieldState,
    };

    // check dirty
    newFieldValue.isDirty =
      newFieldValue.value !== this.options?.initValues?.[name];
  }

  private onChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.updateFieldState(name, { value });
    this.flush();
  }

  private flush() {
    if (this.shouldFlush) {
      this.listeners.forEach((l) => {
        l(this.fieldsStateMap);
      });
      this.shouldFlush = false;
    }
  }

  public sub(fn: Listener) {
    this.listeners.push(fn);
  }

  /**
   * register field
   * @param name
   * @returns
   */
  public register(name: string, options: FieldOptions) {
    this.createFieldState(name, options);
    const props = {
      name,
      value: this.fieldsStateMap[name].value,
      disabled: this.fieldsStateMap[name].disabled,
      ref: this.fieldsStateMap[name].ref,
      onChange: this.onChange,
    };
    return props;
  }

  /**
   * @param onSubmit
   */
  public onSubmit(
    onFinished: (values: any[]) => void,
    onFailed: (errors: any) => void,
  ) {
    return (e: FormEvent) => {
      e.preventDefault?.();

      console.log(onFinished, onFailed);
    };
  }
}

export default Store;
