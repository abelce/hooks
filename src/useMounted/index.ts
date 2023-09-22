import { useState } from 'react';
import { useMount } from '..';

const useMounted = () => {
  const [state, setState] = useState(false);

  useMount(() => {
    setState(true);
  });

  return state;
};

export default useMounted;
