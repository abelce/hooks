import { useEventAway } from 'let-hooks';
import React, { useRef, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEventAway(
    ref,
    () => {
      return setCount(count + 1);
    },
    {
      eventNames: ['click', 'contextmenu'],
    },
  );

  return (
    <div>
      <div
        ref={ref}
        style={{ backgroundColor: 'red', width: '200px', height: '200px' }}
      >
        {count}
      </div>
    </div>
  );
};
