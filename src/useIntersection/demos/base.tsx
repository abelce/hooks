import { FC, useRef } from 'react';
import useIntersection from '..';
import useMount from '../../useMount';
import useMountedState from '../../useMountedState';
import useUpdate from '../../useUpdate';

const Children: FC<{ root: HTMLElement }> = (props) => {
  const ref = useRef<HTMLElement>(null);
  const entry = useIntersection(ref, { root: props.root, threshold: 1 });

  return (
    <div ref={ref} style={{ height: '200px', backgroundColor: 'red' }}>
      {entry?.intersectionRatio < 1 ? '部分可见' : '完全可见'}
    </div>
  );
};

export default () => {
  const rootRef = useRef<HTMLElement>(null);
  const isMounted = useMountedState();
  const updator = useUpdate();
  useMount(updator);

  return (
    <div style={{ height: '400px', overflowY: 'auto' }} ref={rootRef}>
      <div>滚动查看</div>
      <div style={{ height: '800px', paddingTop: '300px' }}>
        {isMounted() ? <Children root={rootRef.current} /> : null}
      </div>
    </div>
  );
};
