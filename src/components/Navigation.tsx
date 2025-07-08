import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { User, LogOut, Book, ChevronDown, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 w-full sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-105 rounded-lg p-1 sm:p-2"
          >
            <img 
              src="/botnoi_voice.svg" 
              alt="Botnoi" 
              className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 transition-transform duration-300"
            />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {user ? (
              // Logged in navigation
              <>
                {showDocs && (
                  <button
                    onClick={() => navigate('/docs')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
                  >
                    <Book className="h-5 w-5" />
                    <span className={`hidden lg:block ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('nav.documentation')}</span>
                  </button>
                )}
                
                {/* Language Dropdown */}
                <LanguageDropdown />
                
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 lg:space-x-3 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none px-3 py-2 rounded-lg hover:bg-blue-50"
                  >
                    {/* Profile Avatar */}
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 lg:w-9 lg:h-9 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
                        <User className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                      </div>
                    )}
                    <span className={`font-medium text-sm lg:text-base hidden lg:block ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {user.name.length > 12 ? user.name.substring(0, 12) + '...' : user.name}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 py-2 z-50">
                      <button
                        onClick={handleProfileClick}
                        className={`flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors ${language === 'th' ? 'font-thai' : 'font-en'}`}
                      >
                        <User className="h-4 w-4" />
                        <span>{t('nav.profile')}</span>
                      </button>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors ${language === 'th' ? 'font-thai' : 'font-en'}`}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('nav.logout')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : ( 
              // Not logged in navigation
              <>
                {/* Language Dropdown */}
                <LanguageDropdown />
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-sm opacity-75"></div>
                  <button
                    onClick={handleLoginClick}
                    className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium transform hover:scale-105 text-sm lg:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('nav.signIn')}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Language Dropdown for Mobile */}
            <LanguageDropdown />
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-xl z-40"
          >
            <div className="px-4 py-4 space-y-3">
              {user ? (
                // Logged in mobile menu
                <>
                  {/* User Info */}
                  <div className="flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className={`font-semibold text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  {showDocs && (
                    <button
                      onClick={() => {
                        navigate('/docs');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors rounded-lg ${language === 'th' ? 'font-thai' : 'font-en'}`}
                    >
                      <Book className="h-5 w-5" />
                      <span>{t('nav.documentation')}</span>
                    </button>
                  )}
                  
                  <button
                    onClick={handleProfileClick}
                    className={`flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors rounded-lg ${language === 'th' ? 'font-thai' : 'font-en'}`}
                  >
                    <User className="h-5 w-5" />
                    <span>{t('nav.profile')}</span>
                  </button>
                  
                  <hr className="border-gray-200" />
                  
                  <button
                    onClick={handleLogout}
                    className={`flex items-center space-x-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors rounded-lg ${language === 'th' ? 'font-thai' : 'font-en'}`}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              ) : (
                // Not logged in mobile menu
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-sm opacity-75"></div>
                    <button
                      onClick={handleLoginClick}
                      className={`relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-center ${language === 'th' ? 'font-thai' : 'font-en'}`}
                    >
                      {t('nav.signIn')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}