import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useEffectOnce from '..';
import useUpdate from '../../useUpdate';

describe('test useEffectOnce', () => {
  it('once', () => {
    let value = 0;
    let valueWithoutEffectOnce = 0;
    const { result } = renderHook(() => {
      valueWithoutEffectOnce++;
      useEffectOnce(() => {
        value++;
      });
      return useUpdate();
    });
    expect(value).toBe(1);
    expect(valueWithoutEffectOnce).toBe(1);
    act(() => {
      result.current();
    });
    expect(value).toBe(1);
    expect(valueWithoutEffectOnce).toBe(2);
  });
});
