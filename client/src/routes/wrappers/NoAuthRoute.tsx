import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function NoAuthRoute({ element: Component }: { element: () => JSX.Element }) {
  const { user, isAuthenticated } = useAuth();

  const location = useLocation();

  if (user && isAuthenticated) {
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }
  return <Component />;
}
