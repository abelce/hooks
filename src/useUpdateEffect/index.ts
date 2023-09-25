import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const first = useRef<boolean>(true);

  useEffect(() => {
    if (!first.current) {
      effect();
    }
  }, deps);

  useEffect(() => {
    first.current = false;
  }, []);
};

export default useUpdateEffect;
