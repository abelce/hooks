import { act, renderHook } from '@testing-library/react';
import useLRU from '..';

describe('Test useLRU', () => {
  it('should init LRU', () => {
    const { result } = renderHook(() => useLRU(10));
    expect(result.current.maxSize).toBe(10);
  });

  it('should throw error when maxSize is not a number', () => {
    expect(() => {
      renderHook(() => useLRU('abc' as unknown as number));
    }).toThrowError('maxSize has to be a number, but got a string');
  });

  it('should update cache', () => {
    const { result } = renderHook(() => useLRU(3));

    act(() => {
      result.current.set('name', 'jack');
    });
    // set & peek
    expect(result.current.has('name')).toBe(true);
    expect(result.current.peek('name')).toBe('jack');
    // set & get & pop
    act(() => {
      result.current.set('age', 20);
      result.current.get('name');
    });
    expect(result.current.pop()).toBe(20);
  });

  it('should update cache', () => {
    const { result } = renderHook(() => useLRU(3));

    act(() => {
      result.current.set('name', 'jack');
    });

    expect(result.current.has('name')).toBe(true);
    act(() => {
      result.current.delete('name');
    });
    expect(result.current.pop()).toBeUndefined();
  });

  it('should clear cache', () => {
    const { result } = renderHook(() => useLRU(3));

    act(() => {
      result.current.set('name', 'jack');
    });
    expect(result.current.has('name')).toBe(true);
    act(() => {
      result.current.clear();
    });
    expect(result.current.pop()).toBeUndefined();
  });
  it('should get the correct keys/values/entries', () => {
    const { result } = renderHook(() => useLRU(3));
    act(() => {
      result.current.set('name', 'jack');
      // if the key already exist
      result.current.set('name', 'jack');
    });
    expect(result.current.keys()).toEqual(['name']);
    expect(result.current.values()).toEqual(['jack']);
    expect(result.current.entries()).toEqual([['name', 'jack']]);
  });

  it('should delete the least recently used item', () => {
    const { result } = renderHook(() => useLRU(3));
    act(() => {
      result.current.set('name', 'jack');
      result.current.set('age', 20);
      result.current.set('sex', 0);
      result.current.set('height', 180);
    });
    expect(result.current.entries()).toEqual([
      ['age', 20],
      ['sex', 0],
      ['height', 180],
    ]);
  });

  it('should return undefine if key not exist', () => {
    const { result } = renderHook(() => useLRU(3));

    expect(result.current.get('name')).toBeUndefined();
  });
});
