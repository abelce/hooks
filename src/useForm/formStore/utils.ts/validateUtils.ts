import AsyncValidatorSchema, {
  ValidateError,
  ValidateFieldsError,
  Values,
} from 'async-validator';

import { RuleError, RuleObject, StoreValue } from '../type';

const validateRule = async (
  name: string,
  value: StoreValue,
  rule: RuleObject,
): Promise<string[]> => {
  const validator = new AsyncValidatorSchema({ [name]: rule } as any);

  let result: string[] = [];
  try {
    await validator.validate({ [name]: value });
  } catch (err: unknown) {
    const errObj = err as {
      errors: ValidateError[] | null;
      fields: ValidateFieldsError | Values;
    };
    if (errObj.errors) {
      result = errObj.errors.map((error) => error.message as string);
    }
  }
  return result;
};

export const validateRules = async (
  name: string,
  value: StoreValue,
  rules: RuleObject[],
  // validateFirst?: boolean,
): Promise<RuleError[]> => {
  for (const rule of rules) {
    const errors = await validateRule(name, value, rule);
    if (errors?.length) {
      return [
        {
          errors,
          rule,
        },
      ];
    }
  }

  return [];
};
