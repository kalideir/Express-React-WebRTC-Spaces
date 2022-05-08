import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { SerializedError } from '@reduxjs/toolkit';
import { ResendVerificationData, LoginData } from '../@types';
import { useAppDispatch } from '../hooks';
import { resendVerificationLink } from '../store/authSlice';
import { Loading } from '../layout';

const schema = yup.object({
  email: yup.string().email().required('Email is required'),
});

function ResendVerificationLink() {
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResendVerificationData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  async function onSubmitHandler(data: FieldValues) {
    setIsLoading(true);
    try {
      const res = await dispatch(resendVerificationLink(data as LoginData)).unwrap();
      enqueueSnackbar(res.message, {
        variant: 'success',
      });
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-200">Verification Link</h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              Or
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                {' '}
                login{' '}
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
            <button className="cursor-pointer py-4 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
              {isLoading ? <Loading /> : 'Send Email'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResendVerificationLink;
