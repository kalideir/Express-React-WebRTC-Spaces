import { useContext } from 'react';
import Peer from 'simple-peer';
import { StreamPlayer } from '.';
import { PeerUser } from '../../@types';
import { SocketContext } from '../../spaces';

function Streams() {
  const { stream, peers, userVideo } = useContext(SocketContext);

  return (
    <div
      className="mt-5 bg-slate-50 dark:bg-slate-800 text-slate-8-- dark:text-slate-200 p-4 flex-col py-2 justify-center items-center shadow-md rounded-md"
      style={{ height: '50rem' }}
    >
      <span>{peers.length}</span>
      <div className=" grid grid-cols-5 auto-rows-fr text-center self-center gap-1">
        <video style={{ background: '#f8f8f8' }} autoPlay playsInline ref={userVideo} />
        {peers.map((peer: PeerUser, index: number) => (
          <StreamPlayer peer={peer.peer} key={index.toString()} />
        ))}
      </div>
    </div>
  );
}

export default Streams;
