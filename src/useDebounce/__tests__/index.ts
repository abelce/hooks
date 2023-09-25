import { act, renderHook } from '@testing-library/react';
import useDebounce from '..';

describe('Test useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it('should return the value', () => {
    const value = 10;
    const { result } = renderHook(() => useDebounce(value, 100));
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current).toBe(value);
  });
});
