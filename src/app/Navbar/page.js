'use client'

import { useState } from 'react';

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () =>{
location.href = 'localhost:3000/Home'
  }
  return (
    <nav className="bg-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">Your Logo</h1>
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none focus:text-white"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 5H5a1 1 0 010-2h14a1 1 0 010 2zM5 11h14a1 1 0 100-2H5a1 1 0 100 2zm14 6H5a1 1 0 100 2h14a1 1 0 100-2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:w-auto`}
        >
          <ul className="md:flex items-center space-x-4">
            <li>
              <a
                href="#"
                className="block text-white font-medium hover:text-gray-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-white font-medium hover:text-gray-300"
              >
                Services
              </a>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </div>
        <div className="md:flex items-center">
          <div className="md:flex items-center">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="https://via.placeholder.com/150"
              alt="User"
            />
            <span className="text-white ml-2">{props.title}</span>
            <button
          type="button"
          class="flex-1 bg-blue-500 text-white font-semibold px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mr-2"
          onClick={logOut}
        >
          Log Out
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
