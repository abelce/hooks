import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useCookie from '..';

describe('test useCookie', () => {
  it('update cookie value', () => {
    const key = 'username';
    const { result } = renderHook(() => useCookie(key));
    act(() => {
      result.current.update('Tom');
    });
    expect(result.current.value).toBe('Tom');
  });

  it('remove cookie value', () => {
    const key = 'username';
    const { result } = renderHook(() => useCookie(key));
    act(() => {
      result.current.update('Tom');
    });
    expect(result.current.value).toBe('Tom');
    act(() => {
      result.current.delete();
    });
    expect(result.current.value).toBeUndefined();
  });
});
