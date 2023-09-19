import { useTitle } from 'let-hooks';
import React, { useCallback, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  useTitle(`title ${count}`);

  const handleClick = useCallback(() => {
    return setCount(count + 1);
  }, [count]);

  return (
    <div>
      <div>{count}</div>
      <button type="button" onClick={handleClick}>
        点击
      </button>
    </div>
  );
};
