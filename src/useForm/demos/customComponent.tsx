import classnames from 'classnames';
import React, { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import useForm from '..';
import './style.scss';

const CustomComponent = forwardRef(
  (
    props: { value?: string; onChange: (value: string) => void },
    ref?: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      props.onChange(e.target.value);
    };
    return (
      <input
        type="text"
        ref={ref}
        value={props.value}
        onChange={handleChange}
      ></input>
    );
  },
);

export default () => {
  const { register, errors, handleSubmit } = useForm();

  const onFinish = (data: any) => {
    alert(`
    提交成功：
    ${JSON.stringify(data)}
    `);
  };

  const onFinishFailed = () => {};

  return (
    <div>
      <form
        className={classnames('use-form', {
          ['use-form-error']: !!errors,
        })}
        onSubmit={handleSubmit(onFinish, onFinishFailed)}
      >
        <div
          className={classnames('use-form-item', {
            ['use-form-item-error']: errors?.['name'],
          })}
        >
          <label htmlFor="name">name:</label>
          <div className="use-form-content">
            <CustomComponent
              {...register('name', {
                rules: [
                  {
                    required: true,
                    message: 'Name is required',
                  },
                ],
              })}
            />
            {errors?.['name']?.length ? (
              <p className="use-form-error-msg">{errors['name'][0]}</p>
            ) : null}
          </div>
        </div>
        <div
          className={classnames('use-form-item', {
            ['use-form-item-error']: errors?.['age'],
          })}
        >
          <label htmlFor="name">age:</label>
          <div className="use-form-content">
            <input
              type="number"
              {...register('age', {
                rules: [
                  {
                    required: true,
                    message: 'Age is required',
                  },
                ],
              })}
            ></input>
            {errors?.['age']?.length ? (
              <p className="use-form-error-msg">{errors['age'][0]}</p>
            ) : null}
          </div>
        </div>

        <input type="submit" id="submit"></input>
      </form>
    </div>
  );
};
