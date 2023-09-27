import { useCallback, useEffect, useState } from 'react';

const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const callback = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', callback);
    return () => {
      window.removeEventListener('hashchange', callback);
    };
  }, []);

  const write = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash],
  );

  return [hash, write] as const;
};

export default useHash;
