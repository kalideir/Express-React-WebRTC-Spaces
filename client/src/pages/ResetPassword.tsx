import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SerializedError } from '@reduxjs/toolkit';
import { ResetPasswordData } from '../@types';
import { useAppDispatch } from '../hooks';
import { resetPassword } from '../store/authSlice';

const schema = yup.object({
  password: yup.string().min(8).max(32).required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .default('password'),
});

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { token: passwordResetCode } = useParams() as { token: string };

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  async function onSubmitHandler(data: FieldValues) {
    setIsLoading(true);
    try {
      const res = await dispatch(resetPassword({ ...data, passwordResetCode } as ResetPasswordData)).unwrap();
      enqueueSnackbar(res.message, {
        variant: 'success',
      });
      enqueueSnackbar('Please login with your new password', {
        variant: 'success',
      });
      setTimeout(() => navigate('/login'), 1000);
      reset({});
    } catch (err: any | SerializedError) {
      const message = err?.message || 'Error';
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
    setIsLoading(false);
  }
  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 mb-32 mt-16 dark:bg-slate-800 mx-auto max-w-xl rounded-lg pb-32 ">
        <div className="max-w-md w-full space-y-8ß">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-200">New Password</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-900 dark:text-slate-200 font-bold">
                Password:
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="password"
                className="w-full border border-gray-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              {errors.password && <div className="text-red-500 font-semibold">{errors.password.message}</div>}
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-900 dark:text-slate-200 font-bold">
                Confirm Password:
              </label>
              <input
                {...register('passwordConfirmation')}
                type="password"
                placeholder="password confirmation"
                className="w-full border border-gray-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              {errors.passwordConfirmation && <div className="text-red-500 font-semibold">{errors.passwordConfirmation.message}</div>}
            </div>
            <button className="cursor-pointer py-4 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
              {isLoading ? (
                <svg
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                'Save Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
