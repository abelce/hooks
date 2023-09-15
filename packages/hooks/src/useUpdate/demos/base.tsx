import React from 'react';
import { useUpdate } from 'xhooks';

export default () => {
  const update = useUpdate();

  return (
    <div>
      <div>时间: {Date.now()}</div>
      <button type="button" onClick={update}>
        更新
      </button>
    </div>
  );
};
