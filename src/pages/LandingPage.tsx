import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Zap, Shield, ArrowRight, Mail, Eye, EyeOff, Key } from 'lucide-react';
import Navigation from '../components/Navigation';

export default function LandingPage() {
  const { user, login, loginWithGoogle, loginWithLine, loading } = useAuth();
  const { language, t } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
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
          <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto ${language === 'th' ? 'font-thai' : 'font-en'}`}>
            {t('landing.subtitle')}
          </p>
          <button
            onClick={() => setShowLogin(true)}
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
              <Key className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}">
              {t('landing.login')}
            </h3>
            <p className="text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}">
              {t('landing.logindetails')}
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:scale-105 transition-all duration-300">
              <Zap className="h-8 w-8 text-green-600" /> 
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}">
              {t('landing.getapikey')}
            </h3>
            <p className="text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}">
              {t('landing.getapikeydetails')}
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:scale-105 transition-all duration-300">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}">
              {t('landing.tryit')}
            </h3>
            <p className="text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}">
              dangerouslySetInnerHTML={{ __html: t('landing.tryitdetails') }}
            </p>
          </div>
        </div>

      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <img 
                src="/botnoi.svg" 
                alt="Botnoi" 
                className="h-20 w-20 pb-2 mx-auto mb-4 border border-[5px] border-[#01bffb] rounded-full"
              />
              <h2 className={`text-2xl font-bold text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('landing.welcome')}</h2>
              <p className={`text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('landing.chooseSignIn')}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={loginWithGoogle}
                disabled={loading}
                className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className={language === 'th' ? 'font-thai' : 'font-en'}>{t('landing.continueWithGoogle')}</span>
              </button>

              <button
                onClick={loginWithLine}
                disabled={loading}
                className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                <path d="M25.12,44.521c-2.114,1.162-2.024-0.549-1.933-1.076c0.054-0.314,0.3-1.787,0.3-1.787c0.07-0.534,0.144-1.36-0.067-1.887 c-0.235-0.58-1.166-0.882-1.85-1.029C11.48,37.415,4.011,30.4,4.011,22.025c0-9.342,9.42-16.943,20.995-16.943S46,12.683,46,22.025 C46,32.517,34.872,39.159,25.12,44.521z M18.369,25.845c0-0.56-0.459-1.015-1.023-1.015h-2.856v-6.678 c0-0.56-0.459-1.015-1.023-1.015c-0.565,0-1.023,0.455-1.023,1.015v7.694c0,0.561,0.459,1.016,1.023,1.016h3.879 C17.91,26.863,18.369,26.406,18.369,25.845z M21.357,18.152c0-0.56-0.459-1.015-1.023-1.015c-0.565,0-1.023,0.455-1.023,1.015 v7.694c0,0.561,0.459,1.016,1.023,1.016c0.565,0,1.023-0.456,1.023-1.016V18.152z M30.697,18.152c0-0.56-0.459-1.015-1.023-1.015 c-0.565,0-1.025,0.455-1.025,1.015v4.761l-3.978-5.369c-0.192-0.254-0.499-0.406-0.818-0.406c-0.11,0-0.219,0.016-0.325,0.052 c-0.419,0.139-0.7,0.526-0.7,0.963v7.694c0,0.561,0.46,1.016,1.025,1.016c0.566,0,1.025-0.456,1.025-1.016v-4.759l3.976,5.369 c0.192,0.254,0.498,0.406,0.818,0.406c0.109,0,0.219-0.018,0.325-0.053c0.42-0.137,0.7-0.524,0.7-0.963V18.152z M36.975,20.984 h-2.856v-1.817h2.856c0.566,0,1.025-0.455,1.025-1.015c0-0.56-0.46-1.015-1.025-1.015h-3.879c-0.565,0-1.023,0.455-1.023,1.015 c0,0.001,0,0.001,0,0.003v3.842v0.001c0,0,0,0,0,0.001v3.845c0,0.561,0.46,1.016,1.023,1.016h3.879 c0.565,0,1.025-0.456,1.025-1.016c0-0.56-0.46-1.015-1.025-1.015h-2.856v-1.817h2.856c0.566,0,1.025-0.455,1.025-1.015 c0-0.561-0.46-1.016-1.025-1.016V20.984z"></path>
                </svg>
                <span className={language === 'th' ? 'font-thai' : 'font-en'}>{t('landing.continueWithLine')}</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 bg-white text-gray-500 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('landing.continueWithEmail')}</span>
                </div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                    {t('landing.emailAddress')}
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                      placeholder={t('landing.enterEmail')}
                      required
                    />
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                    {t('landing.password')}
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                      placeholder={t('landing.enterPassword')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 ${language === 'th' ? 'font-thai' : 'font-en'}`}
                >
                  {loading ? t('landing.signingIn') : t('nav.signIn')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}