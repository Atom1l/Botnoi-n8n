import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Copy, Eye, EyeOff, RefreshCw, Code, CheckCircle, ExternalLink, Settings, Zap, Book, Key, Sparkles, Shield } from 'lucide-react';
import Navigation from '../components/Navigation';
import LoginModal from '../components/LoginModal';

interface ApiKey {
  id: string;
  key: string;
  created: Date;
  lastUsed: Date | null;
  requests: number;
  status: 'active' | 'inactive';
}

export default function Dashboard() {
  const { user, updateApiKey } = useAuth();
  const { language, t } = useLanguage();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [apiKey, setApiKey] = useState<ApiKey>(() => ({
    id: user?.id || '1',
    key: user?.apiKey || 'ak_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    created: new Date('2024-01-15'),
    lastUsed: new Date('2024-01-20'),
    requests: 1247,
    status: 'active'
  }));
  const [showKey, setShowKey] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const regenerateApiKey = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setIsRegenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newKey: ApiKey = {
      id: Date.now().toString(),
      key: 'ak_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      created: new Date(),
      lastUsed: null,
      requests: 0,
      status: 'active'
    };
    setApiKey(newKey);
    updateApiKey(newKey.key);
    setIsRegenerating(false);
    setShowKey(true);
  };

  const copyToClipboard = (text: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    navigator.clipboard.writeText(text);
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const maskKey = (key: string) => {
    return key.substring(0, 8) + '•'.repeat(20) + key.substring(key.length - 4);
  };

  const handleShowKey = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowKey(!showKey);
  };

  const codeExamples = {
    httpRequest: `{
  "method": "GET",
  "url": "https://voice.botnoi.ai/tts/api-developer-v2/voices",
  "headers": {
    "Authorization": "Bearer ${user ? apiKey.key : 'YOUR_API_KEY'}",
    "Content-Type": "application/json"
  }
}`,
    
    webhook: `{
  "url": "https://voice.botnoi.ai/tts/api-developer-v2/synthesize",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer ${user ? apiKey.key : 'YOUR_API_KEY'}",
    "Content-Type": "application/json"
  },
  "body": {
    "text": "{{$json.message}}",
    "voice": "th-TH-PremwadeeNeural",
    "speed": 1.0
  }
}`,

    workflow: `{
  "nodes": [
    {
      "name": "TTS Request",
      "type": "n8n-nodes-base.httpRequest",
      "position": [250, 300],
      "parameters": {
        "url": "https://voice.botnoi.ai/tts/api-developer-v2/synthesize",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer ${user ? apiKey.key : 'YOUR_API_KEY'}"
        },
        "body": {
          "text": "Hello World",
          "voice": "th-TH-PremwadeeNeural"
        }
      }
    }
  ]
}`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navigation onLoginClick={() => setShowLoginModal(true)} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent ${language === 'th' ? 'font-thai' : 'font-en'}`}>
            {user ? `${t('dashboard.welcomeBack')}, ${user.name}!` : 'Voice API Dashboard'}
          </h1>
          <p className={`text-xl text-gray-700 max-w-2xl mx-auto ${language === 'th' ? 'font-thai' : 'font-en'}`}>
            {user ? t('dashboard.subtitle') : 'Explore our Voice API features and get started with text-to-speech integration'}
          </p>
        </div>

        {/* API Key Section */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
            <div className="px-8 py-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-3">
                    <Key className="h-6 w-6 text-white" />
                  </div>
                  <h2 className={`text-2xl font-bold text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.yourApiKey')}</h2>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-75"></div>
                  <button
                    onClick={regenerateApiKey}
                    disabled={isRegenerating}
                    className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 transform hover:scale-105 shadow-lg ${language === 'th' ? 'font-thai' : 'font-en'}`}
                  >
                    <RefreshCw className={`h-5 w-5 ${isRegenerating ? 'animate-spin' : ''}`} />
                    <span>{isRegenerating ? t('dashboard.regenerating') : t('dashboard.regenerate')}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8">
              {!user && (
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <p className={`text-blue-800 font-medium ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                      <strong>{t('dashboard.note')}:</strong> {t('dashboard.notedetails')}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="border border-gray-200/50 rounded-2xl p-6 bg-gradient-to-r from-gray-50/50 to-white/50 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${user ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' : 'bg-gray-100 text-gray-600'} ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                    {user ? apiKey.status : 'inactive'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 mb-6">
                  <code className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl text-sm font-mono flex-1 border border-gray-200/50 shadow-sm">
                    {user ? (showKey ? apiKey.key : maskKey(apiKey.key)) : '••••••••••••••••••••••••••••••••••••••••'}
                  </code>
                  <button
                    onClick={handleShowKey}
                    className="text-gray-400 hover:text-blue-600 p-3 rounded-xl hover:bg-white/50 transition-all duration-300"
                  >
                    {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(user ? apiKey.key : '')}
                    className="text-gray-400 hover:text-blue-600 p-3 rounded-xl hover:bg-white/50 transition-all duration-300"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                {user && (
                  <div className={`flex items-center space-x-6 text-sm text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                    <span>{t('dashboard.created')}: {apiKey.created.toLocaleDateString()}</span>
                    <span>{t('dashboard.requests')}: {apiKey.requests.toLocaleString()}</span>
                    <span>
                      {t('dashboard.lastUsed')}: {apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : t('dashboard.never')}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200/50">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-2">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <p className={`text-yellow-800 font-medium ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                    <strong>{t('dashboard.important')}:</strong> {t('dashboard.securityNote')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-3">
                <Book className="h-6 w-6 text-white" />
              </div>
              <h2 className={`text-2xl font-bold text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.quickStart')}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-50/50 to-emerald-50/50 border border-green-200/50">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className={`font-bold text-gray-900 mb-1 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step1')}</p>
                  <p className={`text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step1Desc')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border border-blue-200/50">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className={`font-bold text-gray-900 mb-1 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step2')}</p>
                  <p className={`text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step2Desc')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-200/50">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className={`font-bold text-gray-900 mb-1 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step3')}</p>
                  <p className={`text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h2 className={`text-2xl font-bold text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>Code Examples</h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className={`text-lg font-bold text-gray-900 mb-4 ${language === 'th' ? 'font-thai' : 'font-en'}`}>HTTP Request Example</h3>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl blur-sm"></div>
                  <pre className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-gray-700">
                    <code>{codeExamples.httpRequest}</code>
                  </pre>
                  <button
                    onClick={() => copyCode(codeExamples.httpRequest, 'http')}
                    className={`absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300 ${
                      copiedCode === 'http' ? 'text-green-400' : ''
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-bold text-gray-900 mb-4 ${language === 'th' ? 'font-thai' : 'font-en'}`}>n8n Webhook Example</h3>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl blur-sm"></div>
                  <pre className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-gray-700">
                    <code>{codeExamples.webhook}</code>
                  </pre>
                  <button
                    onClick={() => copyCode(codeExamples.webhook, 'webhook')}
                    className={`absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300 ${
                      copiedCode === 'webhook' ? 'text-green-400' : ''
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}