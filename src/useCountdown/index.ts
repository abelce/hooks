import { UseIntervalReturn } from '@/useInterval';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInterval } from '..';
import isNumber from '../utils/isNumber';

interface UseCountdownParams {
  targetTime?: number;
  leftTime?: number;
}

type CountdownFormatResult = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

type UseCountdownReturn = {
  isReady: boolean;
  leftTime: number;
  formatedResult: CountdownFormatResult;
};

const units: { name: keyof CountdownFormatResult; num: number }[] = [
  {
    name: 'days',
    num: 86400000,
  },
  {
    name: 'hours',
    num: 3600000,
  },
  {
    name: 'minutes',
    num: 60000,
  },
  {
    name: 'seconds',
    num: 1000,
  },
  {
    name: 'milliseconds',
    num: 1,
  },
];

const getLeftTime = (targetTime: number) =>
  Math.max(targetTime - Date.now(), 0);

const formatLeftTime = (leftTime: number): CountdownFormatResult => {
  let remainderTime = leftTime;
  return units.reduce((prev: CountdownFormatResult, cur) => {
    prev[cur.name] = Math.floor(remainderTime / cur.num);
    remainderTime = remainderTime % cur.num;
    return prev;
  }, {} as CountdownFormatResult);
};

const useCountdown = (params: UseCountdownParams = {}): UseCountdownReturn => {
  if ('leftTime' in params && !isNumber(params.leftTime)) {
    throw new Error(
      'leftTime has to be a number, but got a ' + typeof params.leftTime,
    );
  }

  if ('targetTime' in params && !isNumber(params.targetTime)) {
    throw new Error(
      'targetTime has to be a number, but got a ' + typeof params.targetTime,
    );
  }

  const ready = useRef(false);
  const interval = useRef<UseIntervalReturn>();

  const targetTime = useMemo((): number => {
    if (isNumber(params.leftTime) && params.leftTime > 0) {
      return Date.now() + params.leftTime;
    }
    return params.targetTime || Date.now();
  }, [params.targetTime, params.leftTime]);

  const [leftTime, setLeftTime] = useState(() => getLeftTime(targetTime));

  const intervalCallback = () => {
    const leftTime = getLeftTime(targetTime);
    if (leftTime <= 0) {
      ready.current = true;
      interval.current?.clear();
    }
    setLeftTime(leftTime);
  };

  interval.current = useInterval(intervalCallback, {
    delay: 1000,
  });

  useEffect(() => {
    ready.current = false;
    intervalCallback();
    interval.current?.run();
    return interval.current?.clear;
  }, [targetTime]);

  const formatedResult = useMemo(() => formatLeftTime(leftTime), [leftTime]);

  return {
    isReady: ready.current,
    leftTime,
    formatedResult,
  };
};

export default useCountdown;
