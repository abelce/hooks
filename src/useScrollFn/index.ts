import useLatest from '@/useLatest';
import isDocument from '@/utils/isDocument';
import isHtmlElement from '@/utils/isHtmlElement';
import { RefObject, useEffect } from 'react';

type ScrollData = {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
};

const useScrollFn = (
  fn: (data: ScrollData) => void,
  ref?: RefObject<HTMLElement>,
) => {
  const callback = useLatest(fn);

  useEffect(() => {
    const ele = ref?.current || document;

    const handleScroll = () => {
      if (isHtmlElement(ele)) {
        const data: ScrollData = {
          scrollTop: ele.scrollTop,
          scrollLeft: ele.scrollLeft,
          scrollHeight: ele.scrollHeight,
          scrollWidth: ele.scrollWidth,
        };
        callback.current(data);
        return;
      }

      if (isDocument(ele)) {
        if (ele.scrollingElement) {
          // https://developer.mozilla.org/zh-CN/docs/Web/API/document/scrollingElement
          const data: ScrollData = {
            scrollTop: ele.scrollingElement?.scrollTop,
            scrollLeft: ele.scrollingElement?.scrollLeft,
            scrollHeight: ele.scrollingElement?.scrollHeight,
            scrollWidth: ele.scrollingElement?.scrollWidth,
          };
          callback.current(data);
        } else {
          // https://www.zhangxinxu.com/wordpress/2019/02/document-scrollingelement/
          const data: ScrollData = {
            scrollTop:
              document.documentElement.scrollTop || document.body.scrollTop,
            scrollLeft:
              document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollHeight:
              document.documentElement.scrollHeight ||
              document.body.scrollHeight,
            scrollWidth:
              document.documentElement.scrollWidth || document.body.scrollWidth,
          };
          callback.current(data);
        }
      }
    };

    ele.addEventListener('scroll', handleScroll);

    handleScroll();
    return () => {
      ele.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);
};

export default useScrollFn;
