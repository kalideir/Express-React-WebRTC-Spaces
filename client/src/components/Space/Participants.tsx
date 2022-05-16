import { nanoid } from '@reduxjs/toolkit';
import { useContext, useMemo } from 'react';
import { Participant } from '.';
import { ParticipantItem, PeerUser } from '../../@types';
import { useTypedSelector } from '../../hooks';
import { SocketContext } from '../../spaces';
import { selectSpaceParticipants, spaceGuestQuery } from '../../store/spaceSlice';

function Participants() {
  const participants = useTypedSelector(selectSpaceParticipants);
  const query = useTypedSelector(spaceGuestQuery);
  const { peers } = useContext<{ peers: PeerUser[] }>(SocketContext);

  const items = useMemo(() => {
    return peers.reduce((acc: PeerUser[], curr: PeerUser) => {
      const participant = participants.find(participant => participant.userId === curr.userId);
      // if (!participant) return acc;
      acc.push({ ...curr, participant });
      return acc;
    }, []);
  }, [participants, peers]);

  console.log({ peers, items });

  const filtered = useMemo(
    () => participants.filter((guest: ParticipantItem) => guest.user?.fullName.includes(query) || guest.user?.username.includes(query)),
    [participants, query],
  );

  return (
    <div className="mt-5 bg-slate-50 overflow-y-scroll h-screen max-h-screen dark:bg-slate-900 py-2 shadow-md rounded-md grid grid-cols-5 auto-rows-fr text-center self-center gap-1">
      {/* <Participant key={nanoid()} socketId={peerUser.socketId} participant={peerUser.participant} peer={peerUser.peer} /> */}
      {items.map((peerUser: PeerUser) => (
        <Participant key={nanoid()} socketId={peerUser.socketId} participant={peerUser.participant} peer={peerUser.peer} />
      ))}
    </div>
  );
}

export default Participants;
