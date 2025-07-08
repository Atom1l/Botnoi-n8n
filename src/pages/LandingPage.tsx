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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navigation onLoginClick={() => setShowLogin(true)} />
      
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-10 mb-20 max-w-5xl">
          {/* Logo with enhanced styling */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl transform scale-150"></div>
            <img 
              src="/botnoi.svg" 
              alt="Botnoi" 
              className="relative h-40 w-40 mb-6 mx-auto border-4 border-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 bg-white/80 backdrop-blur-sm"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Title with gradient text */}
          <h1 className="font-en text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            {t('landing.title')}
            <span className="block text-3xl md:text-4xl font-semibold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Voice API
            </span>
          </h1>

          {/* Subtitle with better typography */}
          <p className={`text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed ${language === 'th' ? 'font-thai' : 'font-en'}`}
            dangerouslySetInnerHTML={{ __html: t('landing.subtitle') }}>
          </p>

          {/* Enhanced CTA button */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 transform scale-105"></div>
            <button
              onClick={handleGetStarted}
              className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl group ${language === 'th' ? 'font-thai' : 'font-en'}`}
            >
              <span className="flex items-center">
                {t('landing.getStarted')}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Enhanced Features Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Card 1 - Login */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <LogIn className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 min-h-[3.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}
                dangerouslySetInnerHTML={{ __html: t('landing.login') }}>
              </h3>
              <p className={`text-gray-600 text-lg min-h-[3rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}
                dangerouslySetInnerHTML={{ __html: t('landing.logindetails') }}>
              </p>
            </div>
          </div>

          {/* Card 2 - API Key */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <Key className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 min-h-[3.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                {t('landing.getapikey')}
              </h3>
              <p className={`text-gray-600 text-lg min-h-[3rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`} 
                dangerouslySetInnerHTML={{ __html: t('landing.getapikeydetails') }}>
              </p>
            </div>
          </div>

          {/* Card 3 - Try It */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 text-center hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 shadow-xl border border-white/50">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <AudioLines className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 min-h-[3.5rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                {t('landing.tryit')}
              </h3>
              <p className={`text-gray-600 text-lg min-h-[3rem] flex items-center justify-center ${language === 'th' ? 'font-thai' : 'font-en'}`} 
                dangerouslySetInnerHTML={{ __html: t('landing.tryitdetails') }}>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 flex items-center justify-center space-x-2 opacity-60">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}