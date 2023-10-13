import { useEffect } from 'react';
import useSearchParams from '..';

export default () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const update = () => {
    setSearchParams({
      time: Date.now(),
      random: Math.random(),
    });
  };

  useEffect(update, []);

  const map = searchParams.entries().reduce((prev, [key, value]) => {
    prev[key] = value;
    return prev;
  }, {});

  return (
    <div>
      <pre>{JSON.stringify(map, null, 2)}</pre>
      <button type="button" onClick={update}>
        刷新
      </button>
    </div>
  );
};
