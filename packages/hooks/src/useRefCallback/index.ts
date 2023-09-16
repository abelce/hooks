import { DependencyList, useCallback, useRef } from 'react';
import { Noop } from '../types';

const useRefCallback = <T extends Noop>(fn: T, deps: DependencyList): any => {
  const ref = useRef<T>();

  ref.current = useCallback(fn, deps);

  return useCallback((...args: Parameters<T>): any => {
    return ref.current?.(...(args as []));
  }, []);
};

export default useRefCallback;
