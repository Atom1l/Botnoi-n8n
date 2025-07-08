import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { User, LogOut, Book, ChevronDown } from 'lucide-react';
import LanguageDropdown from './LanguageDropdown';

interface NavigationProps {
  showDocs?: boolean;
  onLoginClick?: () => void;
}

export default function Navigation({ showDocs = false, onLoginClick }: NavigationProps) {
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
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
    navigate('/');
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20 w-full relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/50 to-purple-50/50"></div>
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-lg"></div>
              <img 
                src="/botnoi_voice.svg" 
                alt="Botnoi" 
                className="relative h-24 w-24 transition-transform duration-300"
              />
            </div>
          </button>
          
          {user ? (
            // Logged in navigation
            <div className="flex items-center space-x-6">
              {showDocs && (
                <button
                  onClick={() => navigate('/docs')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/50"
                >
                  <Book className="h-5 w-5" />
                  <span className={language === 'th' ? 'font-thai' : 'font-en'}>{t('nav.documentation')}</span>
                </button>
              )}
              
              {/* Language Dropdown */}
              <LanguageDropdown />
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-300 focus:outline-none px-4 py-2 rounded-lg hover:bg-white/50"
                >
                  {/* Profile Avatar */}
                  <div className="flex items-center space-x-2">
                    {user.avatar ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-50"></div>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="relative w-8 h-8 rounded-full object-cover border-2 border-white shadow-lg"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <span className={`font-medium ${language === 'th' ? 'font-thai' : 'font-en'}`}>{user.name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 py-2 z-[9999]">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-lg mx-1"
                    >
                      <User className="h-4 w-4" />
                      <span className={language === 'th' ? 'font-thai' : 'font-en'}>{t('nav.profile')}</span>
                    </button>
                    <hr className="my-2 border-gray-200/50" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-all duration-300 rounded-lg mx-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className={language === 'th' ? 'font-thai' : 'font-en'}>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : ( 
            // Not logged in navigation
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <LanguageDropdown />
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-75"></div>
                <button
                  onClick={onLoginClick}
                  className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium transform hover:scale-105 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                    {t('nav.signIn')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}