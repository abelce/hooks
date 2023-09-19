import { useEffect, useState } from 'react';
import useTimeoutFn from '../useTimeoutFn';

const useDebounce = <T>(value: T, wait: number = 0) => {
  const [debounced, setDebounced] = useState(value);

  const { run } = useTimeoutFn(
    () => {
      setDebounced(value);
    },
    {
      delay: wait,
    },
  );

  useEffect(() => {
    run();
  }, [value]);

  return debounced;
};

export default useDebounce;
