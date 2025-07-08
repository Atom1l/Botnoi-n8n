import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Key, LogIn, AudioLines, Sparkles, Zap, Shield } from 'lucide-react';
import Navigation from '../components/Navigation';
import LoginModal from '../components/LoginModal';

export default function LandingPage() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />; 
  }

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-x-hidden">
      {/* Background decorative elements - optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <Navigation onLoginClick={() => setShowLogin(true)} />
      
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center border border-[3px] border-red sm:mb-12 max-w-6xl w-full">
          {/* Logo with enhanced styling */}
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl sm:blur-2xl transform scale-125 sm:scale-150"></div>
            <img 
              src="/botnoi.svg" 
              alt="Botnoi" 
              className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 mb-4 sm:mb-6 mx-auto border-4 border-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Title with gradient text */}
          <h1 className="font-en text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight px-2">
            {t('landing.title')}
            <span className="block text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Voice API
            </span>
          </h1>

          {/* Subtitle with better typography */}
          <div className={`text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2 ${language === 'th' ? 'font-thai' : 'font-en'}`}
            dangerouslySetInnerHTML={{ __html: t('landing.subtitle') }}>
          </div> 

          {/* Enhanced CTA button */}
          <div className="relative inline-block mb-8 sm:mb-12 border border-red-200">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl blur-lg opacity-75 transform scale-105"></div>
            <button
              onClick={handleGetStarted}
              className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-lg sm:rounded-xl text-base sm:text-lg lg:text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl group ${language === 'th' ? 'font-thai' : 'font-en'}`}
            >
              <span className="flex items-center">
                {t('landing.getStarted')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Enhanced Features Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl w-full px-2 sm:px-0">
          {/* Card 1 - Login */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50 h-full">
              <div className="relative mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <LogIn className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 ${language === 'th' ? 'font-thai' : 'font-en'}`}
                dangerouslySetInnerHTML={{ __html: t('landing.login') }}>
              </h3>
              <p className={`text-gray-600 text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}
                dangerouslySetInnerHTML={{ __html: t('landing.logindetails') }}>
              </p>
            </div>
          </div>

          {/* Card 2 - API Key */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50 h-full">
              <div className="relative mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg sm:rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <Key className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                {t('landing.getapikey')}
              </h3>
              <p className={`text-gray-600 text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`} 
                dangerouslySetInnerHTML={{ __html: t('landing.getapikeydetails') }}>
              </p>
            </div>
          </div>

          {/* Card 3 - Try It */}
          <div className="group relative sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50 h-full">
              <div className="relative mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <AudioLines className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                {t('landing.tryit')}
              </h3>
              <p className={`text-gray-600 text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`} 
                dangerouslySetInnerHTML={{ __html: t('landing.tryitdetails') }}>
              </p>
            </div>
          </div>
        </div>
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}