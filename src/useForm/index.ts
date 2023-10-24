/**
 * 需要处理字字段的值、校验规则、错误信息、是否在校验中、字段是否被修改过
 * 表单是否在提交中、
 * @returns
 */

import { useEffect, useMemo, useRef } from 'react';
import { useUpdate } from '..';
import FormStore from './formStore';
import { FormInstance } from './formStore/type';

export interface UseFormOptions {
  initValues?: Record<string, any>;
  disabled?: boolean;
}

const useForm = (options: UseFormOptions = {}) => {
  const update = useUpdate();
  const _formStateRef = useRef<FormInstance>();

  useMemo(() => {
    _formStateRef.current = new FormStore(options);
    _formStateRef.current.sub(() => {
      update();
    });
  }, []);

  useEffect(() => {
    update();
  }, []);

  return _formStateRef.current;
};

export default useForm;
