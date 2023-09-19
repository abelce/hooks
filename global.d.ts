export interface BatteryManager {
  charging: boolean; // 是否正在充电
  chargingTime: number; // 代表距离充电完毕还需多少秒，如果为 0 则充电完毕
  dischargingTime: number; // 代表距离电池耗电至空且系统挂起需要多少秒
  level: number; // 代表系统电量的水平，这个值放缩在 0.0 至 1.0 之间

  // methods
  onchargingchange: (event: Event) => void; //当电池充电状态（charging 属性）更新时被触发。
  onchargingtimechange: (event: Event) => void; // 当电池充电时间（chargingTime  属性）更新时被触发。
  ondischargingtimechange: (event: Event) => void; // 当电池断开充电的时间（dischargingTime 属性）更新时被触发。
  onlevelchange: (event: Event) => void; // 当电池电量（level  属性）更新时被触发。
  addEventListener: (
    eventName: string,
    callback: (event: Event) => void,
  ) => void;
}

export type NavigatorConnenction = {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  downlink?: number;
  downlinkMax?: number;
  rtt?: number;
  saveData?: number;
};

declare global {
  interface Window {
    navigator: Navigator & {
      standalone?: boolean;
      getBattery?: () => Promise<BatteryManager>;
      connection?: NavigatorConnenction;
    };
  }
}
