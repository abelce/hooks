import useUpdate from '@/useUpdate';
import useMountedState from '..';

export default () => {
  const updator = useUpdate();
  const isMounted = useMountedState();

  return (
    <div>
      <div>isMounted:{isMounted().toString()}</div>
      <button type="button" onClick={updator}>
        更新组件
      </button>
    </div>
  );
};
