import classnames from 'classnames';
import useForm from '..';
import './style.scss';

export default () => {
  const { register, errors, submit, validateFields } = useForm({
    // disabled: true,
    initValues: {
      email: 'test',
    },
  });

  const onSubmit = (values) => {
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
          <label htmlFor="name">邮箱:</label>
          <div className="use-form-content">
            <input
              id="email"
              {...register('email', {
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                  {
                    type: 'email',
                    message: '邮箱格式不正确',
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
            ['use-form-item-error']: errors?.['pwd'],
          })}
        >
          <label htmlFor="name">密码:</label>
          <div className="use-form-content">
            <input
              id="pwd"
              {...register('pwd', {
                rules: [
                  {
                    required: true,
                    message: '密码必填',
                  },
                ],
              })}
              type="password"
            ></input>
            {errors?.['pwd']?.length ? (
              <p className="use-form-error-msg">{errors['pwd'][0]}</p>
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
