import { Login, ResetPassword, Register, VerifyAccount } from '../pages';

const UserRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/verify-account', element: <VerifyAccount /> },
];

export default UserRoutes;
