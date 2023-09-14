import React, { useCallback, useState } from 'react';
import { useTitle } from 'zhooks';

export default () => {
  const [count, setCount] = useState(0);
  useTitle(`title ${count}`);

  const handleClick = useCallback(() => {
    return setCount(count + 1);
  }, [count])

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>点击</button>
    </div>
  );
};
