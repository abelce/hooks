import { act, renderHook } from '@testing-library/react';
import useStack from '..';

describe('Test useStack', () => {
  it('init', () => {
    const { result } = renderHook(() => useStack([1, 2]));
    act(() => {
      result.current.push(3);
    });
    expect(result.current.size).toBe(3);
    expect(result.current.first).toBe(3);
    //pop
    let popResult: number = 0;
    act(() => {
      popResult = result.current.pop();
    });
    expect(popResult).toBe(3);
    expect(result.current.first).toBe(1);
  });

  it('Not provided initValues', () => {
    const { result } = renderHook(() => useStack());
    expect(result.current.size).toBe(0);
    act(() => {
      result.current.push(1);
    });
    expect(result.current.first).toBe(1);
  });
});
