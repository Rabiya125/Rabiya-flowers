import React, { useState } from 'react';
import { BUSINESS_NAME, BUSINESS_PHONE } from '../constants';

interface HeaderProps {
  onOpenUpload: () => void;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenUpload, isAdmin, onLogin, onLogout, onOpenSettings }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-serif text-2xl font-bold text-primary">
              {BUSINESS_NAME}
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#gallery" className="text-gray-600 hover:text-primary transition">Gallery</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition">About Us</a>
            
            {/* Owner Actions */}
            {isAdmin && (
              <>
                <button 
                  onClick={onOpenUpload}
                  className="text-sm font-medium text-white bg-secondary hover:bg-green-600 px-4 py-1 rounded-full transition shadow-sm"
                >
                  + Add Photo
                </button>
                <button
                  onClick={onOpenSettings}
                  className="text-sm font-medium text-gray-500 hover:text-primary underline"
                >
                  Settings
                </button>
              </>
            )}

            {/* Login/Logout Lock Icon */}
            <button
              onClick={isAdmin ? onLogout : onLogin}
              className="text-gray-400 hover:text-primary transition p-2"
              title={isAdmin ? "Owner Logout" : "Owner Login"}
            >
              {isAdmin ? (
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </button>

            <a href={`tel:${BUSINESS_PHONE}`} className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition shadow-md">
              Call {BUSINESS_PHONE}
            </a>
          </div>

          <div className="md:hidden flex items-center space-x-4">
             {/* Mobile Login/Logout */}
             <button
              onClick={isAdmin ? onLogout : onLogin}
              className="text-gray-400 hover:text-primary"
            >
               {isAdmin ? (
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-600 hover:text-primary focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Gallery</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">About Us</a>
            
            {isAdmin && (
              <>
                <button 
                  onClick={() => {
                    onOpenUpload();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-secondary hover:bg-green-600"
                >
                  + Owner Add Photo
                </button>
                <button 
                  onClick={() => {
                    onOpenSettings();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                >
                  Admin Settings
                </button>
              </>
            )}

            <button 
              onClick={() => {
                isAdmin ? onLogout() : onLogin();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {isAdmin ? "Logout" : "Owner Login"}
            </button>

            <a href={`tel:${BUSINESS_PHONE}`} className="block w-full text-center mt-4 bg-primary text-white px-4 py-3 rounded-md font-bold">
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;