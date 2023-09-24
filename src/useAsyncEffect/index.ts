import { DependencyList, useEffect } from 'react';
import isAsyncGenerator from '../utils/isAsyncGenerator';
import isFunction from '../utils/isFunction';

const useAsyncEffect = (
  effect: () => AsyncGenerator<unknown, any, unknown> | Promise<any>,
  deps?: DependencyList,
): void => {
  if (!isFunction(effect)) {
    throw new Error('effect has to be a function, but got a ' + typeof effect);
  }

  useEffect(() => {
    let cancelled = false;
    const e = effect();

    async function execute() {
      if (isAsyncGenerator(e)) {
        while (true) {
          const result = await e.next();
          if (result.done || cancelled) {
            break;
          }
        }
      } else {
        await e;
      }
    }

    execute();
    return () => {
      cancelled = false;
    };
  }, deps);
};

export default useAsyncEffect;
