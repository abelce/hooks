import { PromiseNoop } from '@/types';
import useAsyncFn from '@/useAsyncFn';
import isBoolean from '@/utils/isBoolean';
import {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface UseAsyncOptions {
  manual?: boolean; // default false,
  deps?: DependencyList; // deps
  defaultParams?: any; // default params, will be used when fn called automatically.
  onSuccess?: (value: any) => void; //
  onError?: (e: Error) => void;
  onFinally?: (e: Error, value: any) => void;
  debounce?: number; // debounce wait
}

const useAsync = <T extends PromiseNoop>(fn: T, options?: UseAsyncOptions) => {
  const _optionsRef = useRef(options);
  const [isManual] = useState(
    () => isBoolean(options?.manual) && options?.manual,
  );
  useMemo(() => {
    _optionsRef.current = options;
  }, [
    options?.manual,
    options?.deps,
    options?.onSuccess,
    options?.onError,
    options?.onFinally,
  ]);

  const fnReult = useAsyncFn(fn, options?.deps);

  const run = useCallback(
    (...args: any) => {
      let _error: Error;
      let _value: any;
      fnReult.run
        .apply(null, args)
        .then((value) => {
          _value = value;
          _optionsRef.current?.onSuccess?.(value);
        })
        .catch((error) => {
          _error = error;
          _optionsRef.current?.onError?.(error);
        })
        .finally(() => {
          _optionsRef.current?.onFinally?.(_error, _value);
        });
    },
    [fnReult.run],
  );

  useEffect(() => {
    if (isManual) {
      return;
    }
    run(options?.defaultParams);
  }, []);

  return {
    ...fnReult,
    run,
  };
};

export default useAsync;
