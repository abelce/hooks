import { useLayoutEffect, useMemo, useRef } from 'react';
import { projectName } from '../constants';

let counter = 0;

const useStyle = (
  css: string,
  options?: { doc?: Document; id?: string },
): string => {
  const id = useMemo(
    () => options?.id || `${projectName}-use-style-` + counter++,
    [],
  );
  const ref = useRef<HTMLStyleElement>();

  useLayoutEffect(() => {
    const doc = options?.doc || document;
    if (!ref.current) {
      const style = doc.createElement('style');
      style.id = id;
      doc.head.append(style);
      ref.current = style;
    }
    ref.current.innerText = css;

    return () => {
      if (ref.current && doc.head.contains(ref.current)) {
        doc.head.removeChild(ref.current);
        ref.current = undefined;
      }
    };
  }, [css]);

  return id;
};

export default useStyle;
