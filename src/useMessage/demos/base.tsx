import { useState } from 'react';
import useMessage from '..';

export default () => {
  const [state, setState] = useState(() => Date.now());

  useMessage((event: MessageEvent) => {
    if (
      event.origin === 'http://localhost:8000' &&
      typeof event.data === 'number'
    ) {
      setState(event.data);
    }
  });

  const handler = () => {
    window.postMessage(Date.now(), '*');
  };

  return (
    <div>
      <div>时间: {state}</div>
      <button type="button" onClick={handler}>
        刷新
      </button>
    </div>
  );
};
