import React from 'react';
import { StreamPlayer } from '.';
import { ParticipantItem } from '../../@types';
import { getAvatar } from '../../utils';
import Peer from 'simple-peer';
interface IProps {
  participant?: ParticipantItem;
  peer: Peer.Instance;
}

function Participant(props: IProps) {
  const { participant } = props;
  const user = participant?.user;

  if (!props.peer) return null;
  console.log({ peer: props.peer.connected });

  // if (!props.peer.connected) return null;

  return (
    <div className="flex-col items-center justify-center mx-auto w-full bg-slate-200 dark:bg-slate-800 rounded-md py-4">
      <StreamPlayer peer={props.peer} />

      <img src={user?.profilePicture?.smallUrl || getAvatar(user?.username)} className="bg-slate-500 rounded-full h-12 w-12 mx-auto" />
      <div className="flex items-center justify-center my-1">
        <span className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-slate-700 mt-1 dark:text-slate-300">
          {participant?.type}
        </span>
      </div>
      <span className="text-xs self-center block mt-2 text-slate-700 dark:text-slate-200 text-center">
        {user?.fullName.trim() || `@${user?.username}`}
      </span>
    </div>
  );
}

export default Participant;
