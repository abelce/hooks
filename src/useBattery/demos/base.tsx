import useBattery from '..';

export default () => {
  const { isSupport, charging, chargingTime, dischargingTime, level } =
    useBattery();

  return (
    <div>
      <div>isSupport: {isSupport?.toString()}</div>
      <div>charging: {charging?.toString()}</div>
      <div>chargingTime: {chargingTime}</div>
      <div>dischargingTime: {dischargingTime}</div>
      <div>level: {level}</div>
    </div>
  );
};
