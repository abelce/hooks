import React, { useState } from 'react';
import useMount from '..';
import useUpdate from '../../useUpdate';

export default () => {
  const [text, setText] = useState('');

  useMount(() => {
    setText('渲染完成:' + Date.now());
  });

  const udpator = useUpdate();

  return (
    <div>
      <div>{text}</div>
      <button type="button" onClick={udpator}>
        刷新
      </button>
    </div>
  );
};
