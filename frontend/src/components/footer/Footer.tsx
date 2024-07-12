import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaDiscord, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-300 text-gray-800 font-poppins fixed bottom-0 left-0 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-2">
    <footer className="bg-purple-300 text-gray-800 font-poppins sticky bottom-0 h-fit">
      <div className="min-w-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-base font-semibold">© 2024 Zoe Afya. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 mt-2 md:mt-0">
            {/* <Link to="/privacy-policy" className="text-gray-800 hover:text-gray-600">Privacy Policy</Link> */}
            <Link to="/about" className="text-gray-800 hover:text-gray-600">About us</Link>
            {/* <Link to="/contact-us" className="text-gray-800 hover:text-gray-600">Contact Us</Link> */}
          </div>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <a href="https://www.instagram.com" className="text-gray-800 hover:text-gray-600">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" className="text-gray-800 hover:text-gray-600">
              <FaTwitter size={20} />
            </a>
            <a href="https://discord.com" className="text-gray-800 hover:text-gray-600">
              <FaDiscord size={20} />
            </a>
            <a href="https://www.facebook.com" className="text-gray-800 hover:text-gray-600">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
