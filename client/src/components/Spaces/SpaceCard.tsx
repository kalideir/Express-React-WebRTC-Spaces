import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UsersFooter } from '.';
import { SpaceItem } from '../../@types';
import { Divider, DropDown } from '../../layout';
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
          onClick={() => setDropDownVisible(true)}
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
        <h5 className="mb-1 text-xl font-medium text-slate-900 text-center dark:text-white flex break-all mx-5">{props.item.title}</h5>
        <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">{props.item.status}</span>
        {!!props.item.participantIds.length && <UsersFooter users={[]} />}
      </div>
      <Divider />
      <div className="flex items-center p-6 space-x-2 rounded-b">
        <Link
          to={`/space/${props.item.key}/${slugify(props.item.title)}`}
          data-modal-toggle="defaultModal"
          className="text-white  w-full  bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default SpaceCard;
