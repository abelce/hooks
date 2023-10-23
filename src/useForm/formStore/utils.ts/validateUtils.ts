import AsyncValidatorSchema, { ValidateError } from 'async-validator';

import { RuleObject, StoreValue } from '../type';

const validateRule = async (
  name: string,
  value: StoreValue,
  rule: RuleObject,
) => {
  const validator = new AsyncValidatorSchema({ [name]: rule } as any);

  try {
    await validator.validate(
      { [name]: value },
      (errors: ValidateError[] | null, values: StoreValue) => {
        console.log(errors, values);
      },
    );
  } catch (errors: unknown) {}
};

export const validateRules = (
  name: string,
  value: StoreValue,
  rules: RuleObject[],
) => {
  rules.map((rule) => validateRule(name, value, rule));
};
