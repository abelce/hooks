import isFunction from '@/utils/isFunction';
import { useCallback, useEffect } from 'react';

const useBeforeUnload = (
  enabled: boolean | (() => boolean),
  message?: string,
) => {
  const handler = useCallback(
    (event: BeforeUnloadEvent) => {
      if (isFunction(enabled) ? enabled() : enabled) {
        event.preventDefault();

        if (message) {
          event.returnValue = message;
        }

        return message;
      }
    },
    [enabled, message],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [enabled, handler]);
};

export default useBeforeUnload;
