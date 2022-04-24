/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice';
import { formatDistanceToNow } from 'date-fns';
import { FieldValues, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { MdUpload } from 'react-icons/md';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { IUser } from '../@types';
import type { SerializedError } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { upload } from '../store/profileSlice';

const schema = yup.object({
  username: yup.string().min(3, 'Must be at least 3 letters').required('Username required'),
  firstName: yup.string().min(3, 'Must be at least 3 letters').required('First name required'),
  lastName: yup.string().min(3, 'Must be at least 3 letters').required('Last name required'),
  phoneNumber: yup.number().min(7).typeError('Required').required('Phone number is required'),
  email: yup.string().email().required('Email is required').email(),
});

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const [uploadedfile, setUploadedfile] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser) as IUser;
  const avatar = currentUser.profilePicture || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${currentUser.username}`;
  const [isEditing, setIsEditing] = useState(false);

  async function onSubmitHandler(data: FieldValues) {
    // setIsLoading(true);
    // try {
    //   const res = await dispatch(registerUser(data as RegisterData)).unwrap();
    //   enqueueSnackbar(res.message, {
    //     variant: 'success',
    //   });
    //   reset({});
    // } catch (err: any | SerializedError) {
    //   const message = err?.message || 'Error';
    //   enqueueSnackbar(message, {
    //     variant: 'error',
    //   });
    // }
    // setIsLoading(false);
  }

  async function uploadAvatar() {
    if (file!.size > 5 * 1024 * 1024) {
      setFile({ name: 'File size has to be less than 5MB.' });
      return;
    }

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('type', 'IMAGE');
      data.append('contentType', 'Resume');
      const res = await dispatch(upload(data)).unwrap();
      setUploadedfile(res.data);
    } catch (err: any | SerializedError) {
      const message = err?.message || 'Error uploading avatar.';
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
  }

  return (
    <div>
      <div className="py-12 h-screen">
        <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-slate-800 rounded-xl shadow-md overflow-hidden md:max-w-3xl">
          <div className="md:flex">
            <div className="w-full p-2 py-10">
              <div className="flex-col items-center justify-center"></div>
              <label className="cursor-pointer mt-6 flex-col" htmlFor="select-avatar">
                <div className="relative w-24 self-center mx-auto">
                  <img src={avatar} className="rounded-full mx-auto w-full h-full" />
                  {isEditing && <MdUpload className="self-center text-center mx-auto text-slate-900 dark:text-slate-200 mt-3" size={20} />}
                </div>
                <input type="file" className="hidden" id="select-avatar" />
              </label>
              {!isEditing && (
                <>
                  <div className="flex flex-col text-center mt-3 mb-4">
                    {' '}
                    <span className="text-2xl font-medium">{currentUser.fullName}</span>{' '}
                    <span className="text-md text-slate-50">@{currentUser.username}</span> <br />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Joined in {formatDistanceToNow(Date.parse(currentUser.createdAt))}
                    </span>
                    <br />
                    <br />
                    <br />
                    <span className="text-md text-slate-50">{currentUser.email}</span>{' '}
                    <span className="text-md text-slate-50">{currentUser.address}</span>{' '}
                    <span className="text-md text-slate-50">{currentUser.phoneNumber}</span>{' '}
                  </div>
                  <div className="px-14 mt-5 flex">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="h-12 w-1/3  mx-auto bg-blue-700 text-white text-md rounded hover:shadow hover:bg-blue-800"
                    >
                      Edit Profile
                    </button>{' '}
                  </div>
                </>
              )}
              {isEditing && (
                <form className="p-8" onSubmit={handleSubmit(onSubmitHandler)}>
                  <div className="flex gap-5">
                    <div className="w-1/2">
                      <div className="relative z-0 mb-6 w-full group">
                        <input
                          type="email"
                          {...register('email')}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_email"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email address
                        </label>
                        {errors.username && <div className="text-red-500 font-semibold">{errors.username.message}</div>}
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="relative z-0 mb-6 w-full group">
                        <input
                          {...register('username')}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_email"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Username
                        </label>
                        {errors.username && <div className="text-red-500 font-semibold">{errors.username.message}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-1/2">
                      <div className="relative z-0 mb-6 w-full group">
                        <input
                          type="text"
                          {...register('username')}
                          id="floating_first_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_first_name"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          First name
                        </label>
                        {errors.username && <div className="text-red-500 font-semibold">{errors.username.message}</div>}
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="relative z-0 mb-6 w-full group">
                        <input
                          type="text"
                          {...register('username')}
                          id="floating_last_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_last_name"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Last name
                        </label>
                        {errors.username && <div className="text-red-500 font-semibold">{errors.username.message}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-1/2">
                      <div className="relative z-0 mb-6 w-full group">
                        <input
                          type="tel"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          {...register('username')}
                          id="floating_phone"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_phone"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Phone number
                        </label>
                        {errors.username && <div className="text-red-500 font-semibold">{errors.username.message}</div>}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="h-12 w-1/3  mx-auto bg-blue-700 text-white text-md rounded hover:shadow hover:bg-blue-800"
                  >
                    Save
                  </button>{' '}
                  <button onClick={() => setIsEditing(false)} className="h-12 w-1/5  mx-auto bg-slate-500 text-white text-md rounded hover:shadow-xl">
                    Cancel
                  </button>{' '}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
