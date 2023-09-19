import JSCookie, { CookieAttributes } from 'js-cookie';
import { useCallback, useEffect, useRef, useState } from 'react';
import useMount from '../useMount';

const useCookie = (cookieKey: string) => {
  const firstMount = useRef<boolean>(true);
  const [value, setValue] = useState<string | undefined>(
    JSCookie.get(cookieKey),
  );

  useEffect(() => {
    if (!firstMount.current) {
      setValue(JSCookie.get(cookieKey));
    }
  }, [cookieKey]);

  useMount(() => {
    firstMount.current = false;
  });

  const deleteCallback = useCallback(() => {
    JSCookie.remove(cookieKey);
    setValue(undefined);
  }, [cookieKey]);

  const updateCallback = useCallback(
    (nextValue: string, options?: CookieAttributes) => {
      JSCookie.set(cookieKey, nextValue, options);
      setValue(nextValue);
    },
    [cookieKey],
  );

  return {
    value,
    delete: deleteCallback,
    update: updateCallback,
  };
};

export default useCookie;
