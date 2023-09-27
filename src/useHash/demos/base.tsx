import { useEffect } from 'react';
import useHash from '..';

export default () => {
  const [hash, setHash] = useHash();

  useEffect(() => {
    setHash('abc');
  }, []);

  return (
    <div>
      <div>
        <button type="button" onClick={() => setHash(Date.now().toString(16))}>
          更新
        </button>
      </div>
      <div>hash: {hash}</div>
    </div>
  );
};
