import isFunction from '@/utils/isFunction';
import { RefObject, useEffect, useState } from 'react';

const useIntersection = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit,
) => {
  const [observerEntry, setObserverEntry] =
    useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current && isFunction(IntersectionObserver)) {
      const handler: IntersectionObserverCallback = (
        entries: IntersectionObserverEntry[],
      ) => {
        setObserverEntry(entries[0]);
      };
      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);

      return () => {
        setObserverEntry(null);
        observer.disconnect();
      };
    }
  }, [ref.current, options?.root, options?.rootMargin, options?.threshold]);

  return observerEntry;
};

export default useIntersection;
