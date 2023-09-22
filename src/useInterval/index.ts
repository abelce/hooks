import { useCallback, useEffect, useRef } from 'react';
import { Noop } from '../types';
import useLatest from '../useLatest';

export interface UseIntervalReturn {
  run: () => void;
  clear: () => void;
  reset: () => void;
}

const useInterval = (
  fn: Noop,
  options?: {
    delay?: number;
    immediate?: boolean;
  },
): UseIntervalReturn => {
  const callback = useLatest<Noop>(fn);
  const interval = useRef<NodeJS.Timeout>();

  const run = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(() => {
      callback.current?.();
    }, options?.delay || 0);
  }, []);

  const clear = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  }, []);

  useEffect(() => {
    if (options?.immediate) {
      run();
    }
  }, []);

  return {
    run,
    clear,
    reset: run,
  };
};

export default useInterval;
