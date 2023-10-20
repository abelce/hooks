import { createHistory, History } from '@/utils/history';
import { useMemo } from 'react';

let history: History;

const useHistory = () => {
  return useMemo(() => {
    if (history) {
      return history;
    }
    return (history = Object.freeze(createHistory()));
  }, []);
};

export default useHistory;
