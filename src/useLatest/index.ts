import { useRef } from 'react';

const useLatest = <T>(value: T) => {
  const ref = useRef<T>();
  ref.current = value;

  return ref;
};

export default useLatest;
