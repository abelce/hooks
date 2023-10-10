import { act, renderHook } from '@testing-library/react';
import useMessage from '..';
import sleep from '../../utils/sleep';

describe('Test useMessage', () => {
  it('should receive message', async () => {
    const callback = jest.fn(() => {});
    renderHook(() => useMessage(callback));
    window.top?.postMessage?.({ msgType: 100, content: 'hello' }, '*');
    await act(async () => {
      await sleep(50);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
