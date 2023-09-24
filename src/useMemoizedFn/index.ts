import { useCallback, useMemo, useRef } from 'react';
import { Noop } from '../types';

const useMemoizedFn = <T extends Noop>(fn: T) => {
  const ref = useRef<T>(fn);

  ref.current = useMemo(() => fn, [fn]);

  // console.log("ref.current:", fn)
  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    return ref.current?.(...(args as []));
  }, []);
};

export default useMemoizedFn;
