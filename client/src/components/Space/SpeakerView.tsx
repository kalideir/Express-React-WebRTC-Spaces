import { useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { BsClipboardCheck, BsClipboard } from 'react-icons/bs';
import { useClipboard, useTypedSelector } from '../../hooks';
import { selectActiveSpace } from '../../store/spaceSlice';
import { useLocation, useParams } from 'react-router-dom';

function SpeakerView() {
  const [isCopied, copy] = useClipboard();
  const activeSpace = useTypedSelector(selectActiveSpace);
  const { key, slug } = useParams();
  const location = useLocation();

  return (
    <div className={`mt-4 w-10/12 bg-slate-50 dark:bg-slate-900 mx-auto flex-col py-2 justify-center items-center shadow-md rounded-md`}>
      <h1 className="text-2xl font-bold letter mt-3 text-late-700 dark:text-slate-200 text-center tracking-wide">{activeSpace?.title}</h1>
      <div className="w-2/4 mx-auto mt-4">
        <div className="relative z-0 mb-6 group">
          <div className="bg-slate-100 border relative border-slate-300 text-slate-900 text-xs rounded block w-full p-2 dark:bg-slate-600 dark:border-slate-600 dark:text-slate-300">
            {location.pathname}
          </div>
          <button
            onClick={() => copy(location.pathname || '')}
            className="w-12 h-full absolute right-0 top-0 bg-indigo-500 flex items-center justify-center rounded"
          >
            {isCopied ? (
              <BsClipboardCheck className="text-white transition-all ease-in-out duration-300" size={18} />
            ) : (
              <BsClipboard className="text-white transition-all ease-in-out duration-300" size={18} />
            )}
          </button>
        </div>
      </div>
      <img src="https://robohash.org/utpariaturfugit.png?size=50x50&amp;set=set1" className="bg-slate-500 rounded-full h-20 w-20 mx-auto" />

      <div className="w-32 h-8 mx-auto my-3 self-center flex items-center justify-center text-indigo-500 px-4 border-2 border-indigo-500 rounded-full cursor-pointer">
        <FaRegClock size={14} className="text-pruple-700" />
        <span className="text-xs ml-2">10:12:34</span>
      </div>
    </div>
  );
}

export default SpeakerView;
