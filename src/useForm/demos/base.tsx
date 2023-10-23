import useForm from '..';

export default () => {
  const { register } = useForm({
    // disabled: true,
    initValues: {
      name: 'wenqin',
    },
  });
  return (
    <div>
      <form>
        <label htmlFor="name">姓名:</label>
        <input
          id="name"
          {...register('name', {
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })}
        ></input>
      </form>
    </div>
  );
};
