import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsPlusSquareFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/authSlice';
import { useAppDispatch } from '../hooks';

function Header() {
  const [top, setTop] = useState(true);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  const location = useLocation();

  return (
    <header className="relative px-3 py-sm:px-5 py-5 md:py-7">
      <div className="w-9/12 mx-auto">
        <div className="flex justify-between items-center h-10">
          <div>
            <Link className="block text-slate-900 font-extrabold tracking-wider text-3xl dark:text-slate-200" to="/">
              <span>xSpace</span>
            </Link>
          </div>

          <div className="inline-flex items-center">
            {!isAuthenticated && (
              <nav className="hidden md:flex md:flex-grow">
                <ul className="flex flex-grow justify-end flex-wrap items-center">
                  <li>
                    <Link className="block font-medium text-gray-300 hover:text-gray-200 py-2" to="/register">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link className="font-medium text-gray-300 hover:underline ml-3 sm:ml-6 lg:ml-10 py-2" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </nav>
            )}

            {isAuthenticated && (
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li>
                  <Link className="font-medium text-gray-300 hover:underline ml-3 sm:ml-6 lg:ml-10 py-2" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="font-medium text-gray-300 hover:underline ml-3 sm:ml-6 lg:ml-10 py-2" to="/my-spaces">
                    My Spaces
                  </Link>
                </li>
                <li>
                  <Link
                    to="/new-space"
                    state={{ backgroundLocation: location }}
                    className="btn-sm text-white bg-indigo-600 py-2 px-3 rounded flex items-center justify-start  hover:bg-indigo-700 ml-3 sm:ml-6 lg:ml-10"
                  >
                    <BsPlusSquareFill className="mr-2" />
                    <span>Create Space</span>
                  </Link>
                </li>
              </ul>
            )}

            <div className="flex md:hidden ml-3 sm:ml-6">
              <button className="hamburger" aria-controls="mobile-nav">
                <span className="sr-only pointer-events-none">Menu</span>
                <svg className="w-6 h-6 fill-current text-gray-900 pointer-events-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect y="4" width="24" height="2"></rect>
                  <rect y="11" width="24" height="2"></rect>
                  <rect y="18" width="24" height="2"></rect>
                </svg>
              </button>
              <nav
                id="mobile-nav"
                className="absolute top-full z-20 left-0 w-full bg-gray-800 px-3 sm:px-5 overflow-hidden opacity-0 max-h-0 transition-all duration-300 ease-in-out"
              >
                <ul className="py-3 text-center">
                  <li>
                    <a className="block font-medium text-gray-300 hover:text-gray-200 py-2" href="https://cruip.com/login">
                      Login
                    </a>
                  </li>
                  <li>
                    <a className="block font-medium text-gray-300 hover:text-gray-200 py-2" href="https://cruip.com/login">
                      Register
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
