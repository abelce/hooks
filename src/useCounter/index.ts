import { useState } from 'react';
import isNumber from '../utils/isNumber';

export type UseCounterOptions = {
  min?: number;
  max?: number;
  delta?: number; // default 1
};

const resolveValue = (value: number, min?: number, max?: number): number => {
  let result = value;
  if (isNumber(min)) {
    result = Math.max(result, min);
  }
  if (isNumber(max)) {
    result = Math.min(result, max);
  }
  return result;
};

const useCounter = (
  initValue: number,
  options?: UseCounterOptions,
): [
  number,
  {
    inc: (delta?: number) => void;
    dec: (delta?: number) => void;
    set: (value: number) => void;
    reset: (value?: number) => void;
  },
] => {
  if (!isNumber(initValue)) {
    throw new Error(
      'initValue has to be a number, but got a ' + typeof initValue,
    );
  }

  const [current, setCurrent] = useState(
    resolveValue(initValue, options?.min, options?.max),
  );

  const initDelta = options && isNumber(options?.delta) ? options.delta : 1;

  const setValue = (newValue: number) => {
    setCurrent(resolveValue(newValue, options?.min, options?.max));
  };

  const inc = (delta?: number) => {
    let actDelta = isNumber(delta) ? delta : initDelta;
    setValue(current + actDelta);
  };

  const dec = (delta?: number) => {
    const actDelta = isNumber(delta) ? delta : initDelta;
    setValue(current - actDelta);
  };

  const set = (value: number) => {
    setValue(value);
  };

  const reset = (value?: number) => {
    if (isNumber(value)) {
      setValue(value);
    } else {
      setValue(initValue);
    }
  };

  return [
    current,
    {
      inc,
      dec,
      set,
      reset,
    },
  ];
};

export default useCounter;
