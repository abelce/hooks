import { useState } from 'react';
import useEvent from '..';

export default () => {
  const [info, setInfo] = useState<{
    keyCode?: number;
    code?: string;
    key?: string;
  }>({});
  useEvent('keydown', (event: KeyboardEvent) => {
    setInfo({
      keyCode: event.keyCode,
      code: event.code,
      key: event.key,
    });
  });

  return (
    <div>
      <div>KeyCode: {info.keyCode}</div>
      <div>code: {info.code}</div>
      <div>key: {info.key}</div>
    </div>
  );
};
