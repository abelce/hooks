import { act, renderHook } from '@testing-library/react';
import useMap from '..';

describe('Test useMap', () => {
  it('shloud init map and utils', () => {
    const { result } = renderHook(() => useMap([['name', 'Tom']]));

    expect(result.current[1].get('name')).toBe('Tom');
    expect(result.current[0].size).toBe(1);
    expect(result.current[1]).toStrictEqual({
      get: expect.any(Function),
      set: expect.any(Function),
      clear: expect.any(Function),
      delete: expect.any(Function),
      setAll: expect.any(Function),
      has: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  it('should set new Map', () => {
    const { result } = renderHook(() =>
      useMap<string, string | number>([
        ['name', 'Tom'],
        ['age', 30],
      ]),
    );

    expect(result.current[1].get('name')).toBe('Tom');
    act(() => {
      result.current[1].set('name', 'Jack');
    });
    expect(result.current[1].get('name')).toBe('Jack');
    act(() => {
      result.current[1].setAll([['age', 40]]);
    });
    expect(result.current[0].size).toBe(1);
    expect(result.current[1].get('age')).toBe(40);
  });

  it('should delete corresponding key-value pair for provided key', () => {
    const { result } = renderHook(() => useMap([['name', 'Tom']]));

    expect(result.current[1].get('name')).toBe('Tom');
    act(() => {
      result.current[1].delete('name');
    });
    expect(result.current[1].get('name')).toBeUndefined();
  });

  it('should clear all key-value', () => {
    const { result } = renderHook(() => useMap([['name', 'Tom']]));

    expect(result.current[1].get('name')).toBe('Tom');
    act(() => {
      result.current[1].clear();
    });
    expect(result.current[0].size).toBe(0);
  });

  it('should reset map to initValue', () => {
    const { result } = renderHook(() => useMap([['name', 'Tom']]));
    act(() => {
      result.current[1].clear();
    });
    expect(result.current[0].size).toBe(0);
    act(() => {
      result.current[1].reset();
    });
    expect(result.current[1].get('name')).toBe('Tom');
  });
});
