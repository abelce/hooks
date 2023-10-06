import { useEffect, useMemo } from 'react';
import WorkerTimer from './work-timer';

const workTimer = new WorkerTimer();

const useWorkerTimer = (
  callback: () => void,
  wait: number = 0,
): (() => void) => {
  const cancel = useMemo(() => {
    return workTimer.setTimeout(callback, wait);
  }, []);

  useEffect(() => {
    cancel?.();
  }, []);

  return cancel;
};

export default useWorkerTimer;
