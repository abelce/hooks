import { useState } from 'react';

export interface UseStackReturn<T> {
  push: (item: T) => void;
  pop: () => T;
  first: T;
  size: number;
}

const useStack = <T>(initValues: T[] = []): UseStackReturn<T> => {
  const [stack, setStack] = useState<T[]>(initValues);

  return {
    pop: (): T => {
      const first = stack[0];
      setStack(stack.slice(1));
      return first;
    },
    push: (item: T): void => {
      setStack((prev) => [item, ...prev]);
    },
    get first(): T {
      return stack[0];
    },
    get size(): number {
      return stack.length;
    },
  };
};

export default useStack;
