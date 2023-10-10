export type ValidationValue = number | string | boolean | RegExp;

export type ValidationRule<
  TValidationRule extends ValidationValue = ValidationValue,
> = TValidationRule | ValidationValueMessage<TValidationRule>;

export type ValidationValueMessage<
  TValidationRule extends ValidationValue = ValidationValue,
> = {
  value: TValidationRule;
  message: string;
};

export interface UseFormRegisterOptions {
  min?: ValidationRule<number | string>;
  max?: ValidationRule<number | string>;
  minLength?: ValidationRule<number | string>;
  maxLength?: ValidationRule<number | string>;
}

export type UseFormRegister = (
  name: string,
  options: UseFormRegisterOptions,
) => void;

// export interface UseFormProps {
//     // disabled?: boolean;
// }

export interface UseFormReturn {
  reggister: UseFormRegister;
}
