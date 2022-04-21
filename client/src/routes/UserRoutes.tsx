import { Login, NewPassword, Register, VerifyAccount } from '../pages';

const UserRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  { path: '/new-password', element: <NewPassword /> },
  { path: '/verify-account', element: <VerifyAccount /> },
];

export default UserRoutes;
