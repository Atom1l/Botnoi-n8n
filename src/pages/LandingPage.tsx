import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Key, LogIn, AudioLines } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      <Navigation onLoginClick={() => setShowLogin(true)} />
      
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-5.05rem)] px-4 sm:px-6 lg:px-8 border ">
        <div className="text-center mt-10 mb-16 max-w-4xl">
          <img 
              src="/botnoi.svg" 
              alt="Botnoi" 
              className="h-36 w-36 mb-8 pb-2 mx-auto border border-[7px] border-[#01bffb] rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
          />
          <h1 className={`font-en text-4xl md:text-6xl font-bold text-gray-900 mb-6`}>
            {t('landing.title')} 
          </h1>
          <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto ${language === 'th' ? 'font-thai' : 'font-en'}`}
            dangerouslySetInnerHTML={{ __html: t('landing.subtitle') }}>
          </p>
          <button
            onClick={handleGetStarted}
            className={`bg-[#01bffb] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#05aee3] transition-all duration-200 transform hover:scale-105 shadow-md ${language === 'th' ? 'font-thai' : 'font-en'}`}
          >
            {t('landing.getStarted')}
            <ArrowRight className="ml-2 h-5 w-5 inline" />
          </button>
        </div>
        
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:scale-105 transition-all duration-300">
              <LogIn className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}"
              dangerouslySetInnerHTML={{ __html: t('landing.login') }}>
            </h3>
            <p className="text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}"
              dangerouslySetInnerHTML={{ __html: t('landing.logindetails') }}>
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:scale-105 transition-all duration-300">
              <Key className="h-8 w-8 text-green-600" /> 
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}">
              {t('landing.getapikey')}
            </h3>
            <p className="text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}" dangerouslySetInnerHTML={{ __html: t('landing.getapikeydetails') }}>
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:scale-105 transition-all duration-300">
              <AudioLines className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}">
              {t('landing.tryit')}
            </h3>
            <p className="text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}">
            </p>
            <p className="text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}" 
              dangerouslySetInnerHTML={{ __html: t('landing.tryitdetails') }}>
            </p>
          </div>
        </div>

      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}