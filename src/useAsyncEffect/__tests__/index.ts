import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import useAsyncEffect from '..';
import sleep from '../../utils/sleep';

describe('Test useAsyncEffect', () => {
  it('promise', async () => {
    const fn = jest.fn(() => {});

    renderHook(() =>
      useAsyncEffect(async () => {
        await sleep(50);
        fn();
        expect(fn).toBeCalledTimes(1);
      }, []),
    );
    expect(fn).toBeCalledTimes(0);
  });

  it('generator', async () => {
    const fn = jest.fn(() => {});

    const { result } = renderHook(() => {
      const [x, setX] = useState(0);
      useAsyncEffect(
        async function* () {
          await sleep(50);
          yield fn();
        },
        [x],
      );
      return {
        setX,
      };
    });
    expect(fn).toBeCalledTimes(0);

    await act(async () => {
      await sleep(50);
    });
    expect(fn).toBeCalledTimes(1);

    act(() => {
      result.current.setX(1);
    });
    await act(async () => {
      await sleep(50);
    });
    expect(fn).toBeCalledTimes(2);
  });

  it('effect is not a fucntion', () => {
    expect(() => {
      renderHook(() => useAsyncEffect('abc' as any, []));
    }).toThrow('effect has to be a function, but got a string');
  });
});
