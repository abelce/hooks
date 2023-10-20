import useLatest from '@/useLatest';
import { useEffect } from 'react';

const useMessage = (listener: (message: MessageEvent) => void) => {
  const _callback = useLatest(listener);

  useEffect(() => {
    const _listener = (message: MessageEvent) => {
      _callback.current(message);
    };
    window.addEventListener('message', _listener, false);
    return () => {
      window.removeEventListener('message', _listener, false);
    };
  });
};

export default useMessage;
