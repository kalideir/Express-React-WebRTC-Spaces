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
    <div className="grid grid-cols-5 gap-1 w-full p-2">
      {range(5).map((index: number) => (
        <div className="flex-col items-center justify-center mx-auto w-full p-1 bg-slate-200 dark:bg-slate-800 rounded-md" key={index.toString()}>
          <img src="https://robohash.org/utpariaturfugit.png?size=50x50&amp;set=set1" className="bg-slate-500 rounded-full mt-4 h-12 w-12 mx-auto" />
          <div className="flex items-center justify-center">
            <span className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-slate-700 mt-1 dark:text-gray-300">
              Speaker
            </span>
          </div>
          <div className="w-20 h-6 mx-auto my-3 self-center flex items-center justify-center text-indigo-500 px-4 border-2 border-indigo-500 rounded-full cursor-pointer">
            <FaRegClock size={14} className="text-pruple-700" />
            <span className="text-xs ml-2">10:12:34</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
