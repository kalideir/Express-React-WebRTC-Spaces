import React from 'react';
import { range } from '../../utils';
import { FaRegClock } from 'react-icons/fa';
import { selectActiveSpace } from '../../store/spaceSlice';
import { useTypedSelector } from '../../hooks';
import { SpaceStatus } from '../../constants';

function Board() {
  const activeSpace = useTypedSelector(selectActiveSpace);

  if (!activeSpace || activeSpace.status === SpaceStatus.CREATED) {
    return null;
  }

  return (
    <div className="grid grid-cols-5 gap-1 w-full mt-2">
      {range(5).map((index: number) => (
        <div className="flex-col items-center justify-center mx-auto w-full bg-slate-200 dark:bg-slate-800 rounded-md py-4" key={index.toString()}>
          <img src="https://robohash.org/utpariaturfugit.png?size=50x50&amp;set=set1" className="bg-slate-500 rounded-full h-12 w-12 mx-auto" />
          <div className="flex items-center justify-center">
            <span className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-slate-700 mt-1 dark:text-slate-300">
              Speaker
            </span>
          </div>
          <span className="text-xs self-center block mt-2 text-slate-700 dark:text-slate-200 text-center">Ali H. Kudeir</span>
        </div>
      ))}
    </div>
  );
}

export default Board;
