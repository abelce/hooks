import { useRef, useState } from 'react';
import useScrollFn from '..';
import styles from './style.module.scss';

export default () => {
  const [state, setState] = useState();
  const ref = useRef();
  useScrollFn((data) => {
    setState(data);
  }, ref);

  return (
    <div>
      <div className={styles.container} ref={ref}>
        <div className={styles.content}></div>
      </div>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
};
