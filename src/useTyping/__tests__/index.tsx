import { render, renderHook } from '@testing-library/react';
import React from 'react';
import useTyping from '..';

const Comp = React.forwardRef<HTMLInputElement, any>((_, ref): JSX.Element => {
  return <input ref={ref}></input>;
});

describe('Test useTyping', () => {
  it('register keydown handler', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Comp ref={ref} />);
    ref.current?.focus(); // focus

    const handler = jest.fn(() => {});
    renderHook(() => useTyping(handler, ref));
    const event = new KeyboardEvent('keydown', { keyCode: 37 });
    // dispatch
    ref.current?.dispatchEvent?.(event);
    expect(handler).toBeCalledTimes(1);
  });

  it('do not provide ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Comp ref={ref} />);
    ref.current?.focus(); // focus

    const handler = jest.fn(() => {});
    renderHook(() => useTyping(handler));
    const event = new KeyboardEvent('keydown', { keyCode: 37 });
    document.dispatchEvent(event);
    expect(handler).toBeCalledTimes(1);
  });
});
