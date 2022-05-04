import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState, useRef, UIEvent, ReactNode, UIEventHandler } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { SerializedError } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector } from '../../hooks';
import { hideAddParticipantModal, selectNewParticipantModal, selectNewSpaceVisible } from '../../store/uiSlice';
import { range } from '../../utils';
import { Divider } from '../../layout';
import { getUsers, selectSpaceUsersSearch } from '../../store/spaceSlice';

function AddParticipant() {
  const [isLoading, setIsLoading] = useState(false);
  const isModalVisible = useTypedSelector(selectNewParticipantModal);
  const [query, setQuery] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const usersRef = useRef<HTMLDivElement>(null);
  const usersSearch = useTypedSelector(selectSpaceUsersSearch);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(hideAddParticipantModal());
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [dispatch, navigate]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = usersRef.current?.scrollTop as number;
    setScrollPosition(position);
  };

  useEffect(() => {
    usersRef.current?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      usersRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(scrollPosition);

  useEffect(() => {
    setIsLoading(true);
    isModalVisible && dispatch(getUsers({ search: query, limit: 5, page: usersSearch.page + 1 })).unwrap();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isModalVisible]);

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
      <div className="p-2 w-full max-w-2xl h-1/2 top-32 mx-auto relative bg-white rounded-lg dark:bg-slate-700 shadow-2xl">
        <div className="mt-2 space-y-6">
          <div className="p-6 space-y-6">
            <div className="w-full">
              <div className="relative z-0 mb-3 w-full group">
                <input
                  autoFocus
                  onChange={e => setQuery(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Search by username, email or name
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-6 space-y-2 overflow-y-scroll h-1/2 mb-2" id="results" ref={usersRef}>
          {range(10).map(index => (
            <div key={index} className="">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-slate-500"></div>
                  <span className="text-sm ml-4 text-slate-800 dark:text-slate-300">Full Name</span>
                </div>
                <div className="flex items-center">
                  <select
                    id="countries"
                    className="bg-slate-50 border px-4 border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
