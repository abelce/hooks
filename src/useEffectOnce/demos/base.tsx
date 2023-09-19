import { useEffectOnce, useUpdate } from 'let-hooks';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);

  useEffectOnce(() => {
    setCount((count) => count + 1);
  });

  const udpator = useUpdate();

  return (
    <div>
      <div>{count}</div>
      <button type="button" onClick={udpator}>
        点击
      </button>
    </div>
  );
};
