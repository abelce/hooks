import { act, renderHook } from '@testing-library/react';
import useAsyncFn from '..';
import sleep from '../../utils/sleep';

describe('Test useAsyncFn', () => {
  it('should return correct value', async () => {
    const { result } = renderHook(() =>
      useAsyncFn(async () => {
        await sleep(100);
        return 10;
      }),
    );
    expect(result.current.loading).toBe(false);
    await act(async () => {
      result.current.run();
      await sleep(50);
    });
    // loading true
    expect(result.current.loading).toBe(true);
    await act(async () => {
      await sleep(50);
    });
    // loading false
    expect(result.current.loading).toBe(false);
    expect(result.current.value).toBe(10);
  });

  it('should return error', async () => {
    const { result } = renderHook(() =>
      useAsyncFn(async () => {
        await sleep(50);
        throw new Error('this is a error');
      }),
    );

    await act(async () => {
      result.current.run();
      await sleep(50);
    });

    expect(result.current.error?.message).toEqual('this is a error');
    expect(result.current.loading).toBe(false);
    expect(result.current.value).toBeUndefined();
  });
});
