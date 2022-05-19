import React, { useContext, useEffect, useState } from 'react';
import { MUTE_REMOTE_MIC, ParticipantTypes, UNMUTE_REMOTE_MIC } from '../../constants';
import { useTypedSelector } from '../../hooks';
import { SocketContext } from '../../spaces';
import { selectCurrentUser } from '../../store/authSlice';
import { selectActiveSpace } from '../../store/spaceSlice';
import { getAvatar } from '../../utils';

function Participant() {
  const currentUser = useTypedSelector(selectCurrentUser);
  const currentSpace = useTypedSelector(selectActiveSpace);
  const { userStream, socketRef } = useContext(SocketContext);
  const [mutedByHost, setMutedByHost] = useState(false);
  const isSpaceHost = currentSpace?.ownerId === currentUser?.id;

  const [streamEnabled, setStreamEnabled] = useState(true);

  useEffect(() => {}, [socketRef, userStream]);

  socketRef.current?.on(MUTE_REMOTE_MIC, () => {
    if (streamEnabled) {
      userStream.current?.srcObject?.getTracks()?.forEach((track: MediaStreamTrack) => {
        track.enabled = false;
      });
      setMutedByHost(() => true);
    }
  });

  socketRef.current?.on(UNMUTE_REMOTE_MIC, () => {
    if (streamEnabled) {
      userStream.current?.srcObject?.getTracks()?.forEach((track: MediaStreamTrack) => {
        track.enabled = true;
      });
      setMutedByHost(() => false);
    }
  });

  function toggleMute() {
    if (!mutedByHost) {
      setStreamEnabled(isEnabled => !isEnabled);
      userStream.current?.srcObject?.getTracks()?.forEach((track: MediaStreamTrack) => {
        track.enabled = !track.enabled;
      });
    }
  }

  return (
    <>
      <div className="flex-col items-center justify-center mx-auto w-full bg-slate-200 dark:bg-slate-800 rounded-md py-4">
        <video style={{}} playsInline autoPlay ref={userStream} />
        <img
          src={currentUser?.profilePicture?.smallUrl || getAvatar(currentUser?.username)}
          className="bg-slate-500 rounded-full h-12 w-12 mx-auto mt-2"
        />
        <div className="flex items-center justify-center my-2">
          <span className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-slate-700 mt-1 dark:text-slate-300">
            {ParticipantTypes.HOST}
          </span>
        </div>
        <span className="text-xs self-center block mt-2 text-slate-700 dark:text-slate-200 text-center">
          {currentUser?.fullName?.trim() || `@${currentUser?.username}`}
        </span>
        {isSpaceHost && (
          <button
            onClick={toggleMute}
            className="bg-indigo-500 text-slate-100 mt-2 rounded py-2 h-6 text-xs px-4 flex items-center justify-center mx-auto"
          >
            {!streamEnabled ? 'Unmute' : 'Mute'}
          </button>
        )}
        {!isSpaceHost && !mutedByHost && (
          <button
            onClick={toggleMute}
            className="bg-indigo-500 text-slate-100 mt-2 rounded py-2 h-6 text-xs px-4 flex items-center justify-center mx-auto"
          >
            {!streamEnabled ? 'Unmute' : 'Mute'}
          </button>
        )}
      </div>
    </>
  );
}

export default Participant;
