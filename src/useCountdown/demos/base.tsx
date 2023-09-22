import useCounter from '@/useCounter';
import useCountdown from '..';

export default () => {
  const [leftTime, counterMethods] = useCounter(93600000, {
    delta: 60000,
    min: 0,
  });
  const countdown = useCountdown({ leftTime: leftTime });

  return (
    <div>
      <div>是否结束: {countdown.isReady ? '是' : '否'}</div>
      <div>剩余时间（毫秒）: {countdown.leftTime}</div>
      <br />
      <div>
        {countdown.formatedResult.days} 天 {countdown.formatedResult.hours} 小时{' '}
        {countdown.formatedResult.minutes} 分钟{' '}
        {countdown.formatedResult.seconds} 秒{' '}
        {countdown.formatedResult.milliseconds} 毫秒
      </div>
      <div>
        <button type="button" onClick={counterMethods.inc}>
          加1分钟
        </button>
      </div>
    </div>
  );
};
