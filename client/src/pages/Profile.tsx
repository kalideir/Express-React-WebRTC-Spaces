/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo, useState } from 'react';
import { selectCurrentUser } from '../store/authSlice';
import { formatDistanceToNow } from 'date-fns';
import { FieldValues, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { MdUpload } from 'react-icons/md';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { IUser, MediaResponse } from '../@types';
import type { SerializedError } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector } from '../hooks';
import { updateProfile } from '../store/profileSlice';
import { createMedia, getUploadUrl, selectIsUploading, selectUploadProgress, upload } from '../store/uploadslice';
import { MediaTypes } from '../constants';
import { getAvatar } from '../utils';
import { Loading } from '../layout';

const schema = yup.object({
  username: yup.string().min(3, 'Must be at least 3 letters').required('Username required'),
  firstName: yup.string().min(3, 'Must be at least 3 letters').required('First name required'),
  lastName: yup.string().min(3, 'Must be at least 3 letters').required('Last name required'),
  phoneNumber: yup.number().min(7).typeError('Phone number required').required('Phone number is required'),
  email: yup.string().email().required('Email is required').email(),
});

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const currentUser = useTypedSelector(selectCurrentUser) as IUser;
  const isUploading = useTypedSelector(selectIsUploading) as boolean;
  const uploadProgress = useTypedSelector(selectUploadProgress) as number;
  const [isEditing, setIsEditing] = useState(false);
  const contentType = file?.type as string;
  const id = currentUser.id;

  const avatar = useMemo(() => {
    return file
      ? URL.createObjectURL(file)
      : currentUser.profilePicture?.smallUrl || currentUser.profilePicture?.originalUrl || getAvatar(currentUser.username);
  }, [currentUser.profilePicture, currentUser.username, file]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...currentUser,
    },
  });

  async function onSubmitHandler(data: FieldValues) {
    setIsLoading(true);
    delete data._id;
    delete data.verified;
    delete data.role;
    let media: null | MediaResponse;
    try {
      if (file) {
        const originalUrl = (await uploadAvatar()) as string;
        media = (await dispatch(createMedia({ originalUrl, type: MediaTypes.PROFILE_PICTURE, contentType })).unwrap()) as MediaResponse;
        Object.assign(data, { profilePictureId: media?.id || null });
      }
      const res = await dispatch(updateProfile({ data, id })).unwrap();
      setIsEditing(false);
      enqueueSnackbar(res.message, {
        variant: 'success',
      });
    } catch (err: any | SerializedError) {
      const message = err?.message || 'Error';
      if (err.errors) {
        err.errors.forEach((error: { path: keyof typeof schema.fields; message: string }) => {
          setError(error.path, { message: error.message });
        });
      }
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
    setIsLoading(false);
  }

  function selectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      enqueueSnackbar('File size has to be less than 5MB', {
        variant: 'error',
      });
      return;
    }
    setFile(file);
  }

  async function uploadAvatar(): Promise<string | null> {
    if (file instanceof File) {
      try {
        const uploadUrl = (await dispatch(getUploadUrl({ contentType })).unwrap()) as string;
        await dispatch(upload({ url: uploadUrl, file, contentType })).unwrap();
        return uploadUrl.split('?')[0];
      } catch (err: any | SerializedError) {
        const message = err?.message || 'Error uploading avatar.';
        enqueueSnackbar(message, {
          variant: 'error',
        });
      }
    }
    return null;
  }

  return (
    <div>
      <div className="py-12 h-screen">
        <div className="max-w-2xl mx-auto bg-slate-100 dark:bg-slate-800 rounded-xl shadow-md overflow-hidden md:max-w-3xl">
          <div className="md:flex">
            <div className="w-full p-2 py-10">
              <div className="flex-col items-center mb-16 w-24 mx-auto justify-center">
                <label className="cursor-pointer mt-6 flex-col" htmlFor={isEditing ? 'select-avatar' : ''}>
                  <div className="relative w-24 h-24 self-center mx-auto">
                    <img src={avatar} className="rounded-full mx-auto w-full h-full" />
                    {isEditing && <MdUpload className="self-center text-center mx-auto text-slate-900 dark:text-slate-200 mt-3" size={20} />}
                  </div>
                  <input type="file" onChange={selectFile} className="hidden" id="select-avatar" />
                </label>
              </div>
              {isUploading && (
                <div className="w-2/5 mx-auto">
                  <div className="w-full bg-slate-200 rounded-full dark:bg-slate-900 mt-5">
                    <div
                      style={{ width: `${uploadProgress || 0}%` }}
                      className="bg-indigo-600 text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-full"
                    >
                      {uploadProgress}%
                    </div>
                  </div>
                </div>
              )}
              {!isEditing && (
                <>
                  <div className="flex flex-col text-center mt-3 mb-4">
                    {' '}
                    <span className="text-2xl font-medium text-slate-900 dark:text-slate-100">{currentUser.fullName}</span>{' '}
                    <span className="text-md text-slate-800 dark:text-slate-200">@{currentUser.username}</span> <br />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
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
                      className="h-12 w-1/3  mx-auto bg-indigo-700 text-white text-md rounded hover:shadow hover:bg-indigo-800"
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
                          className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_email"
                          className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                          className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_email"
                          className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                          {...register('firstName')}
                          id="floating_first_name"
                          className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_first_name"
                          className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          First name
                        </label>
                        {errors.firstName && <div className="text-red-500 font-semibold">{errors.firstName.message}</div>}
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="relative z-0 mb-6 w-full group">
                        <input
                          type="text"
                          {...register('lastName')}
                          id="floating_last_name"
                          className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_last_name"
                          className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Last name
                        </label>
                        {errors.lastName && <div className="text-red-500 font-semibold">{errors.lastName.message}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-1/2">
                      <div className="relative z-0 mb-6 w-full group">
                        <input
                          type="tel"
                          {...register('phoneNumber')}
                          id="floating_phone"
                          className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_phone"
                          className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Phone number
                        </label>
                        {errors.phoneNumber && <div className="text-red-500 font-semibold">{errors.phoneNumber.message}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-3/5">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="h-12 w-3/5 flex items-center justify-center mx-auto bg-indigo-700 text-white text-md rounded hover:shadow hover:bg-indigo-800"
                    >
                      {isLoading ? <Loading /> : 'Save'}
                    </button>{' '}
                    <button onClick={() => setIsEditing(false)} className="h-12 w-1/3 bg-slate-500 text-white text-md rounded hover:shadow-xl mx-2">
                      Cancel
                    </button>{' '}
                  </div>
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
