import { RefObject, useEffect, useRef } from 'react';

type DocumentEventKey = keyof DocumentEventMap;

const defaultEvents = ['click'];

const useEventAway = <E extends Event>(
  ref: RefObject<HTMLElement | null>,
  callback: (e: E) => void,
  options?: {
    eventNames?: DocumentEventKey[];
  } & AddEventListenerOptions,
) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const { eventNames = defaultEvents, ...rest } = options || {};
    const handler = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackRef.current(event);
      }
    };

    eventNames.forEach((eventName) =>
      document.addEventListener(eventName, handler, rest),
    );

    return () => {
      eventNames.forEach((eventName) =>
        document.removeEventListener(eventName, handler, rest),
      );
    };
  }, [ref, options]);
};

export default useEventAway;
