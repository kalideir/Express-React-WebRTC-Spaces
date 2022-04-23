import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RequireAuthRoute({ element: Component }: { element: () => JSX.Element }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (user && isAuthenticated) {
    return <Component />;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}
