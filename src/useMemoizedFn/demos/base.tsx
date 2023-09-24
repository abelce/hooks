import { useMemoizedFn } from 'let-hooks';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const counter = useMemoizedFn(() => {
    return setCount(count + 1);
  });

  return (
    <div>
      <div>{count}</div>
      <button type="button" onClick={counter}>
        点击
      </button>
    </div>
  );
};
