import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
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
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-900 dark:text-slate-200 font-bold">
                Username:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="username"
                className="w-full border border-gray-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-slate-900 dark:text-slate-200 font-bold">
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="@email"
                className="w-full border border-gray-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-900 dark:text-slate-200 font-bold">
                Password:
              </label>
              <input
                type="password"
                name="name"
                id="name"
                placeholder="username"
                className="w-full border border-gray-300 py-4 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>
            <button className="cursor-pointer py-4 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
