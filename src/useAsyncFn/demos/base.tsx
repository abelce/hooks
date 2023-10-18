import sleep from '@/utils/sleep';
import { useEffect } from 'react';
import useAsyncFn from '..';

export default () => {
  const { run, loading } = useAsyncFn(async () => {
    await sleep(3000);
  }, []);

  useEffect(() => {
    run();
  }, []);

  return <div>{loading ? 'loading...' : 'success'}</div>;
};
