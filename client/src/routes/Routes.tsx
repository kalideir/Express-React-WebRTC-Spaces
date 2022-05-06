import {
  ForgotPassword,
  ResendVerificationLink,
  Login,
  ResetPassword,
  Register,
  VerifyAccount,
  Profile,
  Home,
  Space,
  NewSpace,
  MySpaces,
  Spaces,
} from '../pages';
import { Route, Routes, useLocation } from 'react-router-dom';
import { NoAuthRoute, RequireAuthRoute } from './wrappers';

export default function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<NoAuthRoute element={Login} />} />
        <Route path="/register" element={<NoAuthRoute element={Register} />} />
        <Route path="/forgot-password" element={<NoAuthRoute element={ForgotPassword} />} />
        <Route path="/resend-verification" element={<NoAuthRoute element={ResendVerificationLink} />} />
        <Route path="/reset-password/:token" element={<NoAuthRoute element={ResetPassword} />} />
        <Route path="/verify-account/:token" element={<NoAuthRoute element={VerifyAccount} />} />

        <Route path="/profile" element={<RequireAuthRoute element={Profile} />} />
        <Route path="/space/:key/:slug" element={<RequireAuthRoute element={Space} />} />
        <Route path="/my-spaces" element={<RequireAuthRoute element={MySpaces} />} />
        <Route path="/spaces" element={<RequireAuthRoute element={Spaces} />} />

        <Route path="/new-space" element={<RequireAuthRoute element={NewSpace} />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/new-space" element={<RequireAuthRoute element={NewSpace} />} />
        </Routes>
      )}
    </>
  );
}
