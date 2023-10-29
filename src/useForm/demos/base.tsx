import classnames from 'classnames';
import useForm from '..';
import './style.scss';

export default () => {
  const { register, errors, handleSubmit } = useForm({
    // disabled: true,
    initValues: {
      email: 'test',
      // remember: true,
    },
  });

  const onFinish = () => {};

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

        <div
          className={classnames('use-form-item', {
            ['use-form-item-error']: errors?.['remember'],
          })}
        >
          {/* <label htmlFor="name">Password:</label> */}
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
            {errors?.['remember']?.length ? (
              <p className="use-form-error-msg">{errors['remember'][0]}</p>
            ) : null}
          </div>
        </div>

        <input type="submit" id="submit"></input>
      </form>
    </div>
  );
};
