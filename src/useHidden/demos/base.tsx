import useHidden from '..';

export default () => {
  const hidden = useHidden();

  console.log('hidden:', hidden);

  return <div>打开console，切换浏览器tab查看结果</div>;
};
