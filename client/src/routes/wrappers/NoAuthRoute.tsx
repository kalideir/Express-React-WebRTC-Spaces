import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function NoAuthRoute({ element: Component }: { element: () => JSX.Element }) {
  const { user, isAuthenticated } = useAuth();

  const location = useLocation();

  if (user && isAuthenticated) {
    return <Navigate to="/space/SvFcNtX5N5H_IYwmIkiW/Know-that-things-are---for-me" state={{ from: location }} replace />;
  }
  return <Component />;
}
