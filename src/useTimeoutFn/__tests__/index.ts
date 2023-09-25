import { act, renderHook } from '@testing-library/react';
import useTimeoutFn from '..';

describe('Test useTimeoutFn', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it('execte immediate', () => {
    const fn = jest.fn(() => {});
    const { result } = renderHook(() =>
      useTimeoutFn(fn, { delay: 1000, immediate: true }),
    );

    act(() => {
      jest.runAllTimers();
    });
    expect(fn).toBeCalledTimes(1);
    // isReady
    expect(result.current.isReady()).toBe(true);
  });

  it('test run/rset/cancel', () => {
    const fn = jest.fn(() => {});
    const { result } = renderHook(() => useTimeoutFn(fn, { delay: 1000 }));
    expect(result.current.isReady()).toBe(null);
    // run
    act(() => {
      result.current.run();
      jest.runAllTimers();
    });
    // expect(fn).toBeCalledTimes(1);
    // isReady
    expect(result.current.isReady()).toBe(true);
    // reset
    act(() => {
      result.current.reset();
    });
    expect(result.current.isReady()).toBe(false);
    // cancel
    act(() => {
      result.current.cancel();
    });
    expect(result.current.isReady()).toBe(null);
  });

  it('fn is not a function', () => {
    expect(() => {
      renderHook(() => useTimeoutFn('abc' as any));
    }).toThrowError('fn has to be a function, but got a string');
  });

  it('should call the fn immediate when options is not give', () => {
    const fn = jest.fn(() => {});
    const { result } = renderHook(() => useTimeoutFn(fn));
    act(() => {
      result.current.run();
      jest.runAllTimers();
    });
    expect(result.current.isReady()).toBe(true);
  });
});
