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
import { Loading } from '../layout';

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
                className="w-full border border-slate-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
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
                className="w-full border border-slate-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              {errors.passwordConfirmation && <div className="text-red-500 font-semibold">{errors.passwordConfirmation.message}</div>}
            </div>
            <button className="cursor-pointer py-4 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
              {isLoading ? <Loading /> : 'Save Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
