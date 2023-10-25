import useForm from '..';
import { FormInstance } from '../formStore/type';
import Comp from './comp';
import './style.scss';

export default () => {
  const form = useForm({
    // disabled: true,
    initValues: {
      email: 'test',
    },
  });

  return (
    <div>
      <Comp form={form as FormInstance} />
    </div>
  );
};
