import useHistory from '..';

export default () => {
  const history = useHistory();

  return (
    <div>
      <pre>{JSON.stringify(history, null, 2)}</pre>
    </div>
  );
};
