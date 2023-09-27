import { act, renderHook } from '@testing-library/react';
import useHash from '..';

describe('Test useHash', () => {
  it('shloud get hash', () => {
    const { result } = renderHook(() => useHash());
    expect(result.current[0]).toBe(window.location.hash);
  });

  it('shloud get hash', () => {
    const { result } = renderHook(() => useHash());

    act(() => {
      result.current[1]('abc');
    });

    expect(window.location.hash).toBe('#abc');
  });
});
