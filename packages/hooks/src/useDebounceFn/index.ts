import { Noop } from '../types';
import useTimeoutFn from '../useTimeoutFn';

const useDebounceFn = (fn: Noop, wait: number = 0) => {
  return useTimeoutFn(fn, { delay: wait });
};

export default useDebounceFn;
