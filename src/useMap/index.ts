import { useCallback, useMemo, useState } from 'react';

export interface Actions<K, V> {
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => void;
  delete: (key: K) => boolean;
  clear: () => void;
  setAll: (newValue?: Iterable<readonly [K, V]> | null) => void;
  has: (key: K) => void;
  reset: () => void;
}

const useMap = <K, V>(
  initValue?: Iterable<readonly [K, V]> | null,
): [Map<K, V>, Actions<K, V>] => {
  const [map, setMap] = useState(new Map<K, V>(initValue));

  const actions = useMemo(
    () => ({
      set: (key: K, value: V) => {
        setMap((prev) => {
          const newMap = new Map(prev);
          newMap.set(key, value);
          return newMap;
        });
      },
      delete: (key: K) => {
        let result = false;
        setMap((prev) => {
          const newMap = new Map(prev);
          result = newMap.delete(key);
          return newMap;
        });
        return result;
      },
      clear: () => {
        setMap((prev) => {
          const newMap = new Map(prev);
          newMap.clear();
          return newMap;
        });
      },
      setAll: (newValue?: Iterable<readonly [K, V]> | null) =>
        setMap(new Map(newValue)),
      reset: () => setMap(new Map(initValue)),
    }),
    [setMap],
  );

  const utils = {
    has: useCallback((key: K) => map.has(key), [map]),
    get: useCallback((key: K) => map.get(key), [map]),
    ...actions,
  };

  return [map, utils];
};

export default useMap;
