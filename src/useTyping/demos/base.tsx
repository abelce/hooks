import useMemoizedFn from '@/useMemoizedFn';
import useTimeoutFn from '@/useTimeoutFn';
import { useRef, useState } from 'react';
import useTyping from '..';

export default () => {
  const _ref = useRef<HTMLTextAreaElement>(null);
  const [typing, setTyping] = useState(false);

  const reset = useTimeoutFn(
    () => {
      setTyping(false);
    },
    { delay: 1000 },
  );
  const handler = useMemoizedFn(() => {
    reset.run();
    if (typing) {
      return;
    }
    setTyping(true);
  });
  useTyping(handler, _ref);

  return (
    <div>
      <div>{typing ? '输入中...' : '未输入'}</div>
      <textarea ref={_ref} style={{ width: '100%' }}></textarea>
    </div>
  );
};
