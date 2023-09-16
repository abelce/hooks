import { useDebounceFn } from 'let-hooks';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const { run } = useDebounceFn(() => {
    setCount((count) => count + 1);
  }, 2000);

  return (
    <div>
      <div>count:{count}</div>
      <button type="button" onClick={run}>
        点击
      </button>
    </div>
  );
};
