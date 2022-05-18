import { useContext } from 'react';
import { StreamPlayer } from '.';
import { PeerUser, SpaceContext } from '../../@types';
import { SocketContext } from '../../spaces';

function Streams() {
  const { stream, peers, streams } = useContext<any | SpaceContext>(SocketContext);
  // console.log({ peers }, 'x');

  return (
    <div
      className="mt-5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 flex-col py-2 justify-center items-center shadow-md rounded-md"
      style={{ height: '10rem' }}
    >
      <span>{peers.length}</span>
      <div className=" grid grid-cols-5 auto-rows-fr text-center self-center gap-1">
        {/* <video style={{ background: '#f8f8f8' }} autoPlay playsInline ref={userVideo} /> */}
        {peers.map((peer: PeerUser, index: number) => (
          <div key={index.toString()}>
            <h1>{peer.userId}</h1>
            <StreamPlayer peer={peer.peer} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Streams;
