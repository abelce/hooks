import useIsomorphicLayoutEffect from '@/useIsomorphicLayoutEffect';
import { useMemo, useRef } from 'react';
import { projectName } from '../constants';

let counter = 0;

const useStyle = (css: string): string => {
  const id = useMemo(() => `${projectName}-use-style-` + counter++, []);
  const ref = useRef<HTMLStyleElement>();

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) {
      const style = document.createElement('style');
      style.id = id;
      document.head.append(style);
      ref.current = style;
    }
    ref.current.innerText = css;

    return () => {
      if (ref.current) {
        document.head.removeChild(ref.current);
      }
    };
  }, [css]);

  return id;
};

export default useStyle;
