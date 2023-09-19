import { renderHook } from '@testing-library/react';
import useLatest from '..';

describe('test useLatest', () => {
  it('update value', () => {
    let value = 1;
    const { rerender, result } = renderHook(
      (initialValue) => useLatest(initialValue),
      {
        initialProps: value,
      },
    );
    expect(result.current.current).toBe(value);
    value = 2;
    rerender(value);
    expect(result.current.current).toBe(value);
  });
});
