import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, isPsychologist, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-purple-300 text-black fixed w-full top-0 z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-4xl font-bold" onClick={closeMenu}>zoe afya</Link>
          </div>
          <div className="hidden md:flex justify-center flex-grow">
            <div className="flex items-baseline space-x-4">
              <Link to="/home" className="px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Home</Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>About</Link>
              <Link to="/articles" className="px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Articles</Link>
              <Link to="/psychologists" className="px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Psychologists</Link>
              <Link to="/chatbot" className="px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Safe space</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Login/Register</Link>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Profile</Link>
              </>
            ) : (
              <>
                {isPsychologist && (
                  <Link to="/articles/new" className="px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Write</Link>
                )}
                <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Profile</Link>
                <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              </>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-300 focus:ring-black"
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

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-purple-300`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>About</Link>
          <Link to="/articles" className="block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>Articles</Link>
          <Link to="/psychologists" className="block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>Psychologists</Link>
          <Link to="/chatbot" className="block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>Safe space</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>Login</Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>Register</Link>
            </>
          ) : (
            <>
              {isPsychologist && (
                <Link to="/articles/new" className="block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>Write</Link>
              )}
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>Profile</Link>
              <button onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
