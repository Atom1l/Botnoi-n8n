import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageDropdown() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang: 'en' | 'th') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all duration-300 focus:outline-none px-4 py-2 rounded-lg hover:bg-white/50"
      >
        <Globe className="h-5 w-5" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'EN' : 'TH'}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Language Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 py-2 z-[9999]">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`flex items-center space-x-2 w-full px-0 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-lg mx-1 ${
              language === 'en' ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <span className="font-en">🇺🇸</span>
            <span className="font-en">{t('language.english')}</span>
          </button>
          <button
            onClick={() => handleLanguageChange('th')}
            className={`flex items-center space-x-2 w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-lg mx-1 ${
              language === 'th' ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <span className="font-thai">🇹🇭</span>
            <span className="font-thai">{t('language.thai')}</span>
          </button>
        </div>
      )}
    </div>
  );
}