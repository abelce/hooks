import React, { useCallback, useState } from 'react';
import useFavicon from '..';

export default () => {
  const list = [
    'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
    'https://www.baidu.com/favicon.ico',
    'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
  ];
  const [index, setIndex] = useState(0);

  useFavicon(list[index]);

  const handleSwitch = useCallback(() => {
    const newIndex = index + 1 >= list.length ? 0 : index + 1;
    setIndex(newIndex);
  }, [index, list]);

  return (
    <div>
      <button type="button" onClick={handleSwitch}>
        切换
      </button>
    </div>
  );
};
