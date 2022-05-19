import { useEffect, useState } from 'react';
import { BsClipboardCheck, BsClipboard } from 'react-icons/bs';
import { useAppDispatch, useClipboard, useTypedSelector } from '../../hooks';
import { selectActiveSpace, updateSpace } from '../../store/spaceSlice';
import { useLocation, useParams } from 'react-router-dom';
import { Board } from '.';
import { Divider } from '../../layout';
import { SpaceStatus } from '../../constants';
import { SpaceItem } from '../../@types';

function SpaceHeader() {
  const [isCopied, copy] = useClipboard();
  const [isLoading, setIsLoading] = useState(false);
  const activeSpace = useTypedSelector(selectActiveSpace) as SpaceItem;
  const location = useLocation();
  const { key } = useParams();
  const dispatch = useAppDispatch();

  return (
    <div className={`mt-5 bg-slate-50 dark:bg-slate-900 flex-col py-2 justify-center items-center shadow-md rounded-md`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold letter mt-3 text-late-700 dark:text-slate-200 text-center tracking-wide mb-5">{activeSpace?.title}</h1>
        <button onClick={() => copy(key || '')} className="w-32 h-8 bg-indigo-500 flex items-center justify-center rounded">
          <span className="text-xs text-slate-200 mx-2">{isCopied ? 'Copied' : 'Copy Share URL'}</span>
          {isCopied ? (
            <BsClipboardCheck className="text-white transition-all ease-in-out duration-300" size={18} />
          ) : (
            <BsClipboard className="text-white transition-all ease-in-out duration-300" size={18} />
          )}
        </button>
      </div>
      {/* <Board /> */}
    </div>
  );
}

export default SpaceHeader;
