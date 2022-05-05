import React, { ChangeEvent, memo, useMemo, useState } from 'react';
import { ParticipantItem, ParticipantStatus, SpaceItem, SpaceUser } from '../../@types';
import { Divider } from '../../layout';
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
              'text-white ml-4 w-16 flex items-center justify-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800',
            )}
          >
            {isLoading ? (
              <svg
                role="status"
                className="inline w-4 h-4 text-white animate-spin"
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
