import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState, useRef, UIEvent, ReactNode, UIEventHandler } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { SerializedError } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector } from '../../hooks';
import { hideAddParticipantModal, selectNewParticipantModal, selectNewSpaceVisible } from '../../store/uiSlice';
import { getAvatar, range } from '../../utils';
import { Divider } from '../../layout';
import { addDeleteParticipant, getUsers, selectActiveSpace, selectSpaceUsersSearch } from '../../store/spaceSlice';
import { ParticipantStatus, SpaceItem, SpaceUser } from '../../@types';
import { UserRow } from '.';

function AddParticipant() {
  const isModalVisible = useTypedSelector(selectNewParticipantModal);
  const [query, setQuery] = useState('');
  const { enqueueSnackbar } = useSnackbar();
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

  useEffect(() => {
    isModalVisible && dispatch(getUsers({ search: query, limit: 20, page: usersSearch.page + 1 })).unwrap();
  }, [query, isModalVisible, dispatch, usersSearch.page]);

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
      <div
        className="p-2 w-full max-w-2xl overflow-y-scroll h-1/2 top-32 mx-auto relative bg-white rounded-lg dark:bg-slate-700 shadow-2xl"
        id="add-participant"
      >
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
        <div className="mx-6 space-y-2 mb-2" id="results">
          {usersSearch.users.map((user: SpaceUser) => (
            <UserRow key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddParticipant;
