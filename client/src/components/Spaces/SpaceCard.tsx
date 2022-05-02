import React from 'react';

function SpaceCard() {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-slate-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="hidden sm:inline-block text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-slate-200 dark:focus:ring-slate-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        <div
          id="dropdown"
          className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-slate-100 shadow dark:bg-slate-700"
          data-popper-reference-hidden
          data-popper-escaped
          data-popper-placement="top"
          style={{ position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(847px, 2694px)' }}
        >
          <ul className="py-1" aria-labelledby="dropdownButton">
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white"
              >
                Export Data
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-slate-900 dark:text-white">Bonnie Green</h5>
        <span className="text-sm text-slate-500 dark:text-slate-400">Visual Designer</span>
        <div className="flex -space-x-4">
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://alihkudeir.s3.eu-west-2.amazonaws.com/EQGxsp2OzCIQl69T_100x100"
            alt=""
          />
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://alihkudeir.s3.eu-west-2.amazonaws.com/EQGxsp2OzCIQl69T_100x100"
            alt=""
          />
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://alihkudeir.s3.eu-west-2.amazonaws.com/EQGxsp2OzCIQl69T_100x100"
            alt=""
          />
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://alihkudeir.s3.eu-west-2.amazonaws.com/EQGxsp2OzCIQl69T_100x100"
            alt=""
          />
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://alihkudeir.s3.eu-west-2.amazonaws.com/EQGxsp2OzCIQl69T_100x100"
            alt=""
          />
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://alihkudeir.s3.eu-west-2.amazonaws.com/EQGxsp2OzCIQl69T_100x100"
            alt=""
          />
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://alihkudeir.s3.eu-west-2.amazonaws.com/EQGxsp2OzCIQl69T_100x100"
            alt=""
          />
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://alihkudeir.s3.eu-west-2.amazonaws.com/EQGxsp2OzCIQl69T_100x100"
            alt=""
          />

          <a
            className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
            href="#"
          >
            +99
          </a>
        </div>

        {/* <div className="flex mt-4 space-x-3 lg:mt-6">
          <a
            href="#"
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add friend
          </a>
          <a
            href="#"
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-slate-900 bg-white rounded-lg border border-slate-300 hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:border-slate-700 dark:focus:ring-slate-700"
          >
            Message
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default SpaceCard;
