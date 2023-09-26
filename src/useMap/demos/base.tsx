import useMap from '..';

const initValue = {
  name: 'Tom',
  age: 20,
};

export default () => {
  const [map, utils] = useMap(Object.entries(initValue));

  const add = () => {
    const value = Date.now();
    utils.set(value, value);
  };

  return (
    <div>
      <div>
        <button type="button" onClick={add}>
          添加
        </button>
        <button type="button" onClick={utils.reset}>
          重置
        </button>
        <button type="button" onClick={utils.clear}>
          清除
        </button>
      </div>
      <div>长度: {map.size}</div>
      <pre>{JSON.stringify(Object.fromEntries(map), null, 2)}</pre>
    </div>
  );
};
