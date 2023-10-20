import isBrowser from '@/utils/isBrowser';
import { useEffect } from 'react';

export interface ListenerType {
  addEventListener(
    name: string,
    handler: (event?: any) => void,
    ...args: any[]
  ): void;
  removeEventListener(
    name: string,
    handler: (event?: any) => void,
    ...args: any[]
  ): void;
}

export type UseEventTarget = ListenerType;

const defaultTarget = isBrowser() ? window : null;

const useEvent = <T extends UseEventTarget>(
  eventName: string,
  handler: Parameters<ListenerType['addEventListener']>[1],
  target: null | T | Window = defaultTarget,
  options?: Parameters<ListenerType['addEventListener']>[2],
) => {
  useEffect(() => {
    if (!handler) {
      return;
    }
    if (!target) {
      return;
    }

    target.addEventListener(eventName, handler, options);

    return () => {
      target.removeEventListener(eventName, handler, options);
    };
  }, []);
};

export default useEvent;
