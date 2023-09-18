import { act, renderHook } from '@testing-library/react';
import useInterval from '..';

describe('test useInterval', () => {
  it('useInterval', async () => {
    let count = 0;
    const callback = () => {
      count++;
    };
    const { result } = renderHook(() =>
      useInterval(callback, {
        delay: 100,
        immediate: true,
      }),
    );

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, 1000);
    });

    expect(count).not.toBe(0);
    const cacheCount = count;
    act(() => {
      result.current.reset();
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, 1000);
    });
    act(() => {
      result.current.clear();
    });

    expect(count).not.toBe(cacheCount);
  });
});
