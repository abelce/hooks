import { useState } from 'react';

export interface UseQueueReturn<T> {
  push: (item: T) => void;
  pop: () => T;
  first: T;
  last: T;
  size: number;
}

const useQueue = <T>(initValues: T[] = []): UseQueueReturn<T> => {
  const [queue, setQueue] = useState<T[]>(initValues);

  return {
    pop: (): T => {
      const first = queue[0];
      setQueue(queue.slice(1));
      return first;
    },
    push: (item: T): void => {
      setQueue((prev) => [...prev, item]);
    },
    get first(): T {
      return queue[0];
    },
    get last(): T {
      return queue[queue.length - 1];
    },
    get size(): number {
      return queue.length;
    },
  };
};

export default useQueue;
