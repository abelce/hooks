import isFunction from '@/utils/isFunction';
import { useCallback, useMemo } from 'react';

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

  return [searchParams, setSearchParams];
};

export default useSearchParams;
