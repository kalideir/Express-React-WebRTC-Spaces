import { useTypedSelector } from '../hooks';
import { useAppDispatch } from '../hooks';
import { selectNewSpaceVisible, toggleNewSpaceModal } from '../store/uiSlice';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { SerializedError } from '@reduxjs/toolkit';
import { createSpace } from '../store/spaceSlice';
import type { SpaceData } from '../@types';
import { slugify } from '../utils';
import { Loading } from '../layout';

const schema = yup.object({
  title: yup.string().min(10, 'Must be at least 10 letters').required('Field is required'),
  isPublic: yup.boolean().default(false).required('Field is required'),
});

function NewSpace() {
  const dispatch = useAppDispatch();
  const modalVisible = useTypedSelector(selectNewSpaceVisible);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      IsPublic: true,
      title: '',
    },
  });
  const navigate = useNavigate();

  async function onSubmitHandler(data: FieldValues) {
    setIsLoading(true);
    try {
      const res = await dispatch(createSpace({ ...data, isPublic: true } as SpaceData)).unwrap();
      const { message, space } = res;
      enqueueSnackbar(message, {
        variant: 'success',
      });
      setTimeout(() => navigate('/my-spaces'), 1000);
    } catch (err: any | SerializedError) {
      const message = err?.message || 'Error';
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [navigate]);

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 mx-auto left-0 right-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto mx-auto pt-32">
        <div className="relative bg-white rounded-lg shadow dark:bg-slate-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-slate-600">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Create New Space</h3>
            <button
              type="button"
              onClick={() => dispatch(toggleNewSpaceModal(false))}
              className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="p-6 space-y-6">
              <div className="w-full">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    autoFocus
                    {...register('title')}
                    className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_email"
                    className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Space Title
                  </label>
                  {errors.title && <div className="text-red-500 font-semibold">{errors.title.message}</div>}
                </div>
              </div>
              {/* <div className="w-full">
                <label htmlFor="default-toggle" className="relative inline-flex items-center cursor-pointer">
                  <input {...register('isPublic')} type="checkbox" value="" id="default-toggle" className="sr-only" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                  <span className="ml-3 text-sm font-medium text-slate-900 dark:text-slate-300">Public only</span>
                </label>
              </div> */}
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-slate-200 dark:border-slate-600">
              <button
                data-modal-toggle="defaultModal"
                className="text-white  w-full  bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                {isLoading ? <Loading /> : 'Create Space'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewSpace;
