import { renderHook } from '@testing-library/react';
import useLocation from '..';

describe('test useLocation', () => {
  it('should return location data', () => {
    const { result } = renderHook(() => useLocation());
    expect(result.current).toStrictEqual({
      pathname: expect.any(String),
      hash: expect.any(String),
      search: expect.any(String),
      state: undefined,
    });
  });
});
