import React from 'react';
import useCounter from '..';

export default () => {
  const [value, methods] = useCounter(5, {
    min: 0,
    max: 10,
  });

  return (
    <div>
      <div>value: {value}</div>
      <div>
        <button type="button" onClick={methods.inc}>
          increment
        </button>
        <button type="button" onClick={methods.dec}>
          decrement
        </button>
        <button type="button" onClick={() => methods.set(20)}>
          set 20
        </button>
        <button type="button" onClick={methods.reset}>
          reset
        </button>
      </div>
      <div>
        delta:5
        <button type="button" onClick={() => methods.inc(5)}>
          increment
        </button>
        <button type="button" onClick={() => methods.dec(5)}>
          decrement
        </button>
      </div>
    </div>
  );
};
