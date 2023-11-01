import { act, fireEvent, render, renderHook } from '@testing-library/react';
import React, { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import useForm from '..';
import sleep from '../../utils/sleep';
import { FormInstance } from '../formStore/type';

const CustomComponent = forwardRef(
  (
    props: { id: string; value?: string; onChange: (value: string) => void },
    ref?: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      props.onChange(e.target.value);
    };
    return (
      <input
        type="text"
        id={props.id}
        ref={ref}
        value={props.value}
        onChange={handleChange}
      ></input>
    );
  },
);

const Comp = ({ form }: { form: FormInstance }) => {
  const { register } = form;

  return (
    <div>
      <form>
        <div>
          <div className="use-form-content">
            <CustomComponent {...register('name')} />
          </div>
        </div>
        <input type="submit" id="submit"></input>
      </form>
    </div>
  );
};

describe('Test useForm', () => {
  it('should get the corrent value when use custom component', async () => {
    const { result } = renderHook(() =>
      useForm({
        initValues: {
          remember: true,
        },
      }),
    );

    render(<Comp form={result.current as FormInstance} />);
    const name = document.getElementById('name') as HTMLInputElement;
    fireEvent.change(name, { target: { value: 'let-hooks' } });

    await act(async () => {
      await sleep(10);
    });

    expect(result.current?.getFieldValue('name')).toBe('let-hooks');
  });
});
