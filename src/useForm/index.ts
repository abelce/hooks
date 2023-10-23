/**
 * 需要处理字字段的值、校验规则、错误信息、是否在校验中、字段是否被修改过
 * 表单是否在提交中、
 * @returns
 */

import { useMemo, useRef, useState } from 'react';
import { useUpdateEffect } from '..';
import FormStore from './formStore';
import FormField from './formStore/formField';

export interface UseFormOptions {
  initValues?: Record<string, any>;
  disabled?: boolean;
}

const useForm = (options: UseFormOptions = {}) => {
  const [formState, updateFormState] = useState<Record<string, FormField>>({});
  console.log(formState);
  const _formStateRef = useRef<FormStore>();

  useMemo(() => {
    _formStateRef.current = new FormStore(options);
    _formStateRef.current.sub((formState) => {
      updateFormState({ ...formState });
    });
  }, []);

  useUpdateEffect(() => {}, []);

  return _formStateRef.current;
};

export default useForm;
