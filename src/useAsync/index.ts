import useAsyncFn from '@/useAsyncFn';
import isBoolean from '@/utils/isBoolean';
import { DependencyList, useEffect, useState } from 'react';

export interface UseAsyncOptions {
  manual?: boolean; // default false,
  deps?: DependencyList; // deps
  defaultParams?: any; // default params, will be used when fn called automatically.
  onSuccess?: (value: any) => void; //
  onError?: (e: Error, value?: any) => void;
  onFinally?: () => void;
}

const useAsync = (fn: () => Promise<any>, options: UseAsyncOptions) => {
  const [isManual] = useState(
    () => isBoolean(options.manual) && options.manual,
  );
  const fnReult = useAsyncFn(fn, options.deps);

  //   const run = useCallback((...args: any) => {
  //     fnReult.run(...args).then((state) => {
  //         return options.onSuccess?.(state.value);
  //     }).catch(() => {
  //         return options.onError?.(state.value);
  //     })
  //   }, [fnReult.run])

  useEffect(() => {});

  useEffect(() => {
    if (isManual) {
      return;
    }
    run(options.defaultParams);
  }, []);

  return {
    ...fnReult,
  };
};

export default useAsync;
