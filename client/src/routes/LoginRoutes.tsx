import { ForgotPassword, ResendVerificationLink, Login, ResetPassword, Register, VerifyAccount } from '../pages';

const LoginRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/resend-verification', element: <ResendVerificationLink /> },
  { path: '/reset-password/:token', element: <ResetPassword /> },
  { path: '/verify-account/:token', element: <VerifyAccount /> },
];

export default LoginRoutes;
