import { memo } from 'react';
import { ParticipantItem } from '../../@types';
import { getAvatar } from '../../utils';

interface IProps {
  participants: ParticipantItem[];
}

const NUM_OF_ITEMS = 10;

function UsersFooter(props: IProps) {
  const participants = props.participants;
  return (
    <div className="flex -space-x-4 items-center flex-wrap mt-2 justify-center bg-red-400">
      {participants.slice(0, 10).map((participant: ParticipantItem) => (
        <img
          key={participant.id}
          className="w-12 h-12 border-2 border-white rounded-full dark:border-slate-800"
          src={participant.user?.profilePicture?.smallUrl || getAvatar(participant.user?.username || '')}
          alt=""
        />
      ))}
      {participants.length > NUM_OF_ITEMS && (
        <a
          className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-indigo-700 border-2 border-white rounded-full hover:bg-indigo-600 dark:border-slate-800"
          href="#"
        >
          + {(participants.length || 12) - 12}
        </a>
      )}
    </div>
  );
}

export default memo(UsersFooter);
