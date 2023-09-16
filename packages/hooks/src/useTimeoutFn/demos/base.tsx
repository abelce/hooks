import { useTimeoutFn } from 'let-hooks';
import React, { useCallback, useState } from 'react';

export default () => {
  const [state, setState] = useState('');
  const { run, isReady, cancel } = useTimeoutFn(
    () => {
      setState('倒计时结束');
    },
    {
      delay: 5000,
    },
  );

  const handleRun = useCallback(() => {
    run();
    setState('倒计时中...');
  }, []);

  const handleCancel = useCallback(() => {
    cancel();
    setState('已取消');
  }, []);

  return (
    <div>
      <div>{state}</div>
      {isReady() === false ? (
        <button type="button" onClick={handleCancel}>
          取消
        </button>
      ) : null}
      {isReady() === null ? (
        <button type="button" onClick={handleRun}>
          开始计时
        </button>
      ) : null}
    </div>
  );
};
