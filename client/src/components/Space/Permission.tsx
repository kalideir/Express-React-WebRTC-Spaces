import clsx from 'clsx';
import { selectPermissionModal, togglePermissionModal } from '../../store/spaceSlice';
import { BsFillMicFill } from 'react-icons/bs';
import { MIC_ACCESS_GRANTED } from '../../constants';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks';

function Permission() {
  const isModalVisible = useTypedSelector(selectPermissionModal);
  const dispatch = useDispatch();

  function grant() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(stream => {
        localStorage.setItem(MIC_ACCESS_GRANTED, 'true');
        dispatch(togglePermissionModal(false));
        // window.localStream = stream; // A
        // window.localAudio.srcObject = stream; // B
        // window.localAudio.autoplay = true; // C
      })
      .catch(err => {
        console.log('u got an error:' + err);
      });
  }
  return (
    <div
      id="popup-modal"
      className={clsx([
        isModalVisible && 'show',
        !isModalVisible && 'hidden',
        'idden overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-ful',
      ])}
      aria-hidden="true"
    >
      <div className="relative w-full max-w-md h-full mx-auto top-32 md:h-auto">
        <div className="relative p-10 bg-slate-50 rounded-lg shadow dark:bg-slate-700">
          <div className="text-center">
            <BsFillMicFill className="text-indigo-400 self-center mx-auto mb-5" size={30} />
            <h3 className="mb-5 text-lg font-normal text-slate-50 dark:text-slate-400">
              Access to your microphone is required to start a new space.
            </h3>
            <button
              onClick={grant}
              data-modal-toggle="popup-modal"
              type="button"
              className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Allow Access
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              className="text-slate-500 bg-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-slate-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-900 dark:focus:ring-slate-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Permission;
