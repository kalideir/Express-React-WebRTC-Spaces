import clsx from 'clsx';
import React, { memo, useContext, useMemo, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { ParticipantItem, SpaceItem } from '../../@types';
import { SWITCH_PARTICIPANT_TYPE } from '../../constants';
import { useAppDispatch, useTypedSelector } from '../../hooks';
import { Divider, Loading } from '../../layout';
import { SocketContext } from '../../spaces';
import { selectCurrentUser } from '../../store/authSlice';
import { selectActiveSpace } from '../../store/spaceSlice';
import { hideRequestsModal } from '../../store/uiSlice';
import { getAvatar } from '../../utils';

function RequestRow({ participant }: { participant: ParticipantItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace) as SpaceItem;
  const { socket, switchParticipantType } = useContext(SocketContext);

  const currentUser = useTypedSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  async function setParticipantGuest() {
    setIsLoading(true);
    socket?.emit(SWITCH_PARTICIPANT_TYPE, { key: activeSpace.key, userId: currentUser?.id, type: 'GUEST' });
    socket?.on(SWITCH_PARTICIPANT_TYPE, switchParticipantType);
    setIsLoading(false);
    // dispatch(hideRequestsModal());
  }

  const isParticipant = useMemo(
    () => !!activeSpace?.participants?.find((participant: ParticipantItem) => participant.userId === participant.id),
    [activeSpace?.participants],
  );

  return (
    <div key={participant.id} className="">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={
              participant.user?.profilePicture?.smallUrl ||
              getAvatar(participant.user?.username || participant.user?.fullName || participant.user?.email)
            }
            className="h-10 w-10 rounded-full bg-slate-500"
          />

          <span className="text-sm ml-4 text-slate-800 dark:text-slate-300">
            {participant.user?.fullName?.trim() || participant.user?.username || participant.user?.email}
          </span>
        </div>
        <div className="flex items-center">
          <button
            onClick={setParticipantGuest}
            className={clsx(
              !isParticipant && 'bg-green-500 dark:bg-green-500',
              'text-white ml-4 w-20 flex items-center justify-center hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800',
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
