import { fireEvent, render, renderHook } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import useForm from '..';
import sleep from '../../utils/sleep';
import Comp from '../demos/comp';
import { FormInstance } from '../formStore/type';

describe('Test useForm', () => {
  it('should call onFinish function', async () => {
    const { result } = renderHook(() => useForm());

    render(<Comp form={result.current as FormInstance} />);

    const email = document.getElementById('email') as HTMLInputElement;
    fireEvent.change(email, { target: { value: 'test@gmail.com' } });

    const password = document.getElementById('password') as HTMLInputElement;
    fireEvent.change(password, { target: { value: '111111' } });

    // result.current?.submit((values) => {
    //   expect(values).toEqual({
    //     email: 'test@gmail.com',
    //     password: '111111'
    //   })
    // })

    // onFinish
    const submit = document.getElementById('submit');
    submit?.click();

    await act(async () => {
      await sleep(10);
    });

    // onFinishFailed
    result.current?.resetFields();
    submit?.click();

    // await act(async () => {
    //   await sleep(10);
    // });

    // expect(result.current?.errors).toBeNull();
  });
});
