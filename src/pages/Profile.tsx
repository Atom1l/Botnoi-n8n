import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Mail, Calendar, Shield, Copy, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';

export default function Profile() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [copiedUserId, setCopiedUserId] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);

  const copyToClipboard = (text: string, type: 'userId' | 'apiKey') => {
    navigator.clipboard.writeText(text);
    if (type === 'userId') {
      setCopiedUserId(true);
      setTimeout(() => setCopiedUserId(false), 2000);
    } else {
      setCopiedApiKey(true);
      setTimeout(() => setCopiedApiKey(false), 2000);
    }
  };
  
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      case 'line':
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771z"/>
          </svg>
        );
      default:
        return <Mail className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const maskApiKey = (key: string) => {
    if (!key) return 'ไม่มี API Key';
    return key.substring(0, 8) + '•'.repeat(12) + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navigation />

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Profile Header */}
        <div className="relative group mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300 hidden sm:block"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <div className="relative flex-shrink-0">
                {user?.avatar ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-50 hidden sm:block"></div> 
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-[5px] border-white shadow-2xl"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-white">
                    <User className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 mb-2 sm:mb-3">
                  <h1 className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent truncate max-w-full ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                    {user?.name}
                  </h1>
                </div>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base lg:text-lg">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">{user?.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl sm:rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300 hidden sm:block"></div>
          <div className="relative bg-white/80 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-2 sm:p-3">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                {t('profile.accountInfo')}
              </h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Email Address */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-4 px-3 sm:px-4 lg:px-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl sm:rounded-2xl border border-blue-200/50 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-xl p-2 flex-shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-bold text-gray-900 text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('profile.emailAddress')}
                    </p>
                    
                  </div>
                </div>
                <span className={`text-xs sm:text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium self-start sm:self-auto flex-shrink-0 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                  {t('profile.verified')}
                </span>
              </div>
              
              {/* User ID */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-4 px-3 sm:px-4 lg:px-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl sm:rounded-2xl border border-green-200/50 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl p-2 flex-shrink-0">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-bold text-gray-900 text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('profile.uid')}
                    </p>
                    <p className="text-gray-600 font-mono text-xs sm:text-sm break-all">
                      {user?.userId}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(user?.userId || '', 'userId')}
                  className={`flex items-center space-x-2 text-gray-400 hover:text-blue-600 transition-all duration-300 p-2 rounded-lg hover:bg-white/50 self-start sm:self-auto flex-shrink-0 ${
                    copiedUserId ? 'text-green-600' : ''
                  }`}
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-xs font-medium hidden sm:inline">
                    {copiedUserId ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>
              
              {/* API Key */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-4 px-3 sm:px-4 lg:px-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl sm:rounded-2xl border border-purple-200/50 space-y-3 sm:space-y-0">
                <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl p-2 flex-shrink-0">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-bold text-gray-900 text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('profile.apitoken')}
                    </p>
                    <div className="bg-gray-100 rounded-lg p-2 mt-1">
                      <p className="text-gray-600 font-mono text-xs sm:text-sm break-all">
                        {maskApiKey(user?.apiKey || '')}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(user?.apiKey || '', 'apiKey')}
                  className={`flex items-center space-x-2 text-gray-400 hover:text-blue-600 transition-all duration-300 p-2 rounded-lg hover:bg-white/50 self-start sm:self-auto flex-shrink-0 ${
                    copiedApiKey ? 'text-green-600' : ''
                  }`}
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-xs font-medium hidden sm:inline">
                    {copiedApiKey ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>
              
              {/* Authentication Method */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-4 px-3 sm:px-4 lg:px-6 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 rounded-xl sm:rounded-2xl border border-yellow-200/50 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg sm:rounded-xl p-2 flex-shrink-0">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-bold text-gray-900 text-sm sm:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {t('profile.authMethod')}
                    </p>
                    <p className={`text-gray-600 capitalize text-xs sm:text-sm lg:text-base ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      {user?.provider} {t('profile.signIn')}
                    </p>
                  </div>
                </div>
                <span className={`text-xs sm:text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium self-start sm:self-auto flex-shrink-0 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}