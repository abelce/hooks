import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import useStyle from '..';

describe('Test useStyle', () => {
  it('', async () => {
    let style = 'span {color:"red}';
    const { result } = renderHook(() => useStyle(style));
    expect(result.current).not.toBeNull();

    // await act(async () => {
    //   await sleep(100);
    // });
    // let styleDOM = document.getElementById(result.current) as HTMLStyleElement;
    // console.log('textContent:', styleDOM.textContent);
    // expect(styleDOM).toHaveTextContent(style);
  });
});
