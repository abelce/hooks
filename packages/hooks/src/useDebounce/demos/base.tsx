import { useDebounce } from 'let-hooks';
import React, { ChangeEvent, useCallback, useState } from 'react';

export default () => {
  const [value, setValue] = useState('');
  const debounced = useDebounce(value, 2000);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <div>
      <input onChange={handleChange}></input>
      <div>debounced:{debounced}</div>
    </div>
  );
};
