import { useEffect, useState } from 'react';
import isNetworkInformation from '../utils/isNetworkInformation';

export type Connenction = {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  downlink?: number;
  downlinkMax?: number;
  rtt?: number;
  saveData?: number;
  type?:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'wifi'
    | 'wimax'
    | 'none'
    | 'other'
    | 'unknown';
};

interface NavigatorConnenction extends Navigator {
  connection?: Connenction;
  webkitConnection?: Connenction;
  mozConnection?: Connenction;
}

export type UseNetworkState = {
  online: boolean;
} & Connenction;

const getConnectionInfo = (): Connenction | undefined => {
  const nav = window.navigator as NavigatorConnenction;
  const con = nav.connection || nav.webkitConnection || nav.mozConnection;
  if (!isNetworkInformation(con)) {
    return undefined;
  }
  return {
    effectiveType: con?.effectiveType,
    downlink: con?.downlink,
    downlinkMax: con?.downlinkMax,
    rtt: con?.rtt,
    saveData: con?.saveData,
    type: con?.type,
  };
};

const useNetwork = (): UseNetworkState => {
  const [state, setState] = useState<UseNetworkState>({
    ...getConnectionInfo(),
    online: window.navigator.onLine,
  });

  useEffect(() => {
    const changeOnlineState = (online: boolean) => {
      setState(() => ({
        online,
        ...getConnectionInfo(),
      }));
    };

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

    changeHandler();
    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
      window.removeEventListener('change', changeHandler);
    };
  }, []);

  return state;
};

export default useNetwork;
