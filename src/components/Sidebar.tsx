import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, useClerk, useAuth } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="w-64 bg-white border-e h-full flex flex-col justify-between">
      <div className="px-4 py-6">
        <div className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-blue-500">
          <FontAwesomeIcon icon={faRocket} size="2x" />
        </div>

        <ul className="mt-6 space-y-1">
          <li>
            <Link
              to="/homepage"
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

          <li>
            <Link
              to="/news"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              News
            </Link>
          </li>
        </ul>
      </div>

      {isSignedIn ? (
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt={user?.fullName || 'Placeholder'}
              src={user?.imageUrl || 'https://via.placeholder.com/40'}
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">{user?.fullName || 'John Doe'}</strong>
                <span>{user?.primaryEmailAddress?.emailAddress || 'john.doe@example.com'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="block w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 text-center"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <button
            onClick={() => navigate('/login')}
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 text-center"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
