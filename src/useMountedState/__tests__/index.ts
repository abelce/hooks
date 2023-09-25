import { renderHook } from '@testing-library/react';
import useMountedState from '..';

describe('Test useMountedState', () => {
  it('should reutrn true after mounted', () => {
    const { result } = renderHook(() => useMountedState());
    expect(result.current()).toBe(true);
  });
});
