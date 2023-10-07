import isFunction from '@/utils/isFunction';
import { getWorkerTimer } from '@/utils/work-timer/helper';
import { useCallback, useEffect, useRef } from 'react';
import { Noop } from '../types';
import useLatest from '../useLatest';

export type UseTimeoutFnReturn = {
  run: (...args: Parameters<Noop>) => void;
  isReady: () => boolean | null;
  reset: (...args: Parameters<Noop>) => void;
  cancel: () => void;
};

const clearTimer = (
  webWorker: boolean = false,
  timer: () => void | NodeJS.Timeout | undefined,
) => {
  if (webWorker) {
    timer?.();
  }

  clearTimeout(timer as unknown as NodeJS.Timeout);
};

const useTimeoutFn = (
  fn: Noop,
  options?: {
    delay?: number;
    immediate?: boolean;
    webWorker?: boolean;
  },
): UseTimeoutFnReturn => {
  if (!isFunction(fn)) {
    throw new Error('fn has to be a function, but got a ' + typeof fn);
  }

  const timeoutRef = useRef<() => void | NodeJS.Timeout>();
  const readyRef = useRef<boolean | null>(null);
  const fnRef = useLatest(fn);
  const delay = options?.delay || 0;

  const reset = useCallback(
    (...args: Parameters<Noop>) => {
      readyRef.current = false;
      if (timeoutRef.current) {
        clearTimer(options?.webWorker, timeoutRef.current);
      }

      timeoutRef.current = (
        options?.webWorker ? getWorkerTimer().setTimeout : setTimeout
      )(() => {
        readyRef.current = true;
        fnRef.current?.(...args);
        if (timeoutRef.current) {
          clearTimer(options?.webWorker, timeoutRef.current);
        }
      }, delay) as () => void | NodeJS.Timeout;
    },
    [delay],
  );

  const isReady = useCallback(() => readyRef.current, []);

  const cancel = useCallback(() => {
    readyRef.current = null;
    if (timeoutRef.current) {
      clearTimer(options?.webWorker, timeoutRef.current);
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
