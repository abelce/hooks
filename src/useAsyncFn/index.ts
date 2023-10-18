import { PromiseNoop } from '@/types';
import { DependencyList, useCallback, useMemo, useRef, useState } from 'react';

export type UseAsyncFnState = {
  loading: boolean;
  value?: any;
  error?: Error;
};

export interface UseAsyncFnReturn<T extends PromiseNoop>
  extends UseAsyncFnState {
  run: T;
}

const useAsyncFn = <T extends PromiseNoop>(
  fn: T,
  deps?: DependencyList,
): UseAsyncFnReturn<T> => {
  const [state, setState] = useState<UseAsyncFnState>({ loading: false });
  const _callIdRef = useRef(0);
  const _fnRef = useRef<T>(fn);

  useMemo(() => {
    _fnRef.current = fn;
  }, deps);

  const run = useCallback(async (...args: Parameters<T>) => {
    const callId = (_callIdRef.current = _callIdRef.current + 1);

    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    return _fnRef.current.apply(null, args).then(
      (value) => {
        if (callId === _callIdRef.current) {
          setState({
            loading: false,
            value,
          });
        }
        return value;
      },
      (error) => {
        if (callId === _callIdRef.current) {
          setState({
            error: error as Error,
            loading: false,
          });
        }
        return error;
      },
    ) as ReturnType<T>;
  }, []);

  return {
    run: run as unknown as T,
    ...state,
  };
};

export default useAsyncFn;
