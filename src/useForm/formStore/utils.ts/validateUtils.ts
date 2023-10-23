import AsyncValidatorSchema from 'async-validator';

import { RuleObject, RuleValidateError, StoreValue } from '../type';

const validateRule = (
  name: string,
  value: StoreValue,
  rule: RuleObject,
): Promise<RuleValidateError[] | null> => {
  const validator = new AsyncValidatorSchema({ [name]: rule } as any);

  return new Promise((resolve) => {
    validator.validate(
      { [name]: value },
      (errors: RuleValidateError[] | null) => {
        resolve(errors);
      },
    );
  });
};

export const validateRules = async (
  name: string,
  value: StoreValue,
  rules: RuleObject[],
): Promise<RuleValidateError[]> => {
  const rulePromises = await Promise.all(
    rules.map(async (rule) => await validateRule(name, value, rule)),
  );

  return rulePromises.reduce(
    (
      allErrors: RuleValidateError[],
      ruleErrors: RuleValidateError[] | null,
    ) => {
      if (ruleErrors) {
        return [...allErrors, ...ruleErrors];
      }
      return allErrors;
    },
    [] as RuleValidateError[],
  );
};
