import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
  isPsychologist: boolean;
}

const NavBar: React.FC<NavbarProps> = ({ isLoggedIn, isPsychologist }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold">MyApp</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/home" className="px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <Link to="/articles" className="px-3 py-2 rounded-md text-sm font-medium">Articles</Link>
                <Link to="/psychologists" className="px-3 py-2 rounded-md text-sm font-medium">Psychologists</Link>
                <Link to="/chatbot" className="px-3 py-2 rounded-md text-sm font-medium">Chatbot</Link>
                {!isLoggedIn && (
                  <>
                    <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                    <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                  </>
                )}
                {isLoggedIn && isPsychologist && (
                  <Link to="/write" className="px-3 py-2 rounded-md text-sm font-medium">Write</Link>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium">About</Link>
          <Link to="/articles" className="block px-3 py-2 rounded-md text-base font-medium">Articles</Link>
          <Link to="/psychologists" className="block px-3 py-2 rounded-md text-base font-medium">Psychologists</Link>
          <Link to="/chatbot" className="block px-3 py-2 rounded-md text-base font-medium">Chatbot</Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium">Login</Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium">Register</Link>
            </>
          )}
          {isLoggedIn && isPsychologist && (
            <Link to="/write" className="block px-3 py-2 rounded-md text-base font-medium">Write</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
