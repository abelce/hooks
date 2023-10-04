import { RefObject, useEffect } from 'react';

const isActiveElementEditable = () => {
  const { activeElement } = document;
  if (!activeElement) {
    return;
  }

  if (['INPUT', 'TEXTAREA'].includes(activeElement.tagName)) {
    return true;
  }

  return activeElement.hasAttribute('contenteditable');
};

const useTyping = (
  onTyping: (e: KeyboardEvent) => void,
  ref?: RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      return isActiveElementEditable() && onTyping(event);
    };
    const target = ref?.current ? ref.current : document;
    target?.addEventListener('keydown', handler as any);

    return () => {
      target?.removeEventListener('keydown', handler as any);
    };
  }, [onTyping, ref]);
};

export default useTyping;
