import { useMemo } from 'react';
import { Participant } from '.';
import { ParticipantItem } from '../../@types';
import { useTypedSelector } from '../../hooks';
import { selectSpaceGuests, spaceGuestQuery } from '../../store/spaceSlice';

function Participants() {
  const guests = useTypedSelector(selectSpaceGuests);
  const query = useTypedSelector(spaceGuestQuery);

  const filtered = useMemo(
    () => guests.filter((guest: ParticipantItem) => guest.user?.fullName.includes(query) || guest.user?.username.includes(query)),
    [guests, query],
  );

  return (
    <div className="mt-5 bg-slate-50 dark:bg-slate-900 py-2 shadow-md rounded-md grid grid-cols-5 auto-rows-fr text-center self-center gap-1">
      {filtered.map((participant: ParticipantItem) => (
        <Participant key={participant.id} participant={participant} />
      ))}
    </div>
  );
}

export default Participants;
