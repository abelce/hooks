import { act, renderHook } from '@testing-library/react';
import useDebounceFn from '..';

describe('Test useDebounceFn', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it('gen and execute debounce function', () => {
    const fn = jest.fn(() => {});
    const { result } = renderHook(() => useDebounceFn(fn, 100));
    expect(result.current.isReady()).toBe(null);
    //
    act(() => {
      result.current.run();
      jest.runAllTimers();
    });
    expect(result.current.isReady()).toBe(true);
  });
});
