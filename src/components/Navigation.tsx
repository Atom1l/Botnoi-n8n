import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Book, ChevronDown } from 'lucide-react';

interface NavigationProps {
  showDocs?: boolean;
  onLoginClick?: () => void;
}

export default function Navigation({ showDocs = false, onLoginClick }: NavigationProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={handleLogoClick}
            className={`flex items-center space-x-3 ${user ? 'cursor-pointer hover:opacity-80 transition-opacity' : 'cursor-default'}`}
            disabled={!user}
          >
            <img 
              src="/botnoi.svg" 
              alt="Botnoi" 
              className="h-16 w-16"
            />
          </button>
          
          {user ? (
            // Logged in navigation
            <div className="flex items-center space-x-6">
              {showDocs && (
                <button
                  onClick={() => navigate('/docs')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Book className="h-5 w-5" />
                  <span>Documentation</span>
                </button>
              )}
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none"
                >
                  {/* Profile Avatar */}
                  <div className="flex items-center space-x-2">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    <span className="font-medium">{user.name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Not logged in navigation
            <div className="flex items-center space-x-4">
              <button
                onClick={onLoginClick}
                className="bg-[#212121] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}