import { renderHook } from '@testing-library/react';
import useHistory from '..';

describe('Test useHistory', () => {
  it('should have correct structure', () => {
    const { result } = renderHook(() => useHistory());

    expect(result.current).toStrictEqual({
      location: expect.any(Object),
      listen: expect.any(Function),
      replace: expect.any(Function),
      push: expect.any(Function),
      createHref: expect.any(Function),
      go: expect.any(Function),
    });
  });
});
