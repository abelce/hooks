import { act, renderHook } from '@testing-library/react';
import useSet from '..';

describe('Test useSet', () => {
  it('shloud init map and utils', () => {
    const { result } = renderHook(() => useSet([100, 200]));

    expect(Array.from(result.current[0].values())).toEqual([100, 200]);
    expect(result.current[0].size).toBe(2);
    expect(result.current[1].has(100)).toBe(true);
    expect(result.current[1]).toStrictEqual({
      add: expect.any(Function),
      clear: expect.any(Function),
      delete: expect.any(Function),
      setAll: expect.any(Function),
      has: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  it('should add the data provided', () => {
    const { result } = renderHook(() => useSet([100, 200]));
    act(() => {
      result.current[1].add(300);
    });
    expect(Array.from(result.current[0].values())).toEqual([100, 200, 300]);
  });

  it('should delete the data provided', () => {
    const { result } = renderHook(() => useSet([100, 200]));
    act(() => {
      result.current[1].delete(100);
    });
    expect(Array.from(result.current[0].values())).toEqual([200]);
  });

  it('should clear all data', () => {
    const { result } = renderHook(() => useSet([100, 200]));
    act(() => {
      result.current[1].clear();
    });
    expect(Array.from(result.current[0].values())).toEqual([]);
  });

  it('should reset initValue provied', () => {
    const { result } = renderHook(() => useSet([100, 200]));
    act(() => {
      result.current[1].clear();
    });
    expect(Array.from(result.current[0].values())).toEqual([]);
    act(() => {
      result.current[1].reset();
    });
    expect(Array.from(result.current[0].values())).toEqual([100, 200]);
  });

  it('should setAll provied', () => {
    const { result } = renderHook(() => useSet([100, 200]));
    act(() => {
      result.current[1].setAll([300]);
    });
    expect(Array.from(result.current[0].values())).toEqual([300]);
  });
});
