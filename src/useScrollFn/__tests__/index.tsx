import { fireEvent, render, renderHook } from '@testing-library/react';
import React, { createRef, ForwardedRef, forwardRef } from 'react';
import useScrollFn from '..';

const Comp = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div style={{ height: '400px', overflowY: 'auto' }} ref={ref}>
      <div style={{ height: '1000px' }}>content</div>
    </div>
  );
});

describe('test useScrollFn', () => {
  it('should call the callback function', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Comp ref={ref} />);

    const fn = jest.fn((data) => {
      expect(data).toStrictEqual({
        scrollTop: expect.any(Number),
        scrollLeft: expect.any(Number),
        scrollHeight: expect.any(Number),
        scrollWidth: expect.any(Number),
      });
    });

    renderHook(() => useScrollFn(fn, ref));

    if (ref.current) {
      fireEvent.scroll(ref.current, {
        target: { scrollTop: 100 },
      });
    }
  });
});
