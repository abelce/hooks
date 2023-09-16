import { useTimeout } from 'let-hooks';
import React from 'react';

export default () => {
  const { isReady, cancel } = useTimeout(5000);

  return (
    <div>
      <div>{isReady() ? '计时结束' : '计时5s'}</div>
      {!isReady() ? (
        <button type="button" onClick={cancel}>
          取消
        </button>
      ) : null}
    </div>
  );
};
