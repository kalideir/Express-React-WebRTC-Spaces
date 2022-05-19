import clsx from 'clsx';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { END_SPACE } from '../../constants';
import { SocketContext } from '../../spaces';

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  spaceId: string;
}
function ConfirmEndSpace(props: IProps) {
  const { socketRef } = useContext(SocketContext);
  const navigate = useNavigate();
  const endSpace = () => {
    socketRef.current?.emit(END_SPACE, props.spaceId);
    navigate('/');
  };

  return (
    <div
      id="dropdown"
      className={clsx(
        props.visible && 'fixed',
        !props.visible && 'hidden',
        'z-10 w-44 text-base list-none right-0 top-0 bg-white rounded divide-y divide-slate-100 shadow dark:bg-slate-700',
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
            onClick={endSpace}
            className="block w-full py-2 px-4 text-sm text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white"
          >
            End for all
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ConfirmEndSpace;
