import { useContext } from 'react';
import { StreamPlayer } from '.';
import { SocketContext } from '../../spaces';

function Streams() {
  const { stream, streams } = useContext(SocketContext);
  return (
    <div
      className="mt-5 bg-slate-50 dark:bg-slate-800 text-slate-8-- dark:text-slate-200 p-4 flex-col py-2 justify-center items-center shadow-md rounded-md"
      style={{ height: '50rem' }}
    >
      <div className=" grid grid-cols-5 auto-rows-fr text-center self-center gap-1">
        <StreamPlayer stream={stream} />
        <span>{Object.values(streams).length}</span>
        {Object.values<MediaStream>(streams).map((item, index) => (
          <StreamPlayer stream={item} key={index.toString()} />
        ))}
      </div>
    </div>
  );
}

export default Streams;
