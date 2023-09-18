import { useEffect } from 'react';

const useUnmount = (fn: () => void) => {
  useEffect(() => {
    return fn;
  }, []);
};

export default useUnmount;
