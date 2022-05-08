import React, { ChangeEvent, memo, useMemo, useState } from 'react';
import { ParticipantItem, ParticipantStatus, SpaceItem, SpaceUser } from '../../@types';
import { Divider, Loading } from '../../layout';
import { getAvatar } from '../../utils';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useTypedSelector } from '../../hooks';
import { addDeleteParticipant, selectActiveSpace } from '../../store/spaceSlice';
import { ParticipantTypes } from '../../constants';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';

function RequestRow({ user }: { user: SpaceUser }) {
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

          <span className="text-sm ml-4 text-slate-800 dark:text-slate-300">{user.fullName.trim() || user.username || user.email}</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleParticipant}
            className={clsx(
              !isParticipant && 'bg-green-500 dark:bg-green-500',
              'text-white ml-4 w-20 flex items-center justify-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800',
            )}
          >
            {isLoading ? (
              <Loading />
            ) : !isParticipant ? (
              <div className="flex items-center justify-around text-xs">
                <AiOutlineCheck size={14} className="text-slate-100" /> Add
              </div>
            ) : (
              <div className="flex items-center justify-around text-xs">
                <AiOutlineClose size={14} className="text-slate-100" /> Cancel
              </div>
            )}
          </button>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default memo(RequestRow);
