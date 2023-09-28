import useToggle from '@/useToggle';
import useBeforeUnload from '..';

export default () => {
  const [enabled, toogle] = useToggle(false);
  useBeforeUnload(enabled, '有未保存的更改，确认离开？');

  return (
    <div>
      <div>enabled: {enabled.toString()}</div>
      <button type="button" onClick={toogle}>
        {enabled ? 'disable' : 'enable'}
      </button>
    </div>
  );
};
