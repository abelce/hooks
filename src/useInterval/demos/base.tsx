import React, { useState } from 'react';
import useInterval from '..';

export default () => {
  const [count, setCount] = useState(0);
  const intveral = useInterval(
    () => {
      setCount(count + 1);
    },
    {
      delay: 1000,
      immediate: true,
    },
  );

  return (
    <div>
      <div>数量: {count}</div>
      <br />
      <button type="button" onClick={intveral.clear}>
        停止
      </button>

      <button type="button" onClick={intveral.run}>
        开始
      </button>
    </div>
  );
};
