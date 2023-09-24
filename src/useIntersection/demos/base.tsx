import { FC, RefObject, useRef } from 'react';
import useIntersection from '..';

const Children: FC<{ rootRef: RefObject<HTMLElement | null> }> = ({
  rootRef,
}) => {
  const ref = useRef<HTMLElement>(null);

  const entry = useIntersection(ref, { root: rootRef.current });
  console.log(entry);

  return <div ref={ref}>sfa</div>;
};

export default () => {
  const rootRef = useRef<HTMLElement>(null);
  return (
    <div style={{ height: '160px', overflowY: 'auto' }} ref={rootRef}>
      <div style={{ height: '600px' }}>
        <div style={{ marginTop: '300px' }}>
          {rootRef && <Children rootRef={rootRef} />}
        </div>
      </div>
    </div>
  );
};
