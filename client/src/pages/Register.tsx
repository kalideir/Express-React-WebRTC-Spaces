import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

const schema = yup.object({
  username: yup.string().min(3, 'Must be at least 3 letters').required('Username required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(8).max(32).required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match"),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useNavigate();

  const dispatch = useDispatch();

  async function onSubmitHandler(data: FieldValues) {
    console.log({ data });
  }

  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 mb-32 mt-16 dark:bg-slate-800 mx-auto max-w-xl rounded-lg pb-32 ">
        <div className="max-w-md w-full space-y-8ß">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-200">Create a new account</h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              Or
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                {' '}
                login{' '}
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-900 dark:text-slate-200 font-bold">
                Username:
              </label>
              <input
                {...register('username')}
                type="text"
                placeholder="username"
                className="w-full border border-gray-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              {errors.username && <div className="text-red-500 font-semibold">{errors.username.message}</div>}
            </div>

            <div>
              <label htmlFor="email" className="block text-slate-900 dark:text-slate-200 font-bold">
                Email:
              </label>
              <input
                {...register('email')}
                type="text"
                placeholder="@email"
                className="w-full border border-gray-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
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
            <button className="cursor-pointer py-4 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
