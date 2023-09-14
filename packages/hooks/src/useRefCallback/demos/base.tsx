import React, { useCallback, useState } from 'react';
import { useRefCallback } from 'zhooks';

export default () => {
  const [count, setCount] = useState(0);
  const counter = useRefCallback(() => {
    return setCount(count + 1);
  }, [count]);

  const handleClick = useCallback(() => {
    return counter();
  }, [])
  
  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>点击</button>
    </div>
  );
};
