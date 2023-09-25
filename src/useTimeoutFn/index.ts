import isFunction from '@/utils/isFunction';
import { useCallback, useEffect, useRef } from 'react';
import { Noop } from '../types';
import useLatest from '../useLatest';

export type UseTimeoutFnReturn = {
  run: () => void;
  isReady: () => boolean | null;
  reset: () => void;
  cancel: () => void;
};

const useTimeoutFn = (
  fn: Noop,
  options?: {
    delay?: number;
    immediate?: boolean;
  },
): UseTimeoutFnReturn => {
  if (!isFunction(fn)) {
    throw new Error('fn has to be a function, but got a ' + typeof fn);
  }

  const timeoutRef = useRef<NodeJS.Timeout>();
  const readyRef = useRef<boolean | null>(null);
  const fnRef = useLatest(fn);
  const delay = options?.delay || 0;

  const reset = useCallback(() => {
    readyRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      readyRef.current = true;
      fnRef.current?.();
      clearTimeout(timeoutRef.current);
    }, delay);
  }, [delay]);

  const isReady = useCallback(() => readyRef.current, []);

  const cancel = useCallback(() => {
    readyRef.current = null;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (options?.immediate) {
      reset();
      return cancel;
    }
  }, []);

  return {
    run: reset,
    isReady,
    reset,
    cancel,
  };
};

export default useTimeoutFn;
