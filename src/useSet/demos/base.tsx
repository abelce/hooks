import useSet from '..';

export default () => {
  const [set, utils] = useSet([100]);

  const add = () => {
    const value = Date.now();
    utils.add(value);
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
      <div>长度: {set.size}</div>
      <pre>{JSON.stringify(Array.from(set.values()), null, 2)}</pre>
    </div>
  );
};
