import React from 'react';
import { getAvatar, range } from '../../utils';
import { FaRegClock } from 'react-icons/fa';
import { selectActiveSpace, selectSpaceBoard } from '../../store/spaceSlice';
import { useTypedSelector } from '../../hooks';
import { SpaceStatus } from '../../constants';
import { IUser, ParticipantItem } from '../../@types';
import { selectCurrentUser } from '../../store/authSlice';

function Board() {
  const activeSpace = useTypedSelector(selectActiveSpace);
  const currentUser = useTypedSelector(selectCurrentUser) as IUser;
  const board = useTypedSelector(selectSpaceBoard);

  if (!activeSpace || activeSpace.status === SpaceStatus.CREATED) {
    return null;
  }

  return (
    <div className="grid grid-cols-5 gap-1 w-full mt-2">
      <div className="flex-col items-center justify-center mx-auto w-full bg-slate-200 dark:bg-slate-800 rounded-md py-4">
        <img src={currentUser.profilePicture?.smallUrl || getAvatar(currentUser.username)} className="bg-slate-500 rounded-full h-12 w-12 mx-auto" />
        <div className="flex items-center justify-center">
          <span className="bg-slate-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-indigo-700 mt-2 dark:text-slate-300">
            Owner
          </span>
        </div>
        <span className="text-xs self-center block mt-2 text-slate-700 dark:text-slate-200 text-center">
          {currentUser.fullName.trim() || currentUser.username}
        </span>
      </div>
      {board.map((participant: ParticipantItem) => (
        <div className="flex-col items-center justify-center mx-auto w-full bg-slate-200 dark:bg-slate-800 rounded-md py-4" key={participant.id}>
          <img
            src={participant.user?.profilePicture?.smallUrl || getAvatar(participant.user?.username)}
            className="bg-slate-500 rounded-full h-12 w-12 mx-auto"
          />
          <div className="flex items-center justify-center">
            <span className="bg-green-500 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-600 mt-2 dark:text-slate-300">
              {participant.type}
            </span>
          </div>
          <span className="text-xs self-center block mt-2 text-slate-700 dark:text-slate-200 text-center">
            {participant.user?.fullName.trim() || `@${participant.user?.username}`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Board;
