import { useCallback, useMemo, useState } from 'react';

export interface Actions<V> {
  add: (value: V) => void;
  delete: (value: V) => boolean;
  clear: () => void;
  setAll: (newValue?: Iterable<V> | null) => void;
  has: (value: V) => void;
  reset: () => void;
}

const useSet = <V>(initValue?: Iterable<V> | null): [Set<V>, Actions<V>] => {
  const [set, setSet] = useState(new Set<V>(initValue));

  const actions = useMemo(
    () => ({
      add: (value: V) => {
        setSet((prev) => {
          const newSet = new Set(prev);
          newSet.add(value);
          return newSet;
        });
      },
      delete: (value: V) => {
        let result = false;
        setSet((prev) => {
          const newSet = new Set(prev);
          result = newSet.delete(value);
          return newSet;
        });
        return result;
      },
      clear: () => {
        setSet((prev) => {
          const newSet = new Set(prev);
          newSet.clear();
          return newSet;
        });
      },
      setAll: (newValue?: Iterable<V> | null) => setSet(new Set(newValue)),
      reset: () => setSet(new Set(initValue)),
    }),
    [setSet],
  );

  const utils = {
    has: useCallback((value: V) => set.has(value), [set]),
    ...actions,
  };

  return [set, utils];
};

export default useSet;
