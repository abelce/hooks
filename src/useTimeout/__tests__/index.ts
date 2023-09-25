import { act, renderHook } from '@testing-library/react';
import useTimeout from '..';

describe('test useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it('', () => {
    const { result } = renderHook(() => useTimeout(100));
    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.isReady()).toBe(true);
  });
});
