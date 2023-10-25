import classnames from 'classnames';
import React from 'react';
import { FormInstance } from '../formStore/type';
import './style.scss';

export default ({ form }: { form: FormInstance }) => {
  const { register, errors, submit, validateFields } = form;

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <form
        className={classnames('use-form', {
          ['use-form-error']: !!errors,
        })}
        onSubmit={submit(onSubmit)}
      >
        <div
          className={classnames('use-form-item', {
            ['use-form-item-error']: errors?.['email'],
          })}
        >
          <label htmlFor="name">email:</label>
          <div className="use-form-content">
            <input
              {...register('email', {
                rules: [
                  {
                    required: true,
                    message: 'Email is required',
                  },
                  {
                    type: 'email',
                    message: 'Incorrect email format',
                  },
                ],
              })}
            ></input>
            {errors?.['email']?.length ? (
              <p className="use-form-error-msg">{errors['email'][0]}</p>
            ) : null}
          </div>
        </div>
        <div
          className={classnames('use-form-item', {
            ['use-form-item-error']: errors?.['password'],
          })}
        >
          <label htmlFor="name">Password:</label>
          <div className="use-form-content">
            <input
              {...register('password', {
                rules: [
                  {
                    required: true,
                    message: 'Password is required',
                  },
                ],
              })}
              type="password"
            ></input>
            {errors?.['password']?.length ? (
              <p className="use-form-error-msg">{errors['password'][0]}</p>
            ) : null}
          </div>
        </div>

        <input type="submit"></input>
      </form>

      <div>
        <button
          type="button"
          onClick={() => {
            validateFields(['pwd']);
          }}
        >
          validateFields
        </button>
      </div>
    </div>
  );
};
