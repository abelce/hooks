import { act, render, renderHook } from '@testing-library/react';
import React from 'react';
import useEventAway from '..';

const Comp = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  return (
    <div>
      <div ref={ref}>test</div>
    </div>
  );
});

describe('Test useEventAway', () => {
  it('shloud call the callback', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Comp ref={ref} />);

    const fn = jest.fn(() => {});

    renderHook(() => useEventAway(ref, fn));

    act(() => {
      ref.current?.parentElement?.click();
    });

    expect(fn).toBeCalledTimes(1);
  });
});
