import React, { useState } from 'react';
import { ParticipantStatus, SpaceItem, SpaceUser } from '../../@types';
import { Divider } from '../../layout';
import { getAvatar } from '../../utils';
import { BsPlus } from 'react-icons/bs';
import { useAppDispatch, useTypedSelector } from '../../hooks';
import { addDeleteParticipant, selectActiveSpace } from '../../store/spaceSlice';
import { ParticipantTypes } from '../../constants';

function UserRow({ user }: { user: SpaceUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace) as SpaceItem;
  const [type, setType] = useState<ParticipantStatus>('GUEST');
  const dispatch = useAppDispatch();

  async function toggleParticipant() {
    setIsLoading(true);
    await dispatch(addDeleteParticipant({ key: activeSpace.key, userId: user.id, type }));
    setIsLoading(false);
  }

  return (
    <div key={user.id} className="">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={user.profilePicture?.smallUrl || getAvatar(user.username || user.fullName || user.email)}
            className="h-10 w-10 rounded-full bg-slate-500"
          />

          <span className="text-sm ml-4 text-slate-800 dark:text-slate-300">{user.fullName.trim() || user.username || user.email}</span>
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
          <button
            onClick={toggleParticipant}
            className="text-white ml-4  bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            <BsPlus size={20} className="text-slate-100" />
          </button>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default UserRow;
