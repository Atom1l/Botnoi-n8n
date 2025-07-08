import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Eye, EyeOff, X, Sparkles, Shield, Zap } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, loginWithGoogle, loginWithLine, loading } = useAuth();
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    onClose();
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    onClose();
  };

  const handleLineLogin = async () => {
    await loginWithLine();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      {/* Background decorative elements - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-sm sm:max-w-md mx-auto max-h-[95vh] overflow-y-auto">
        {/* Modal Container */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl  hidden sm:block"></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-gray-400 hover:text-gray-600 transition-all duration-300 p-2 rounded-full hover:bg-gray-100/50 transform hover:scale-110"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Header Section */}
            <div className="relative px-4 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 text-center">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
              
              {/* Logo */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl transform scale-150 hidden sm:block"></div>
                <div className="relative bg-white rounded-full p-3 sm:p-4 shadow-xl border-4 border-white/80 mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
                  <img 
                    src="/botnoi.svg" 
                    alt="Botnoi" 
                    className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 transition-transform duration-300 transform hover:scale-110"
                  />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="relative">
                <h2 className={`text-xl sm:text-2xl md:text-3xl font-black mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                  {t('landing.welcome')}
                </h2>
                <p className={`text-gray-600 text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                  {t('landing.chooseSignIn')}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="px-4 sm:px-8 pb-4 sm:pb-8">
              <div className="space-y-3 sm:space-y-4">
                
                {/* Google Login Button */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block"></div>
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="relative w-full bg-white border-2 border-gray-200 text-gray-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 disabled:opacity-50 transform hover:scale-[1.02] group"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className={`font-medium text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('landing.continueWithGoogle')}
                    </span>
                  </button>
                </div>

                {/* Line Login Button */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-all duration-300 hidden sm:block"></div>
                  <button
                    onClick={handleLineLogin}
                    disabled={loading}
                    className="relative w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 disabled:opacity-50 transform hover:scale-[1.02] shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" x="0px" y="0px" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 48 48">
                      <path d="M25.12,44.521c-2.114,1.162-2.024-0.549-1.933-1.076c0.054-0.314,0.3-1.787,0.3-1.787c0.07-0.534,0.144-1.36-0.067-1.887 c-0.235-0.58-1.166-0.882-1.85-1.029C11.48,37.415,4.011,30.4,4.011,22.025c0-9.342,9.42-16.943,20.995-16.943S46,12.683,46,22.025 C46,32.517,34.872,39.159,25.12,44.521z M18.369,25.845c0-0.56-0.459-1.015-1.023-1.015h-2.856v-6.678 c0-0.56-0.459-1.015-1.023-1.015c-0.565,0-1.023,0.455-1.023,1.015v7.694c0,0.561,0.459,1.016,1.023,1.016h3.879 C17.91,26.863,18.369,26.406,18.369,25.845z M21.357,18.152c0-0.56-0.459-1.015-1.023-1.015c-0.565,0-1.023,0.455-1.023,1.015 v7.694c0,0.561,0.459,1.016,1.023,1.016c0.565,0,1.023-0.456,1.023-1.016V18.152z M30.697,18.152c0-0.56-0.459-1.015-1.023-1.015 c-0.565,0-1.025,0.455-1.025,1.015v4.761l-3.978-5.369c-0.192-0.254-0.499-0.406-0.818-0.406c-0.11,0-0.219,0.016-0.325,0.052 c-0.419,0.139-0.7,0.526-0.7,0.963v7.694c0,0.561,0.46,1.016,1.025,1.016c0.566,0,1.025-0.456,1.025-1.016v-4.759l3.976,5.369 c0.192,0.254,0.498,0.406,0.818,0.406c0.109,0,0.219-0.018,0.325-0.053c0.42-0.137,0.7-0.524,0.7-0.963V18.152z M36.975,20.984 h-2.856v-1.817h2.856c0.566,0,1.025-0.455,1.025-1.015c0-0.56-0.46-1.015-1.025-1.015h-3.879c-0.565,0-1.023,0.455-1.023,1.015 c0,0.001,0,0.001,0,0.003v3.842v0.001c0,0,0,0,0,0.001v3.845c0,0.561,0.46,1.016,1.023,1.016h3.879 c0.565,0,1.025-0.456,1.025-1.016c0-0.56-0.46-1.015-1.025-1.015h-2.856v-1.817h2.856c0.566,0,1.025-0.455,1.025-1.015 c0-0.561-0.46-1.016-1.025-1.016V20.984z"></path>
                    </svg>
                    <span className={`font-medium text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('landing.continueWithLine')}
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative my-4 sm:my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-3 sm:px-4 text-gray-500 font-medium text-xs sm:text-sm ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('landing.continueWithEmail')}
                    </span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailLogin} className="space-y-3 sm:space-y-5">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className={`block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('landing.emailAddress')}
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-all duration-300 hidden sm:block"></div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="relative w-full px-3 sm:px-4 py-3 sm:py-4 pl-10 sm:pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm sm:text-base"
                        placeholder={t('landing.enterEmail')}
                        required
                      />
                      <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className={`block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('landing.password')}
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-all duration-300 hidden sm:block"></div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="relative w-full px-3 sm:px-4 py-3 sm:py-4 pr-10 sm:pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm sm:text-base"
                        placeholder={t('landing.enterPassword')}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors duration-300 p-1 rounded-lg hover:bg-blue-50"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-all duration-300 hidden sm:block"></div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 transform hover:scale-[1.02] shadow-lg font-semibold flex items-center justify-center space-x-2 text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                          <span>{t('landing.signingIn')}</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span>{t('nav.signIn')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}