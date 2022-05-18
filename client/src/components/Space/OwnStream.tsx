import React, { useContext } from 'react';
import { ParticipantTypes } from '../../constants';
import { useTypedSelector } from '../../hooks';
import { SocketContext } from '../../spaces';
import { selectCurrentUser } from '../../store/authSlice';
import { getAvatar } from '../../utils';

function Participant() {
  const currentUser = useTypedSelector(selectCurrentUser);
  const { userStream, socketRef } = useContext(SocketContext);
  // socketRef.current?.on('XXX', (res: any) => {
  //   alert(res);
  //   // console.log('xxxx', res);
  //   // videoTrack.enabled = false;
  //   // currStream.enabled = false;
  // });

  const mute = () => {
    // socketRef.current.emit(MUTE_REMOTE_MIC, socketRef.current?.id);
  };

  return (
    <>
      <div onClick={mute} className="flex-col items-center justify-center mx-auto w-full bg-slate-200 dark:bg-slate-100 rounded-md py-4">
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
      </div>
    </>
  );
}

export default Participant;
