import { useEffect, useState } from 'react';

const hiddenPropName = (
  document: Document & { msHidden?: boolean; webkitHidden?: boolean },
) => {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden';
  } else if (typeof document.msHidden !== 'undefined') {
    return 'msHidden';
  } else if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitHidden';
  }
};

const getHidden = () => hiddenPropName(document);

const useHidden = () => {
  const [hidden, setHidden] = useState(getHidden);

  useEffect(() => {
    const callback = () => {
      setHidden(getHidden());
    };

    document.addEventListener('visibilitychange', callback);

    return () => {
      document.removeEventListener('visibilitychange', callback);
    };
  }, []);

  return hidden;
};

export default useHidden;
