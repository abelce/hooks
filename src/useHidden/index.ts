import { useEffect, useState } from 'react';

type HiddenDocument = Document & { msHidden?: boolean; webkitHidden?: boolean };

const hiddenPropName = (document: HiddenDocument) => {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden';
  } else if (typeof document.msHidden !== 'undefined') {
    return 'msHidden';
  } else if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitHidden';
  }
  return 'hidden';
};

const getHidden = () => (document as HiddenDocument)[hiddenPropName(document)];

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
