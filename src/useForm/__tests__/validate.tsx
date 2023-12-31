import { fireEvent, render, renderHook } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import useForm from '..';
import sleep from '../../utils/sleep';
import Comp from '../demos/comp';
import { FormInstance } from '../formStore/type';

describe('Test useForm', () => {
  it('should errors to be null', async () => {
    const { result } = renderHook(() => useForm());

    render(<Comp form={result.current as FormInstance} />);

    const email = document.getElementById('email') as HTMLInputElement;
    fireEvent.change(email, { target: { value: 'test@gmail.com' } });

    const password = document.getElementById('password') as HTMLInputElement;
    fireEvent.change(password, { target: { value: '111111' } });
    await act(async () => {
      await result.current?.validateFields();
    });

    await act(async () => {
      await sleep(10);
    });

    expect(result.current?.errors).toBeNull();
  });

  it('should errors not to be null', async () => {
    const { result } = renderHook(() => useForm());

    render(<Comp form={result.current as FormInstance} />);

    await act(async () => {
      await result.current?.validateFields();
    });

    // required
    expect(result.current?.errors?.['email']).toEqual(['Email is required']);

    const email = document.getElementById('email') as HTMLInputElement;
    fireEvent.change(email, { target: { value: 'abc' } });
    await act(async () => {
      await sleep(10);
    });

    expect(result.current?.errors).not.toBeNull();
    // type email
    expect(result.current?.errors?.['email']).toEqual([
      'Incorrect email format',
    ]);
    // getFieldError
    expect(result.current?.getFieldError('email')).toEqual([
      'Incorrect email format',
    ]);
    // getFieldsError
    expect(result.current?.getFieldsError().length).toEqual(2);
    expect(result.current?.getFieldsError()).toEqual([
      { name: 'email', errors: ['Incorrect email format'] },
      { name: 'password', errors: ['Password is required'] },
    ]);
  });

  it('should isFieldsValidating return true', async () => {
    const { result } = renderHook(() => useForm());

    render(<Comp form={result.current as FormInstance} />);

    expect(result.current?.isFieldValidating('email')).toBe(false);
    act(async () => {
      result.current?.validateFields();
    });
    expect(result.current?.isFieldValidating('email')).toBe(true);
    expect(result.current?.isFieldsValidating()).toBe(true);
    await act(async () => {
      await sleep(10);
    });
    expect(result.current?.isFieldsValidating()).toBe(false);
  });
});
