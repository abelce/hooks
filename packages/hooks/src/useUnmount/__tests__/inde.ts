import { renderHook } from '@testing-library/react';
import useUnmount from '..';

describe('test useUnmount', () => {
  it('call provided callback', () => {
    const spy = jest.fn();
    const { unmount } = renderHook(() => useUnmount(spy));
    unmount();
    expect(spy).toBeCalledTimes(1);
  });

  it('not call provided callback', () => {
    const spy = jest.fn();
    const { rerender } = renderHook(() => useUnmount(spy));
    rerender();
    expect(spy).not.toBeCalled();
  });
});
