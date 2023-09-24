import { Noop } from '@/types';
import useUpdate from '@/useUpdate';
import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import useMemoizedFn from '..';

describe('Test useMemoizedFn', () => {
  it('', () => {
    const { result } = renderHook(() => {
      const [currentFn, setCurrentFn] = useState<Noop>(() => () => {
        return 1;
      });
      const memoizedFn = useMemoizedFn(currentFn);
      const updator = useUpdate();
      return {
        memoizedFn,
        setCurrentFn,
        updator,
      };
    });
    const memoizedFn = result.current.memoizedFn;
    expect(memoizedFn()).toBe(1);
    act(() => {
      result.current.updator();
    });
    expect(result.current.memoizedFn).toBe(memoizedFn);
    // change currentFn
    act(() => {
      result.current.setCurrentFn(() => () => {
        return 2;
      });
    });
    expect(result.current.memoizedFn).toBe(memoizedFn);
    // compare return value
    expect(result.current.memoizedFn()).toBe(2);
    expect(result.current.memoizedFn()).toBe(memoizedFn());
  });
});
