import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';

const Header = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <nav className="flex items-center justify-between px-6 py-4 mb-5 bg-black">
      <div className="flex items-center">
        <Link to="/">
          <div className="text-lg font-bold text-purple-300 uppercase">
            ClerkApp
          </div>
        </Link>
      </div>
      <div className="flex items-center text-purple-200">
        {!user && (
          <>
            <Link
              to="/sign-in"
              className="text-purple-300 hover:text-purple-400 mr-4"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="text-purple-300 hover:text-purple-400 mr-4"
            >
              Sign Up
            </Link>
          </>
        )}
        {user && (
          <>
            <Link
              to="/profile"
              className="text-purple-300 hover:text-purple-400 mr-4"
            >
              Profile
            </Link>
            <button
              onClick={() => signOut()}
              className="text-purple-300 hover:text-purple-400"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export { Header as default };