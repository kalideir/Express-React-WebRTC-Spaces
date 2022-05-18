import { useContext, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { ALLOW_REMOTE_MIC, MUTE_REMOTE_MIC } from '../../constants';
import { useTypedSelector } from '../../hooks';
import { SocketContext } from '../../spaces';
import { selectCurrentUser } from '../../store/authSlice';
import { selectActiveSpace } from '../../store/spaceSlice';

const Video = (props: { peer: Peer.Instance; socketId?: string }) => {
  const ref = useRef<any>({});
  const currentSpace = useTypedSelector(selectActiveSpace);
  const currentUser = useTypedSelector(selectCurrentUser);
  const { socketRef } = useContext(SocketContext);

  const isOwner = currentSpace?.ownerId === currentUser?.id;
  const [currStream, setCurrStream] = useState<any>({});

  useEffect(() => {
    props.peer.on('stream', stream => {
      if (!ref.current) ref.current = {};
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  // useEffect(() => {
  //   socketRef?.current?.on(MUTE_REMOTE_MIC, (res: any) => {
  //     // console.log('xxxx', res);

  //     // videoTrack.enabled = false;
  //     // currStream.enabled = false;
  //   });
  // }, [currStream, socketRef]);

  function toggleMute() {
    // if (currStream.enabled) socketRef.current?.emit(MUTE_REMOTE_MIC, props.socketId);
    // else if (!currStream.enabled) socketRef.current?.emit(ALLOW_REMOTE_MIC, props.socketId);
    // console.log({ props });
  }

  return (
    <div className="flex-col items-center justify-center p-1 bg-slate-500 m-1 mb-2 h-auto">
      <video style={{ width: '100%', height: '100%' }} playsInline autoPlay ref={ref} />
      {/* {isOwner && ( */}
      <button
        onClick={toggleMute}
        className="bg-indigo-500 text-slate-100 mt-2 rounded py-2 h-6 text-xs px-4 flex items-center justify-center mx-auto"
      >
        {!currStream.enabled && currentUser?.id === currentSpace?.ownerId ? (
          <BsFillMicFill size={20} className="text-slate-800 dark:text-slate-200 mx-auto" />
        ) : (
          <BsFillMicMuteFill size={20} className="text-slate-800 dark:text-slate-200 mx-auto" />
        )}
      </button>
      {/* )} */}
    </div>
  );
};

export default Video;
