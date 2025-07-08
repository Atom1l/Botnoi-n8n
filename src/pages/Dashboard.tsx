import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Copy, Eye, EyeOff, RefreshCw, Code, CheckCircle, ExternalLink, Settings, Zap, Book, Key } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      <Navigation onLoginClick={() => setShowLoginModal(true)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
            {user ? `${t('dashboard.welcomeBack')}, ${user.name}!` : 'Voice API Dashboard'}
          </h1>
          <p className={`text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
            {user ? t('dashboard.subtitle') : 'Explore our Voice API features and get started with text-to-speech integration'}
          </p>
        </div>

        {/* API Key Section */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.yourApiKey')}</h2>
              <button
                onClick={regenerateApiKey}
                disabled={isRegenerating}
                className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 ${language === 'th' ? 'font-thai' : 'font-en'}`}
              >
                <RefreshCw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>{isRegenerating ? t('dashboard.regenerating') : t('dashboard.regenerate')}</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {!user && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className={`text-blue-800 text-sm ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                  <strong>{t('dashboard.note')}:</strong> {t('dashboard.notedetails')}
                </p>
              </div>
            )}
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${user ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'} ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                  {user ? apiKey.status : 'inactive'}
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <code className="bg-white px-4 py-3 rounded-lg text-sm font-mono flex-1 border">
                  {user ? (showKey ? apiKey.key : maskKey(apiKey.key)) : '••••••••••••••••••••••••••••••••••••••••'}
                </code>
                <button
                  onClick={handleShowKey}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => copyToClipboard(user ? apiKey.key : '')}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
              {user && (
                <div className={`flex items-center space-x-4 text-sm text-gray-500 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                  <span>{t('dashboard.created')}: {apiKey.created.toLocaleDateString()}</span>
                  <span>{t('dashboard.requests')}: {apiKey.requests.toLocaleString()}</span>
                  <span>
                    {t('dashboard.lastUsed')}: {apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : t('dashboard.never')}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className={`text-sm text-yellow-800 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                <strong>{t('dashboard.important')}:</strong> {t('dashboard.securityNote')}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Book className="h-6 w-6 text-blue-600" />
            <h2 className={`text-lg font-semibold text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.quickStart')}</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className={`font-medium text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step1')}</p>
                <p className={`text-sm text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step1Desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className={`font-medium text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step2')}</p>
                <p className={`text-sm text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step2Desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className={`font-medium text-gray-900 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step3')}</p>
                <p className={`text-sm text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.step3Desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'th' ? 'font-thai' : 'font-en'}`}>Code Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className={`text-md font-medium text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}`}>HTTP Request Example</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples.httpRequest}</code>
                </pre>
                <button
                  onClick={() => copyCode(codeExamples.httpRequest, 'http')}
                  className={`absolute top-2 right-2 text-gray-400 hover:text-white p-2 ${
                    copiedCode === 'http' ? 'text-green-400' : ''
                  }`}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className={`text-md font-medium text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}`}>n8n Webhook Example</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples.webhook}</code>
                </pre>
                <button
                  onClick={() => copyCode(codeExamples.webhook, 'webhook')}
                  className={`absolute top-2 right-2 text-gray-400 hover:text-white p-2 ${
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

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}