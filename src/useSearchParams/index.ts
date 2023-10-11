import isFunction from '@/utils/isFunction';
import { useCallback, useEffect, useMemo } from 'react';
import { useUpdate } from '..';

export type URLSearchParamsInit =
  | string[][]
  | Record<string, string>
  | string
  | URLSearchParams;

export type SetURLSearchParams = (
  next: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParams),
) => void;

const createSearchParams = (init: URLSearchParamsInit): URLSearchParams =>
  new URLSearchParams(init);

const useSearchParams = (): [URLSearchParams, SetURLSearchParams] => {
  const update = useUpdate();

  const searchParams = useMemo(
    () => createSearchParams(location.search),
    [location.search],
  );

  const setSearchParams = useCallback<SetURLSearchParams>(
    (next) => {
      const nextSearchParams = isFunction(next) ? next(searchParams) : next;
      history.replaceState(
        null,
        '',
        location.pathname + nextSearchParams.toString(),
      );
    },
    [searchParams],
  );

  useEffect(() => {
    const callback = () => {
      update();
    };
    window.addEventListener('popstate', callback, false);
    window.addEventListener('hashchange', callback, false);
    window.addEventListener('replacestate', callback, false);
    return () => {
      window.addEventListener('popstate', callback, false);
      window.addEventListener('hashchange', callback, false);
      window.addEventListener('replacestate', callback, false);
    };
  });

  return [searchParams, setSearchParams];
};

export default useSearchParams;
