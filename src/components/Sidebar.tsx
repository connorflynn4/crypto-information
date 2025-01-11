import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-black">
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 w-64 bg-white border-r h-full flex flex-col justify-between transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="px-4 py-6">
          <Link to="/" className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-blue-500">
            <FontAwesomeIcon icon={faRocket} size="2x" />
          </Link>

          <ul className="mt-6 space-y-1">
            <li>
              <Link
                to="/"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Homepage
              </Link>
            </li>
            <li>
              <Link
                to="/cryptocurrencies"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Cryptocurrencies
              </Link>
            </li>
            {/* <li>
              <Link
                to="/news"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                News
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
