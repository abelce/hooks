import { act, renderHook } from '@testing-library/react';
import useQueue from '..';

describe('Test useQueue', () => {
  it('init', () => {
    const { result } = renderHook(() => useQueue([1, 2]));
    act(() => {
      result.current.push(3);
    });
    expect(result.current.size).toBe(3);
    expect(result.current.first).toBe(1);
    expect(result.current.last).toBe(3);
    //pop
    let popResult: number = 0;
    act(() => {
      popResult = result.current.pop();
    });
    expect(popResult).toBe(1);
    expect(result.current.first).toBe(2);
  });

  it('Not provided initValues', () => {
    const { result } = renderHook(() => useQueue());
    expect(result.current.size).toBe(0);
    act(() => {
      result.current.push(1);
    });
    expect(result.current.first).toBe(1);
  });
});
