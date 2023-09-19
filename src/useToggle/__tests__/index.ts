import { act, renderHook } from '@testing-library/react';
import useToggle from '../index';

describe('test useToggle', () => {
  it('expect change value', () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });

  it('set new value', () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1](false);
    });
    expect(result.current[0]).not.toBe(true);
  });
});
