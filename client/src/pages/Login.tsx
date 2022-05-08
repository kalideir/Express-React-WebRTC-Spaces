import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SerializedError } from '@reduxjs/toolkit';
import { LoginData, LoginResponse } from '../@types';
import { loginUser } from '../store/authSlice';
import { useAppDispatch } from '../hooks';
import { Loading } from '../layout';

const schema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(8).max(32).required('Password is required'),
});

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [verificationRequired, setVerificationRequired] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  async function onSubmitHandler(data: FieldValues) {
    setIsLoading(true);
    try {
      const res = await dispatch(loginUser(data as LoginData)).unwrap();
      enqueueSnackbar(res.message, {
        variant: 'success',
      });
      reset({});
    } catch (err: any | SerializedError) {
      const message = err?.message || 'Error';
      const source = err?.extra?.error;
      if (source === 'VERIFICAITON_REQUIRED') {
        setVerificationRequired(true);
      }
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
    setIsLoading(false);
  }

  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 mb-32 mt-16 dark:bg-slate-800 mx-auto max-w-xl rounded-lg pb-32 ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-200">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              Or
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                {' '}
                create account{' '}
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
              <label htmlFor="email" className="block text-slate-900 dark:text-slate-200 font-bold">
                Email:
              </label>
              <input
                {...register('email')}
                type="text"
                placeholder="@email"
                className="w-full border border-slate-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              {errors.email && <div className="text-red-500 font-semibold">{errors.email.message}</div>}
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-900 dark:text-slate-200 font-bold">
                Password:
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="password"
                className="w-full border border-slate-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              {errors.password && <div className="text-red-500 font-semibold">{errors.password.message}</div>}
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-300 dark:text-indigo-300 hover:underline mt-2 inline-block hover:text-slate-900 hover:dark:text-slate-100"
              >
                Forget Password
              </Link>
            </div>
            <button className="cursor-pointer py-4 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
              {isLoading ? <Loading /> : 'Login'}
            </button>
            <button
              type="button"
              className="text-white  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded text-sm py-4 px-4 w-full text-center items-cener justify-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
            {verificationRequired && (
              <Link
                to="/resend-verification"
                className="text-sm text-indigo-300 dark:text-indigo-300 hover:underline inline-block hover:text-slate-900 hover:dark:text-slate-100"
              >
                Your account requires verification
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
