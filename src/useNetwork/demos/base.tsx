import useNetwork from '..';

export default () => {
  const { online, downlink, downlinkMax, effectiveType, rtt, saveData } =
    useNetwork();

  return (
    <div>
      <div>online: {online?.toString()}</div>
      <div>downlink: {downlink}</div>
      <div>downlinkMax: {downlinkMax}</div>
      <div>effectiveType: {effectiveType}</div>
      <div>rtt: {rtt}</div>
      <div>saveData: {saveData?.toString()}</div>
    </div>
  );
};
