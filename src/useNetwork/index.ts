import isObject from '@/utils.ts/isObject';
import { useCallback, useEffect, useState } from 'react';

export type Connenction = {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  downlink?: number;
  downlinkMax?: number;
  rtt?: number;
  saveData?: number;
};

export type UseNetworkState = {
  online: boolean;
  connection?: Connenction;
};

const getConnectionInfo = (): Connenction => {
  const nav = window.navigator;
  const con = nav.connection || nav.webkitConnection || nav.mozConnection;
  if (!isObject(con)) {
    return {};
  }

  return con;
};

const useNetwork = (): UseNetworkState => {
  const [state, setState] = useState<UseNetworkState>({
    online: window.navigator.onLine,
    connection: getConnectionInfo(),
  });

  const changeOnlineState = useCallback((online: boolean) => {
    setState((prevState) => ({
      ...prevState,
      connection: getConnectionInfo(),
      online,
    }));
  }, []);

  useEffect(() => {
    const onlineHandler = () => {
      changeOnlineState(true);
    };
    const offlineHandler = () => {
      changeOnlineState(false);
    };

    const changeHandler = () => {
      changeOnlineState(window.navigator.onLine);
    };

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);
    window.addEventListener('change', changeHandler);
    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
      window.removeEventListener('change', changeHandler);
    };
  }, []);

  return state;
};

export default useNetwork;
