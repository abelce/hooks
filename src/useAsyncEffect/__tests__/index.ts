import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import useAsyncEffect from '..';
import sleep from '../../utils/sleep';

describe('Test useAsyncEffect', () => {
  it('promise', async () => {
    let value = 0;

    renderHook(() =>
      useAsyncEffect(async () => {
        await sleep(100);
        value++;
      }, []),
    );
    expect(value).toBe(0);
    await act(async () => {
      await sleep(150);
    });
    expect(value).toBe(1);
  });

  it('generator', async () => {
    let value = 0;

    const { result } = renderHook(() => {
      const [x, setX] = useState(0);
      useAsyncEffect(
        async function* () {
          await sleep(50);
          yield ++value;
        },
        [x],
      );
      return {
        setX,
      };
    });

    await act(async () => {
      await sleep(100);
    });
    expect(value).toBe(1);

    act(() => {
      result.current.setX(1);
    });
    await act(async () => {
      await sleep(100);
    });
    expect(value).toBe(2);
  });

  it('effect is not a fucntion', () => {
    expect(() => {
      renderHook(() => useAsyncEffect('abc' as any, []));
    }).toThrow('effect has to be a function, but got a string');
  });
});
