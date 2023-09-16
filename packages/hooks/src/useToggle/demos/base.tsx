import { useToggle } from 'let-hooks';
import React from 'react';

export default () => {
  const [value, dispatch] = useToggle(true);

  return (
    <div>
      <button type="button" onClick={dispatch}>
        {value ? '打开' : '关闭'}
      </button>
    </div>
  );
};
