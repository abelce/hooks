import { useRef } from 'react';

const useLatest = <T>(value: T) => {
  const ref = useRef<T>(value);
  ref.current = value;

  return ref;
};

export default useLatest;
