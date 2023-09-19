import { useTimeoutFn } from 'let-hooks';
import React, { useCallback, useState } from 'react';

export default () => {
  const [state, setState] = useState('倒计时中...');
  const { run, isReady, cancel } = useTimeoutFn(
    () => {
      setState('倒计时结束');
    },
    {
      delay: 5000,
      immediate: true,
    },
  );

  const handleRun = useCallback(() => {
    run();
    setState('倒计时中...');
  }, []);

  const handleCancel = useCallback(() => {
    cancel();
    setState('');
  }, []);

  return (
    <div>
      <div>{state}</div>
      {isReady() === false ? (
        <button type="button" onClick={handleCancel}>
          取消
        </button>
      ) : (
        <button type="button" onClick={handleRun}>
          重试
        </button>
      )}
    </div>
  );
};
