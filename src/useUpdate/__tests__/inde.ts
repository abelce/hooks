import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { act } from 'react-dom/test-utils';
import useUpdate from '..';

describe('test useUpdate', () => {
  it('update component', () => {
    const { result } = renderHook((): [number, () => void] => {
      const ref = useRef<number>(0);
      ref.current = ref.current + 1;
      const updator = useUpdate();
      return [ref.current, updator];
    });
    expect(result.current[0]).toBe(1);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(2);
  });
});
