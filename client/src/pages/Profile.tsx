/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice';
import { formatDistanceToNow } from 'date-fns';
import { FieldValues, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { MdUpload } from 'react-icons/md';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { IUser, MediaResponse } from '../@types';
import type { SerializedError } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';
import { updateProfile } from '../store/profileSlice';
import { createMedia, getUploadUrl, selectIsUploading, selectUploadProgress, upload } from '../store/uploadslice';
import { MediaTypes } from '../constants';

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
  const currentUser = useSelector(selectCurrentUser) as IUser;
  const isUploading = useSelector(selectIsUploading) as boolean;
  const uploadProgress = useSelector(selectUploadProgress) as number;
  const [isEditing, setIsEditing] = useState(false);
  const contentType = file?.type as string;
  const id = currentUser.id;

  const avatar = useMemo(() => {
    return file
      ? URL.createObjectURL(file)
      : currentUser.profilePicture?.smallUrl ||
          currentUser.profilePicture?.originalUrl ||
          `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${currentUser.username}`;
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
        <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-slate-800 rounded-xl shadow-md overflow-hidden md:max-w-3xl">
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
                  <div className="w-full bg-gray-200 rounded-full dark:bg-slate-900 mt-5">
                    <div
                      style={{ width: `${uploadProgress || 0}%` }}
                      className="bg-indigo-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
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
                          {...register('firstName')}
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
                        {errors.firstName && <div className="text-red-500 font-semibold">{errors.firstName.message}</div>}
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="relative z-0 mb-6 w-full group">
                        <input
                          type="text"
                          {...register('lastName')}
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
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_phone"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                      className="h-12 w-3/5 flex items-center justify-center mx-auto bg-blue-700 text-white text-md rounded hover:shadow hover:bg-blue-800"
                    >
                      {isLoading ? (
                        <svg
                          role="status"
                          className="inline  w-4 h-4 text-white animate-spin"
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
                        'Save'
                      )}
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
