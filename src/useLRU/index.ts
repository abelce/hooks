import isNumber from '@/utils/isNumber';
import { useMemo, useRef } from 'react';

export interface UseLRUReturn<K, V> {
  maxSize: number;
  set: (key: K, value: V) => void;
  has: (key: K) => boolean;
  peek: (key: K) => V | undefined;
  get: (key: K) => V | undefined;
  delete: (key: K) => boolean;
  clear: () => void;
  keys: () => K[];
  values: () => V[];
  entries: () => Array<[K, V]>;
  // evict the least recently used item, returning its value
  pop: () => V | undefined;
}

const defaultMaxSize = 10;

const useLRU = <K, V extends any = any>(
  maxSize: number = defaultMaxSize,
): UseLRUReturn<K, V> => {
  if (!isNumber(maxSize)) {
    throw new Error('maxSize has to be a number, but got a ' + typeof maxSize);
  }

  // const [set, setCache] = useState<Map<K, V>>(new Map());

  const cache = useRef<Map<K, V>>(new Map());
  const utils = useMemo(() => {
    return {
      maxSize,
      set: (key: K, value: V) => {
        if (cache.current.has(key)) {
          cache.current.delete(key);
        }

        if (cache.current.size > maxSize) {
          const needDelKey = cache.current.keys().next().value;
          cache.current.delete(needDelKey);
        }
        cache.current.set(key, value);
      },
    };
  }, [maxSize]);

  return {
    has: (key: K) => cache.current.has(key),
    peek: (key: K): V | undefined => cache.current.get(key),
    get: (key: K): V | undefined => {
      if (cache.current.has(key)) {
        const value = cache.current.get(key) as V;
        cache.current.delete(key);
        cache.current.set(key, value);
        return value;
      }
      return undefined;
    },
    delete: (key: K) => cache.current.delete(key),
    clear: () => cache.current.clear(),
    keys: (): K[] => Array.from(cache.current.keys()),
    values: (): V[] => Array.from(cache.current.values()),
    entries: (): Array<[K, V]> => Array.from(cache.current.entries()),
    pop: (): V | undefined => {
      if (cache.current.size) {
        const [key, value] = cache.current.entries().next().value;
        cache.current.delete(key);
        return value;
      }
      return undefined;
    },
    ...utils,
  };
};

export default useLRU;
