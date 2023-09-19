import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useMount from '..';
import useUpdate from '../../useUpdate';

describe('test useMount', () => {
  it('once', () => {
    let value = 0;
    let valueWithoutMount = 0;
    const { result } = renderHook(() => {
      valueWithoutMount++;
      useMount(() => {
        value++;
      });
      return useUpdate();
    });
    expect(value).toBe(1);
    expect(valueWithoutMount).toBe(1);
    act(() => {
      result.current();
    });
    expect(value).toBe(1);
    expect(valueWithoutMount).toBe(2);
  });
});
