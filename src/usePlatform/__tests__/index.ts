import { renderHook } from '@testing-library/react';
import usePlatform from '..';

Object.defineProperty(
  window.navigator,
  'userAgent',
  (function (_value) {
    return {
      get: function _get() {
        return _value;
      },
      set: function _set(v) {
        // eslint-disable-next-line no-param-reassign
        _value = v;
      },
    };
  })(window.navigator.userAgent),
);

describe('Test usePlatform', () => {
  it('should has the same structure', () => {
    const { result } = renderHook(() => usePlatform());
    expect(result.current).toEqual({
      isSafari: expect.any(Function),
      isIOS: expect.any(Function),
      isIPadOS: expect.any(Function),
      isAndroid: expect.any(Function),
      isMobile: expect.any(Function),
      isFirefox: expect.any(Function),
      isWebKit: expect.any(Function),
      isChrome: expect.any(Function),
      isOpera: expect.any(Function),
      isMac: expect.any(Function),
      isWindows: expect.any(Function),
    });
  });

  it('should returns true when isChrome is called', () => {
    //@ts-ignore
    global.navigator.userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36';

    const { result } = renderHook(() => usePlatform());

    expect(result.current.isWebKit()).toBe(true);
    expect(result.current.isChrome()).toBe(true);
  });

  it('should returns true when isFirefox is called', () => {
    //@ts-ignore
    global.navigator.userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0';

    const { result } = renderHook(() => usePlatform());
    expect(result.current.isFirefox()).toBe(true);
  });

  it('should returns true when isSafari is called', () => {
    //@ts-ignore
    global.navigator.userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15';
    const { result } = renderHook(() => usePlatform());
    expect(result.current.isSafari()).toBe(true);
  });

  it('should returns true when isAndroid is called', () => {
    //@ts-ignore
    global.navigator.userAgent =
      'Mozilla/5.0 (Linux; Android 7.1.1; OPPO R9sk) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.111 Mobile Safari/537.36';
    const { result } = renderHook(() => usePlatform());
    expect(result.current.isAndroid()).toBe(true);
  });

  it('should returns true when isMobile is called', () => {
    //@ts-ignore
    global.navigator.userAgent =
      'Mozilla/5.0 (Linux; Android 7.1.1; OPPO R9sk) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.111 Mobile Safari/537.36';
    const { result } = renderHook(() => usePlatform());
    expect(result.current.isMobile()).toBe(true);
  });

  it('should returns true when isMobile is called', () => {
    //@ts-ignore
    global.navigator.userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0';
    const { result } = renderHook(() => usePlatform());
    expect(result.current.isOpera()).toBe(true);
  });

  it('should returns true when isMac is called', () => {
    //@ts-ignore
    global.navigator.userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0';
    const { result } = renderHook(() => usePlatform());
    expect(result.current.isMac()).toBe(true);
  });

  it('should returns true when isWindows is called', () => {
    //@ts-ignore
    global.navigator.userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36';
    const { result } = renderHook(() => usePlatform());
    expect(result.current.isWindows()).toBe(true);
  });
});
