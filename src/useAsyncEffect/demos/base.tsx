import React, { useState } from 'react';
import useAsyncEffect from '..';
import sleep from '../../utils/sleep';

export default () => {
  const [x, setX] = useState(0);
  useAsyncEffect(async () => {
    await sleep(2000);
    setX(100);
  }, []);

  return (
    <div>
      <div>数量: {x}</div>
    </div>
  );
};
