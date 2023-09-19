import React, { useCallback, useState } from 'react';
import useUnmount from '..';

const Children = () => {
  useUnmount(() => {
    alert('卸载组件');
  });
  return null;
};

export default () => {
  const [key, setKey] = useState(1);

  const handleClick = useCallback(() => {
    setKey(key + 1);
  }, [key]);

  return (
    <div>
      <Children key={key} />
      <button type="button" onClick={handleClick}>
        刷新
      </button>
    </div>
  );
};
