import { nanoid } from '@reduxjs/toolkit';
import { useContext, useMemo } from 'react';
import { OwnStream, Participant, StreamPlayer } from '.';
import { ParticipantItem, PeerUser } from '../../@types';
import { useTypedSelector } from '../../hooks';
import { SocketContext } from '../../spaces';
import { selectCurrentUser } from '../../store/authSlice';
import { selectSpaceParticipants, spaceGuestQuery } from '../../store/spaceSlice';

function Participants() {
  const participants = useTypedSelector(selectSpaceParticipants);
  const query = useTypedSelector(spaceGuestQuery);
  const { peers } = useContext<{ peers: PeerUser[] }>(SocketContext);
  const currentUser = useTypedSelector(selectCurrentUser);

  const items = useMemo(() => {
    return (
      peers
        // .filter(({ userId }) => userId !== currentUser?.id)
        .map((peer: PeerUser) => {
          const participant = participants.find(participant => participant.userId === peer.userId);
          return { ...peer, participant };
        }, [])
    );
  }, [participants, peers]);

  const filtered = useMemo(
    () => items.filter((user: PeerUser) => user.participant?.user?.fullName.includes(query) || user.participant?.user?.username?.includes(query)),
    [items, query],
  );

  return (
    <div className="mt-5 bg-slate-50 dark:bg-slate-900 py-2 shadow-md rounded-md grid grid-cols-5 auto-rows-fr text-center self-center gap-1">
      <OwnStream />
      {filtered.map((peerUser: PeerUser) => (
        <div key={peerUser.socketId}>
          <Participant key={nanoid()} socketId={peerUser.socketId} participant={peerUser.participant} peer={peerUser.peer} />
        </div>
      ))}
    </div>
  );
}

export default Participants;
