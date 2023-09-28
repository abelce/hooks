import useStack from '..';

export default () => {
  const { push, pop, size, first } = useStack([]);

  return (
    <div>
      <div>
        <div>size: {size}</div>
        <div>first: {first}</div>
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
