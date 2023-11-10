import isBrowser from '@/utils/isBrowser';
import { useMemo } from 'react';

export interface UsePlatformReturn {
  isSafari?: () => boolean;
  isIOS?: () => boolean;
  isIPadOS?: () => boolean;
  isAndroid?: () => boolean;
  isMobile?: () => boolean;
  isFirefox?: () => boolean;
  isWebKit?: () => boolean;
  isChrome?: () => boolean;
  isOpera?: () => boolean;
  isMac?: () => boolean;
  isWindows?: () => boolean;
  isBrowser: () => boolean;
}

const usePlatform = () => {
  const utils = useMemo((): UsePlatformReturn => {
    if (!isBrowser()) {
      // ssr
      return {
        isBrowser,
      };
    }
    const isSafari = () => /Safari/i.test(navigator.userAgent);
    // ios
    const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
    // ipados
    const isIPadOS = () =>
      /iPad/i.test(navigator.userAgent) ||
      (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
    // android
    const isAndroid = (): boolean => {
      return (
        navigator.userAgent.indexOf('Android') > -1 ||
        navigator.userAgent.indexOf('Adr') > -1
      );
    };

    const isMobile = (): boolean => {
      if (isIPadOS()) {
        return true;
      }
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    };

    return {
      isIOS,
      isSafari,
      isIPadOS,
      isAndroid,
      isMobile,
      isFirefox: () => navigator.userAgent.indexOf('Firefox') > -1,
      isWebKit: () => navigator.userAgent.indexOf('WebKit') > -1,
      isChrome: () => navigator.userAgent.indexOf('Chrome') > -1,
      isOpera: () => /Opera|OPR/.test(navigator.userAgent),
      isMac: () => navigator.userAgent.indexOf('Mac') > -1,
      isWindows: () => navigator.userAgent.indexOf('Windows') > -1,
      isBrowser,
    };
  }, []);

  return utils;
};

export default usePlatform;
