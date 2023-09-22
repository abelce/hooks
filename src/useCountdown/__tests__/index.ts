import { renderHook } from '@testing-library/react';
import useCountdown from '..';

describe('Test useCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('initlize leftTime', () => {
    const { result } = renderHook(() => useCountdown({ leftTime: 10000 }));
    expect(result.current.formatedResult.seconds).toBe(9);
  });

  it('initlize targetTime', () => {
    const { result } = renderHook(() =>
      useCountdown({ targetTime: Date.now() + 5000 }),
    );
    expect(result.current.formatedResult.seconds).toBe(5);
  });

  it('set params undefined', () => {
    const { result } = renderHook(() => useCountdown());
    expect(result.current.formatedResult.seconds).toBe(0);
    expect(result.current.formatedResult).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  });

  // it('should work correctly', () => {
  //   const { result } = renderHook(() =>
  //     useCountdown({ targetTime: Date.now() + 5000 }),
  //   );
  //   expect(result.current.formatedResult.seconds).toBe(5);
  //   console.log(result.current);
  //   act(() => {
  //     jest.advanceTimersByTime(5000);
  //   });
  //   console.log(result.current);
  //   expect(result.current.formatedResult.seconds).toBe(0);
  // });
});
