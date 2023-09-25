import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import useUpdateEffect from '..';

describe('Test useUpdateEffect', () => {
  it('should called when compnent render again', () => {
    const { result } = renderHook(() => {
      const [x, setX] = useState(0);
      const [y, setY] = useState(0);

      useUpdateEffect(() => {
        setY((y) => y + 1);
      }, [x]);

      return {
        y,
        setX,
      };
    });

    expect(result.current.y).toBe(0);
    act(() => {
      result.current.setX(1);
    });
    expect(result.current.y).toBe(1);
  });
});
