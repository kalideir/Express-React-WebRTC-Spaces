import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UsersFooter } from '.';
import { SpaceItem } from '../../@types';
import { DropDown } from '../../layout';
import { slugify } from '../../utils';

interface IProps {
  item: SpaceItem;
}

function SpaceCard(props: IProps) {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  return (
    <div className="max-w-sm bg-white rounded-lg border border-slate-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
      <div className="flex justify-end px-2 pt-2 relative">
        <button
          onMouseOver={() => setDropDownVisible(true)}
          data-dropdown-toggle="dropdown"
          className="hidden sm:inline-block text-slate-500 dark:text-slate-400  hover:bg-slate-100 dark:hover:bg-slate-700  focus:ring-4 focus:outline-none focus:ring-slate-200 dark:focus:ring-slate-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        <DropDown visible={dropDownVisible} setVisible={setDropDownVisible} />
      </div>
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-slate-900 dark:text-white">{props.item.title}</h5>
        <span className="text-sm text-slate-500 dark:text-slate-400">Visual Designer</span>
        {!!props.item.participantIds.length && <UsersFooter users={[]} />}
      </div>
      <div className="flex items-center p-6 space-x-2 rounded-b border-dashed border-t border-slate-200 dark:border-slate-600">
        <Link
          to={`/space/${props.item.key}/${slugify(props.item.title)}`}
          data-modal-toggle="defaultModal"
          className="text-white  w-full  bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default SpaceCard;
