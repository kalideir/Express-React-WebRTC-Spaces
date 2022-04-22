import { ForgotPassword, ResendVerificationLink, Login, NewPassword, Register, VerifyAccount } from '../pages';

const LoginRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/resend-verification', element: <ResendVerificationLink /> },
  { path: '/new-password', element: <NewPassword /> },
  { path: '/verify-account/:token', element: <VerifyAccount /> },
];

export default LoginRoutes;
