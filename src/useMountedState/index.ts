import { useCallback, useEffect, useRef } from 'react';

const useMountedState = () => {
  const ref = useRef<boolean>(false);

  useEffect(() => {
    ref.current = true;
  }, []);

  return useCallback((): boolean => ref.current, []);
};

export default useMountedState;
