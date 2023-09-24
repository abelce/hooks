import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import useCounter, { UseCounterOptions } from '..';

const setup = (initValue: number, options: UseCounterOptions) =>
  renderHook((initValue) => useCounter(initValue, options), {
    initialProps: initValue,
  });

describe('Test useCounter', () => {
  it('normal', () => {
    const { result } = setup(5, { min: 0, max: 10 });
    // test initalValue
    expect(result.current[0]).toBe(5);
    // inc
    act(() => {
      result.current[1].inc();
    });
    expect(result.current[0]).toBe(6);
    // inc: when delta + curentValue > 10
    act(() => {
      result.current[1].inc(10);
    });
    expect(result.current[0]).toBe(10);
    // set
    act(() => {
      result.current[1].set(5);
    });
    expect(result.current[0]).toBe(5);
    // dec
    act(() => {
      result.current[1].dec();
    });
    expect(result.current[0]).toBe(4);
    // dec: when detal - delta < 0
    act(() => {
      result.current[1].dec(10);
    });
    expect(result.current[0]).toBe(0);
  });

  it('reset value to initValue', async () => {
    const { result } = renderHook(() => {
      const [initValue, setInitValue] = useState(5);
      const result = useCounter(initValue, {
        min: 0,
        max: 10,
      });
      return {
        setInitValue,
        result,
      };
    });
    expect(result.current.result[0]).toBe(5);
    // change initValue
    act(() => {
      result.current.setInitValue(4);
    });
    // reset currentValue to initValue
    act(() => {
      result.current.result[1].reset();
    });
    expect(result.current.result[0]).toBe(4);
  });
});
