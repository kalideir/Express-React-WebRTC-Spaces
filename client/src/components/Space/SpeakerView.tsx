import { useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';

function SpeakerView() {
  const [border, setBorder] = useState(0);

  return (
    <div className={`my-4 w-10/12 bg-slate-50 dark:bg-slate-900 mx-auto flex-col py-2 justify-center items-center shadow-md rounded-md`}>
      <h1 className="text-2xl font-bold letter mt-3 text-late-700 dark:text-slate-200 text-center tracking-wide">
        What are the impacts of few hour sleep?
      </h1>
      <p className="w-7/12 text-gray-800 my-7 text-xs text-center mx-auto dark:text-gray-200">
        We are going to tackle the side effects of not having a healthy regular sleeping schedule on the body, brain and life performance.{' '}
      </p>
      <img src="https://robohash.org/utpariaturfugit.png?size=50x50&amp;set=set1" className="bg-slate-500 rounded-full h-20 w-20 mx-auto" />

      <div className="w-32 h-8 mx-auto my-3 self-center flex items-center justify-center text-indigo-500 px-4 border-2 border-indigo-500 rounded-full cursor-pointer">
        <FaRegClock size={14} className="text-pruple-700" />
        <span className="text-xs ml-2">10:12:34</span>
      </div>
    </div>
  );
}

export default SpeakerView;
