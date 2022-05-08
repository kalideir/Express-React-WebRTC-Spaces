import { Link } from 'react-router-dom';
import { NavItem } from '../@types';

function Nav({ items }: { items: NavItem[] }) {
  return (
    <nav className="flex bg-slate-100 dark:bg-slate-800 py-3 px-5 text-slate-400 border-0 rounded" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </Link>
        </li>
        {items.map((item: NavItem) => (
          <li key={item.name}>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to={item.to}
                className="ml-1 text-sm font-medium text-slate-700 hover:text-slate-900 md:ml-2 dark:text-slate-400 dark:hover:text-white"
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Nav;
