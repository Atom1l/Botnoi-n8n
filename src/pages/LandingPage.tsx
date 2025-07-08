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
    <div className="min-h-screen md:h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navigation onLoginClick={() => setShowLogin(true)} />
      
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] px-4 sm:px-6 lg:px-8 md:overflow-hidden py-8 md:py-0">
        <div className="text-center mb-8 md:mb-8 max-w-5xl">
          {/* Logo with enhanced styling */}
          <div className="relative mb-6 md:mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl transform scale-150"></div>
            <img 
              src="/botnoi.svg" 
              alt="Botnoi" 
              className="relative h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 mb-4 md:mb-4 mx-auto border-4 border-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Title with gradient text */}
          <h1 className="font-en text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            {t('landing.title')}
            <span className="block text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Voice API
            </span>
          </h1>

          {/* Subtitle with better typography */}
          <p className={`text-base md:text-base lg:text-lg text-gray-700 mb-6 md:mb-6 max-w-4xl mx-auto leading-relaxed ${language === 'th' ? 'font-thai' : 'font-en'}`}
            dangerouslySetInnerHTML={{ __html: t('landing.subtitle') }}>
          </p>

          {/* Enhanced CTA button */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg md:rounded-xl blur-lg opacity-75 transform scale-105"></div>
            <button
              onClick={handleGetStarted}
              className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-lg md:rounded-xl text-lg md:text-lg lg:text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl group ${language === 'th' ? 'font-thai' : 'font-en'}`}
            >
              <span className="flex items-center">
                {t('landing.getStarted')}
                <ArrowRight className="ml-2 h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Enhanced Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 max-w-5xl w-full">
          {/* Card 1 - Login */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl md:rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-4 lg:p-6 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50">
              <div className="relative mb-4 md:mb-3 lg:mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg md:rounded-xl w-16 h-16 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <LogIn className="h-8 w-8 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl md:text-lg lg:text-xl font-bold text-gray-900 mb-3 md:mb-2 lg:mb-3 min-h-[2rem] md:min-h-[2rem] lg:min-h-[2.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}
                dangerouslySetInnerHTML={{ __html: t('landing.login') }}>
              </h3>
              <p className={`text-gray-600 text-base md:text-sm lg:text-base min-h-[2.5rem] md:min-h-[2rem] lg:min-h-[2.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}
                dangerouslySetInnerHTML={{ __html: t('landing.logindetails') }}>
              </p>
            </div>
          </div>

          {/* Card 2 - API Key */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl md:rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-4 lg:p-6 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50">
              <div className="relative mb-4 md:mb-3 lg:mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg md:rounded-xl w-16 h-16 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <Key className="h-8 w-8 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl md:text-lg lg:text-xl font-bold text-gray-900 mb-3 md:mb-2 lg:mb-3 min-h-[2rem] md:min-h-[2rem] lg:min-h-[2.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                {t('landing.getapikey')}
              </h3>
              <p className={`text-gray-600 text-base md:text-sm lg:text-base min-h-[2.5rem] md:min-h-[2rem] lg:min-h-[2.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`} 
                dangerouslySetInnerHTML={{ __html: t('landing.getapikeydetails') }}>
              </p>
            </div>
          </div>

          {/* Card 3 - Try It */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl md:rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-4 lg:p-6 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50">
              <div className="relative mb-4 md:mb-3 lg:mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg md:rounded-xl w-16 h-16 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <AudioLines className="h-8 w-8 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl md:text-lg lg:text-xl font-bold text-gray-900 mb-3 md:mb-2 lg:mb-3 min-h-[2rem] md:min-h-[2rem] lg:min-h-[2.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                {t('landing.tryit')}
              </h3>
              <p className={`text-gray-600 text-base md:text-sm lg:text-base min-h-[2.5rem] md:min-h-[2rem] lg:min-h-[2.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`} 
                dangerouslySetInnerHTML={{ __html: t('landing.tryitdetails') }}>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative element - Hidden on mobile to save space */}
        <div className="mt-8 md:mt-8 lg:mt-12 flex items-center justify-center space-x-2 opacity-60">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}