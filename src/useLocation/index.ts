import useHistory from '@/useHistory';
import { useEffect, useState } from 'react';

const useLocation = () => {
  const history = useHistory();
  const [location, setLocation] = useState(() => ({ ...history.location }));
  useEffect(() => {
    const cancel = history.listen(({ location }) => {
      setLocation(location);
    });
    return () => {
      cancel();
    };
  }, []);

  return location;
};

export default useLocation;
