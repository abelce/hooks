import { renderHook } from '@testing-library/react';
import useEvent from '..';

describe('Test useEvent', () => {
  it('shloud call the handle function', () => {
    const handler = jest.fn(() => {});
    renderHook(() => useEvent('keydown', handler));

    const event = new KeyboardEvent('keydown', { keyCode: 37 });
    window.dispatchEvent(event);
    expect(handler).toBeCalledTimes(1);
  });
});
