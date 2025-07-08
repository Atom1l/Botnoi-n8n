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
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navigation onLoginClick={() => setShowLogin(true)} />
      
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-5rem)] px-4 sm:px-6 lg:px-8 md:overflow-hidden">
        <div className="text-center mb-8 md:mb-12 max-w-5xl">
          {/* Logo with enhanced styling */}
          <div className="relative mb-6 md:mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl transform scale-150"></div>
            <img 
              src="/botnoi.svg" 
              alt="Botnoi" 
              className="relative h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 mb-4 md:mb-6 mx-auto border-4 border-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Title with gradient text */}
          <h1 className="font-en text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            {t('landing.title')}
            <span className="block text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold mt-1 md:mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Voice API
            </span>
          </h1>

          {/* Subtitle with better typography */}
          <p className={`text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed ${language === 'th' ? 'font-thai' : 'font-en'}`}
            dangerouslySetInnerHTML={{ __html: t('landing.subtitle') }}>
          </p>

          {/* Enhanced CTA button */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl md:rounded-2xl blur-lg opacity-75 transform scale-105"></div>
            <button
              onClick={handleGetStarted}
              className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl group ${language === 'th' ? 'font-thai' : 'font-en'}`}
            >
              <span className="flex items-center">
                {t('landing.getStarted')}
                <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Enhanced Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl w-full">
          {/* Card 1 - Login */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl md:rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50">
              <div className="relative mb-3 md:mb-4 lg:mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl md:rounded-2xl w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <LogIn className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
                </div>
              </div>
              <h3 className={`text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4 min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}
                dangerouslySetInnerHTML={{ __html: t('landing.login') }}>
              </h3>
              <p className={`text-gray-600 text-sm md:text-base lg:text-lg min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}
                dangerouslySetInnerHTML={{ __html: t('landing.logindetails') }}>
              </p>
            </div>
          </div>

          {/* Card 2 - API Key */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl md:rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50">
              <div className="relative mb-3 md:mb-4 lg:mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl md:rounded-2xl w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <Key className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
                </div>
              </div>
              <h3 className={`text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4 min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                {t('landing.getapikey')}
              </h3>
              <p className={`text-gray-600 text-sm md:text-base lg:text-lg min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`} 
                dangerouslySetInnerHTML={{ __html: t('landing.getapikeydetails') }}>
              </p>
            </div>
          </div>

          {/* Card 3 - Try It */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl md:rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50">
              <div className="relative mb-3 md:mb-4 lg:mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl md:rounded-2xl w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <AudioLines className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
                </div>
              </div>
              <h3 className={`text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4 min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                {t('landing.tryit')}
              </h3>
              <p className={`text-gray-600 text-sm md:text-base lg:text-lg min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`} 
                dangerouslySetInnerHTML={{ __html: t('landing.tryitdetails') }}>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative element - Hidden on mobile to save space */}
        <div className="mt-6 md:mt-12 lg:mt-20 flex items-center justify-center space-x-2 opacity-60 hidden md:flex">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}