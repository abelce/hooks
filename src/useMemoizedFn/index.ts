import { useCallback, useMemo, useRef } from 'react';
import { Noop } from '../types';

const useMemoizedFn = <T extends Noop>(fn: T) => {
  const ref = useRef<T>(fn);

  ref.current = useMemo(() => fn, [fn]);

  return useCallback(function (...args: Parameters<T>): ReturnType<T> {
    return ref.current.apply(this, args);
  }, []);
};

export default useMemoizedFn;
