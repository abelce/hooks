import {
  DependencyList,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

// export interface UseAsyncFnOptions {
//   deps?: DependencyList; // deps
//   onSuccess?: () => void; //
//   onError?: () => void;
//   onFinally?: () => void;
// }

export type UseAsyncFnState = {
  loading: boolean;
  value?: any;
  error?: Error;
};

export interface UseAsyncFnReturn extends UseAsyncFnState {
  run: (...args: any) => Promise<void>;
}

const useAsyncFn = (
  fn: (...args: any) => Promise<any>,
  deps?: DependencyList,
): UseAsyncFnReturn => {
  const [state, setState] = useState<UseAsyncFnState>({ loading: false });
  const _callIdRef = useRef(0);
  const _fnRef = useRef(fn);

  const run = useCallback(async (...args: any) => {
    const callId = (_callIdRef.current = _callIdRef.current + 1);
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const value = await _fnRef.current(...args);
      if (callId === _callIdRef.current) {
        setState({
          loading: false,
          value,
        });
      }
    } catch (error: unknown) {
      if (callId !== _callIdRef.current) {
        setState({
          error: error as Error,
          loading: false,
        });
      }
    }
  }, []);

  useEffect(() => {
    _fnRef.current = fn;
  }, deps);

  return {
    run,
    ...state,
  };
};

export default useAsyncFn;
