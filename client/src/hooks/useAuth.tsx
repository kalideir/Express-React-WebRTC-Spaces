import { useMemo } from 'react';
import { useTypedSelector } from '../hooks';
import { selectCurrentUser, selectIsAuthenticated } from '../store/authSlice';

export const useAuth = () => {
  const user = useTypedSelector(selectCurrentUser);
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);

  return useMemo(() => ({ user, isAuthenticated }), [user, isAuthenticated]);
};
