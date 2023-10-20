import useLocation from '..';

export default () => {
  const location = useLocation();

  return (
    <div>
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </div>
  );
};
