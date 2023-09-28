import usePlatform from '..';

export default () => {
  const utils = usePlatform();

  const result = Object.entries(utils).map(([key, value]) => [key, value()]);

  return (
    <div>
      <pre>{JSON.stringify(Object.fromEntries(result), null, 2)}</pre>
    </div>
  );
};
