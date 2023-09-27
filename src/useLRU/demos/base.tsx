import useUpdate from '@/useUpdate';
import useLRU from '..';

export default () => {
  const updator = useUpdate();
  const lru = useLRU(5);

  const addhandler = () => {
    const value = Date.now();
    lru.set(value, value);
    updator();
  };
  const clearhandler = () => {
    lru.clear();
    updator();
  };

  return (
    <div>
      <div>
        <button type="button" onClick={addhandler}>
          add
        </button>
        <button type="button" onClick={clearhandler}>
          clear
        </button>
      </div>
      <pre>{JSON.stringify(Object.fromEntries(lru.entries()), null, 2)}</pre>
    </div>
  );
};
