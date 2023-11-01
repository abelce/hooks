import { render, renderHook } from '@testing-library/react';
import React from 'react';
import useForm from '..';
import { FormInstance } from '../formStore/type';

const Comp = ({ form }: { form: FormInstance }) => {
  const { register } = form;

  return (
    <div>
      <form>
        <div>
          <div className="use-form-content">
            <input
              {...register('remember', {
                valuePropName: 'checked',
                rules: [
                  {
                    required: true,
                    message: 'Remember is required',
                  },
                ],
              })}
              type="checkbox"
            ></input>
            <span>Remember me</span>
          </div>
        </div>

        <input type="submit" id="submit"></input>
      </form>
    </div>
  );
};

describe('Test useForm', () => {
  it('should get the corrent value name', async () => {
    const { result } = renderHook(() =>
      useForm({
        initValues: {
          remember: true,
        },
      }),
    );

    render(<Comp form={result.current as FormInstance} />);

    const field = result.current?.getField('remember');
    const checked = field?.ref?.current?.checked;

    expect(checked).toBe(true);
  });
});
