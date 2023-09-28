import useQueue from '..';

export default () => {
  const { push, pop, size, first, last } = useQueue([]);

  return (
    <div>
      <div>
        <div>size: {size}</div>
        <div>first: {first}</div>
        <div>last: {last}</div>
      </div>
      <div>
        <button type="button" onClick={() => push(Date.now().toString('16'))}>
          add
        </button>
        <button type="button" onClick={() => pop()}>
          pop
        </button>
      </div>
    </div>
  );
};
