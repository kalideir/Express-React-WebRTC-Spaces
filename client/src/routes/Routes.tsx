import { ForgotPassword, ResendVerificationLink, Login, ResetPassword, Register, VerifyAccount, Profile, Home } from '../pages';
import { Route, Routes } from 'react-router-dom';
import { NoAuthRoute, RequireAuthRoute } from './wrappers';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<NoAuthRoute element={Login} />} />
        <Route path="/register" element={<NoAuthRoute element={Register} />} />
        <Route path="/forgot-password" element={<NoAuthRoute element={ForgotPassword} />} />
        <Route path="/resend-verification" element={<NoAuthRoute element={ResendVerificationLink} />} />
        <Route path="/reset-password" element={<NoAuthRoute element={ResetPassword} />} />
        <Route path="/verify-account" element={<NoAuthRoute element={VerifyAccount} />} />

        {/* <Route path="/" element={<RequireAuthRoute exact element={} />}>
          <Route path="/register" element={} />
        </Route> */}

        <Route path="/profile" element={<RequireAuthRoute element={Profile} />} />
        {/* <Route path="/" element={<RequireAuthRoute element={} />} /> */}
      </Routes>
    </>
  );
}
