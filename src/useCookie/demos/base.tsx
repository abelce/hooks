import React from 'react';
import useCookie from '..';
import useDebounceFn from '../../useDebounceFn';

export default () => {
  const cookie = useCookie('username');

  const debouce = useDebounceFn(() => {
    cookie.update(
      (document.getElementById('username') as HTMLInputElement).value,
    );
  }, 500);

  return (
    <div>
      <div>用户名: {cookie.value}</div>
      <input id="username" onChange={debouce.run}></input>
      <br />
      <br />
      <button type="button" onClick={cookie.delete}>
        删除
      </button>
    </div>
  );
};
