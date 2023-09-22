import { renderHook } from '@testing-library/react';
import useMounted from '..';

describe('Test useMounted', () => {
  it('call after component mounted', () => {
    const { result } = renderHook(() => useMounted());
    expect(result.current).toBe(true);
  });
});
