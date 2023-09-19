import { useRefCallback } from 'let-hooks';
import React, { useCallback, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const counter = useRefCallback(() => {
    return setCount(count + 1);
  }, [count]);

  const handleClick = useCallback(() => {
    return counter();
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button type="button" onClick={handleClick}>
        点击
      </button>
    </div>
  );
};