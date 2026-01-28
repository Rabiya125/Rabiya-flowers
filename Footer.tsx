import React from 'react';
import { BUSINESS_NAME, BUSINESS_PHONE } from '../constants';

interface FooterProps {
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Footer: React.FC<FooterProps> = ({ isAdmin, onLogin, onLogout }) => {
  return (
    <footer className="bg-white border-t border-gray-200 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <span className="text-2xl font-serif text-primary font-bold">{BUSINESS_NAME}</span>
        </div>
        <div className="mt-8 flex justify-center space-x-6">
          <p className="text-center text-base text-gray-500">
            Bringing nature's beauty to your special moments.
          </p>
        </div>
        <div className="mt-4 flex justify-center">
            <a href={`tel:${BUSINESS_PHONE}`} className="text-lg font-medium text-gray-900 hover:text-primary transition">
                {BUSINESS_PHONE}
            </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
        </p>
        
        <div className="mt-8 text-center">
          {isAdmin ? (
            <button 
              onClick={onLogout}
              className="text-xs text-red-400 hover:text-red-600 transition"
            >
              [Owner Logout]
            </button>
          ) : (
            <button 
              onClick={onLogin}
              className="text-xs text-gray-300 hover:text-primary transition"
            >
              Owner Login
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;