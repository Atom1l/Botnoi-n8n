import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Mail, Calendar, Shield, Edit2, Save, X, Copy } from 'lucide-react';
import Navigation from '../components/Navigation';

export default function Profile() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [copiedUserId, setCopiedUserId] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);

  const handleSave = () => {
    // In a real app, you'd update the user data here
    setIsEditing(false);
  };

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
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      case 'line':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771z"/>
          </svg>
        );
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                {getProviderIcon(user?.provider || 'email')}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className={`text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-600 focus:outline-none ${language === 'th' ? 'font-thai' : 'font-en'}`} 
                  />
                ) : (
                  <h1 className={`text-2xl font-bold text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{user?.name}</h1>
                )}
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {isEditing ? <Save className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
                </button>
                {isEditing && (
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(user?.name || '');
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <p className="text-gray-600 flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('profile.accountInfo')}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className={`font-medium text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('profile.emailAddress')}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <span className={`text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('profile.verified')}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className={`font-medium text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('profile.uid')}</p>
                  <p className="text-sm text-gray-600 font-mono">{user?.userId}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(user?.userId || '', 'userId')}
                className={`flex items-center space-x-1 text-gray-400 hover:text-blue-600 transition-colors ${
                  copiedUserId ? 'text-green-600' : ''
                }`}
              >
                <Copy className="h-4 w-4" />
                <span className="text-xs">{copiedUserId ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className={`font-medium text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('profile.apitoken')}</p>
                  <p className="text-sm text-gray-600 font-mono">
                    {user?.apiKey ? user.apiKey.substring(0, 8) + '•'.repeat(20) + user.apiKey.substring(user.apiKey.length - 4) : 'ไม่มี API Key'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(user?.apiKey || '', 'apiKey')}
                  className={`flex items-center space-x-1 text-gray-400 hover:text-blue-600 transition-colors ${
                    copiedApiKey ? 'text-green-600' : ''
                  }`}
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-xs">{copiedApiKey ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className={`font-medium text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('profile.authMethod')}</p>
                  <p className={`text-sm text-gray-600 capitalize ${language === 'th' ? 'font-thai' : 'font-en'}`}>{user?.provider} {t('profile.signIn')}</p>
                </div>
              </div>
              <span className={`text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.active')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}