import { renderHook } from '@testing-library/react';
import useBattery from '..';

describe('Test useBattery', () => {
  it('test support', () => {
    const { result } = renderHook(() => useBattery());

    expect(result.current.isSupport).toBe('getBattery' in navigator);
  });
});
