import React, { ChangeEvent, memo, useMemo, useState } from 'react';
import { ParticipantItem, ParticipantStatus, SpaceItem, SpaceUser } from '../../@types';
import { Divider, Loading } from '../../layout';
import { getAvatar } from '../../utils';
import { BsPlus, BsTrash } from 'react-icons/bs';
import { useAppDispatch, useTypedSelector } from '../../hooks';
import { addDeleteParticipant, selectActiveSpace } from '../../store/spaceSlice';
import { ParticipantTypes } from '../../constants';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';

function UserRow({ user }: { user: SpaceUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace) as SpaceItem;
  const [type, setType] = useState<ParticipantStatus>('GUEST');
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  async function toggleParticipant() {
    setIsLoading(true);
    const res = await dispatch(addDeleteParticipant({ key: activeSpace.key, userId: user.id, type })).unwrap();
    enqueueSnackbar(res.message, {
      variant: 'success',
    });
    setIsLoading(false);
  }

  const isParticipant = useMemo(
    () => !!activeSpace?.participants?.find((participant: ParticipantItem) => participant.userId === user.id),
    [activeSpace?.participants, user.id],
  );

  return (
    <div key={user.id} className="">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={user.profilePicture?.smallUrl || getAvatar(user.username || user.fullName || user.email)}
            className="h-10 w-10 rounded-full bg-slate-500"
          />

          <span className="text-sm ml-4 text-slate-800 dark:text-slate-300">{user.id.trim() || user.username || user.email}</span>
        </div>
        <div className="flex items-center">
          <select
            id="countries"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value as ParticipantStatus)}
            className="bg-slate-50 border px-4 border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={ParticipantTypes.GUEST}>Guest</option>
            <option value={ParticipantTypes.SPEAKER}>Speaker</option>
            <option value={ParticipantTypes.HOST}>Host</option>
          </select>
          <button
            onClick={toggleParticipant}
            className={clsx(
              isParticipant && 'bg-red-500 dark:bg-red-500',
              'text-white ml-4 w-16 flex items-center justify-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800',
            )}
          >
            {isLoading ? (
              <Loading />
            ) : !isParticipant ? (
              <BsPlus size={20} className="text-slate-100" />
            ) : (
              <BsTrash size={20} className="text-slate-100" />
            )}
          </button>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default memo(UserRow);
