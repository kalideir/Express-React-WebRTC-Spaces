function SpaceSkeleton() {
  return (
    <div className="animate-pulse max-w-sm bg-white rounded-lg border border-slate-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
      <div className="flex justify-end px-2 pt-2">
        <button className="hidden sm:inline-block text-slate-600" type="button">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center py-5">
        <div className="bg-slate-700 w-4/5 h-3 rounded"></div>
        <div className="bg-slate-700 w-4/5 h-3 rounded my-3"></div>
      </div>
      <div className="flex items-center p-6 space-x-2 rounded-b border-dashed border-t border-slate-200 dark:border-slate-600">
        <button
          data-modal-toggle="defaultModal"
          className="text-white  w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-700"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default SpaceSkeleton;
