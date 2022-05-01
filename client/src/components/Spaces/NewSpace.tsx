import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { selectNewSpaceVisible, toggleNewSpaceModal } from '../../store/uiSlice';

function NewSpace() {
  const dispatch = useAppDispatch();
  const toggleSpaceModal = () => dispatch(toggleNewSpaceModal());
  const modalVisible = useSelector(selectNewSpaceVisible);

  if (!modalVisible) return null;

  return (
    <div
      onClick={toggleSpaceModal}
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 mx-auto left-0 right-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto mx-auto pt-32">
        <div className="relative bg-white rounded-lg shadow dark:bg-slate-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-slate-600">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Create New Space</h3>
            <button
              type="button"
              onClick={toggleSpaceModal}
              className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="w-full">
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="email"
                  autoFocus
                  // {...register('email')}
                  className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Space Title
                </label>
                {/* {errors.username && <div className="text-red-500 font-semibold">{errors.username.message}</div>} */}
              </div>
              <label htmlFor="default-toggle" className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" id="default-toggle" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-slate-900 dark:text-slate-300">Private</span>
              </label>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-slate-200 dark:border-slate-600">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-white  w-full  bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewSpace;
