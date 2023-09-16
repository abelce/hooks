import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, setUpdate] = useState({});

  return useCallback(() => setUpdate({}), []);
};

export default useUpdate;
