import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}
function DropDown(props: IProps) {
  return (
    <div
      id="dropdown"
      className={clsx(
        props.visible && 'fixed',
        !props.visible && 'hidden',
        'z-10 w-44 text-base list-none right-3 top-3 bg-white rounded divide-y divide-slate-100 shadow dark:bg-slate-700',
      )}
      onMouseLeave={() => props.setVisible(false)}
      data-popper-reference-hidden
      data-popper-escaped
      data-popper-placement="top"
      style={{ position: 'absolute' }}
    >
      <ul className="py-1" aria-labelledby="dropdownButton">
        <li>
          <a
            href="#"
            className="block py-2 px-4 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white"
          >
            View
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-4 text-sm text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white"
          >
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
