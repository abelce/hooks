import { renderHook } from '@testing-library/react';
import useTitle from '..';

describe('test useTitle', () => {
  it('update title', () => {
    let value = 'hello';
    const { rerender } = renderHook((initialValue) => useTitle(initialValue), {
      initialProps: value,
    });
    expect(document.title).toBe(value);
    value = 'world';
    rerender(value);
    expect(document.title).toBe(value);
  });
});
