import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';
import { Loading } from '.';
import { useAppDispatch } from '../hooks';
import { deleteSpace } from '../store/spaceSlice';

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  spaceKey: string;
}
function DropDown(props: IProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function _deleteSpace() {
    setIsLoading(true);
    await dispatch(deleteSpace(props.spaceKey));
    setIsLoading(false);
  }

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
          <button
            onClick={_deleteSpace}
            className="block w-full py-2 px-4 text-sm text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white"
          >
            {isLoading ? <Loading /> : 'Delete'}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
