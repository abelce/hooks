import { useEffect, useState } from 'react';

type BatteryState = {
  charging?: boolean; // 是否正在充电
  chargingTime?: number; // 代表距离充电完毕还需多少秒，如果为 0 则充电完毕
  dischargingTime?: number; // 代表距离电池耗电至空且系统挂起需要多少秒
  level?: number; // 代表系统电量的水平，这个值放缩在 0.0 至 1.0 之间
};

export interface BatteryManager extends Readonly<BatteryState>, EventTarget {
  onchargingchange: (event: Event) => void; //当电池充电状态（charging 属性）更新时被触发。
  onchargingtimechange: (event: Event) => void; // 当电池充电时间（chargingTime  属性）更新时被触发。
  ondischargingtimechange: (event: Event) => void; // 当电池断开充电的时间（dischargingTime 属性）更新时被触发。
  onlevelchange: (event: Event) => void; // 当电池电量（level  属性）更新时被触发。
}

interface NavigatorBatteryManager extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

type UseBatteryState =
  | {
      isSupport: false;
    }
  | ({
      isSupport: true;
    } & BatteryState);

const useBattery = (): UseBatteryState => {
  const [state, setState] = useState<UseBatteryState>({
    isSupport: false,
  });

  useEffect(() => {
    let batteryManager: BatteryManager;

    const updateState = () => {
      setState(() => ({
        isSupport: true,
        level: batteryManager?.level,
        charging: batteryManager?.charging,
        chargingTime: batteryManager?.chargingTime,
        dischargingTime: batteryManager?.dischargingTime,
      }));
    };

    if ('getBattery' in navigator) {
      (navigator as NavigatorBatteryManager)
        .getBattery?.()
        .then((battery: BatteryManager) => {
          batteryManager = battery;

          batteryManager.addEventListener('chargingchange', updateState);
          batteryManager.addEventListener('levelchange', updateState);
          batteryManager.addEventListener('chargingtimechange', updateState);
          batteryManager.addEventListener('dischargingtimechange', updateState);

          updateState();
        });
    }

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('chargingchange', updateState);
        batteryManager.removeEventListener('levelchange', updateState);
        batteryManager.removeEventListener('chargingtimechange', updateState);
        batteryManager.removeEventListener(
          'dischargingtimechange',
          updateState,
        );
      }
    };
  }, []);

  return state;
};

export default useBattery;
