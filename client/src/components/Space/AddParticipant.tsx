import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { SerializedError } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector } from '../../hooks';
import { hideAddParticipantModal, selectNewParticipantModal, selectNewSpaceVisible } from '../../store/uiSlice';
import { range } from '../../utils';
import { Divider } from '../../layout';

const schema = yup.object({
  title: yup.string().min(10, 'Must be at least 10 letters').required('Field is required'),
  isPublic: yup.boolean().default(false).required('Field is required'),
});

function AddParticipant() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isModalVisible = useTypedSelector(selectNewParticipantModal);

  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  async function onSubmitHandler(data: FieldValues) {
    setIsLoading(true);
    try {
      enqueueSnackbar('message', {
        variant: 'success',
      });
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
        dispatch(hideAddParticipantModal());
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [navigate]);

  if (!isModalVisible) {
    return null;
  }

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-x-hidden fixed top-0 mx-auto left-0 right-0 z-50 w-full md:inset-0 h-modal h-auto justify-center items-center"
    >
      <div className="fixed inset-0 bg-slate-500 bg-opacity-80 transition-opacity"></div>
      <div className="p-2 w-full max-w-2xl top-16  md:h-auto mx-auto relative bg-white rounded-lg dark:bg-slate-700 shadow-2xl">
        <form className="mt-2 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="p-6 space-y-6">
            <div className="w-full">
              <div className="relative z-0 mb-3 w-full group">
                <input
                  autoFocus
                  // {...register('title')}
                  className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Search by username, email or name
                </label>
                {errors.title && <div className="text-red-500 font-semibold">{errors.title.message}</div>}
              </div>
            </div>
          </div>
        </form>
        <div className="mx-6 space-y-2 mb-2 h-1/2" id="results">
          {range(10).map(index => (
            <div key={index} className="w-full text-white animate-pulse">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-slate-500"></div>
                  <span className="text-sm ml-4">Full Name</span>
                </div>
                <div className="flex items-center">
                  <select
                    id="countries"
                    className="bg-slate-50 border px-4 border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="US">Guest</option>
                    <option value="CA">Speaker</option>
                    <option value="FR">Host</option>
                  </select>
                  <button className="text-white ml-4  bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                    View
                  </button>
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddParticipant;
