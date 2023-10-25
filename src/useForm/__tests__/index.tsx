import { fireEvent, render, renderHook } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import useForm from '..';
import sleep from '../../utils/sleep';
import Comp from '../demos/comp';
import { FormInstance } from '../formStore/type';

describe('Test useForm', () => {
  it('should get initValue', async () => {
    const { result } = renderHook(() =>
      useForm({ initValues: { email: 'test@gmail.com' } }),
    );

    render(<Comp form={result.current as FormInstance} />);
    // test initValue
    expect(result.current?.getFieldValue('email')).toBe('test@gmail.com');
  });

  it('validate', async () => {
    const { result } = renderHook(() => useForm());

    const rerenderResult = render(
      <Comp form={result.current as FormInstance} />,
    );

    const email = document.getElementById('email') as HTMLInputElement;
    fireEvent.change(email, { target: { value: 'abc' } });
    await act(async () => {
      await sleep(10);
    });

    expect(result.current?.getField('email')?.isDirty).toBe(true);
    expect(result.current?.getFieldValue('email')).toBe('abc');
    // form isDirty
    expect(result.current?.isDirty).toBe(true);

    // setFieldsValue
    act(() => {
      result.current?.setFieldsValue({ email: 'test@gmail.com' });
    });
    expect(result.current?.getFieldValue('email')).toBe('test@gmail.com');
    // scrollField
    result.current?.scrollField('email');
    // getFields
    const fields = result.current?.getFields();
    expect(fields?.length).toBe(2);
    // resetFields
    act(() => {
      result.current?.resetFields();
    });
    // ---------- rerender --------------
    act(() => {
      rerenderResult.rerender(<Comp form={result.current as FormInstance} />);
    });
  });
});
