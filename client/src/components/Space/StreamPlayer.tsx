import { useContext, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { useTypedSelector } from '../../hooks';
import { SocketContext } from '../../spaces';
import { selectCurrentUser } from '../../store/authSlice';
import { selectActiveSpace } from '../../store/spaceSlice';
import { MUTE_REMOTE_MIC, UNMUTE_REMOTE_MIC } from '../../constants';

const Video = (props: { peer: Peer.Instance; socketId?: string }) => {
  const ref = useRef<any>({});
  const currentSpace = useTypedSelector(selectActiveSpace);
  const currentUser = useTypedSelector(selectCurrentUser);
  const { socketRef } = useContext(SocketContext);

  const isSpaceHost = currentSpace?.ownerId === currentUser?.id;
  const [streamEnabled, setStreamEnabled] = useState(true);

  useEffect(() => {
    props.peer.on('stream', stream => {
      if (!ref.current) ref.current = {};
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  function toggleMute() {
    socketRef.current?.emit(streamEnabled ? MUTE_REMOTE_MIC : UNMUTE_REMOTE_MIC, props.socketId);
    setStreamEnabled(isEnabled => !isEnabled);
  }

  return (
    <div className="flex-col items-center justify-center p-1 bg-slate-500 m-1 mb-2 h-auto">
      <video style={{ width: '100%', height: '100%' }} playsInline autoPlay ref={ref} />
      {isSpaceHost && (
        <button
          onClick={toggleMute}
          className="bg-indigo-500 text-slate-100 mt-2 rounded py-2 h-6 text-xs px-4 flex items-center justify-center mx-auto"
        >
          {!streamEnabled ? 'Unmute' : 'Mute'}
        </button>
      )}
    </div>
  );
};

export default Video;
