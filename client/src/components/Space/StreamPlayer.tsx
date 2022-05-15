import { useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { useTypedSelector } from '../../hooks';
import { selectCurrentUser } from '../../store/authSlice';
import { selectActiveSpace } from '../../store/spaceSlice';

const Video = (props: { peer: Peer.Instance }) => {
  const ref = useRef<any | null>(null);
  const currentSpace = useTypedSelector(selectActiveSpace);
  const currentUser = useTypedSelector(selectCurrentUser);

  const isOwner = currentSpace?.ownerId === currentUser?.id;

  useEffect(() => {
    props.peer.on('stream', (stream: unknown) => {
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return (
    <div className="flex-col items-center justify-center p-1 bg-red-100">
      <video style={{ width: '100%', height: '100%' }} playsInline autoPlay ref={ref} />
      {isOwner && (
        <button className="bg-indigo-500 text-slate-100 mt-2 rounded py-2 h-6 text-xs px-4 flex items-center justify-center mx-auto">Mute</button>
      )}
    </div>
  );
};

export default Video;
