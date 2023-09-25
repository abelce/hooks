import useTimeoutFn, { UseTimeoutFnReturn } from '../useTimeoutFn';
import useUpdate from '../useUpdate';

const useTimeout = (delay: number = 0): UseTimeoutFnReturn => {
  const updator = useUpdate();

  return useTimeoutFn(updator, {
    delay,
    immediate: true,
  });
};

export default useTimeout;
