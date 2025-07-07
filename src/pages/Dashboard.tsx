import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Copy, Eye, EyeOff, RefreshCw, Code, CheckCircle, ExternalLink, Settings, Zap, Book, Key } from 'lucide-react';
import Navigation from '../components/Navigation';

interface ApiKey {
  id: string;
  key: string;
  created: Date;
  lastUsed: Date | null;
  requests: number;
  status: 'active' | 'inactive';
}

export default function Dashboard() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [apiKey, setApiKey] = useState<ApiKey>({
    id: '1',
    key: 'ak_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    created: new Date('2024-01-15'),
    lastUsed: new Date('2024-01-20'),
    requests: 1247,
    status: 'active'
  });
  const [showKey, setShowKey] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const regenerateApiKey = async () => {
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
    setIsRegenerating(false);
    setShowKey(true);
  };

  const copyToClipboard = (text: string) => {
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

  const codeExamples = {
    httpRequest: `{
  "method": "GET",
  "url": "https://voice.botnoi.ai/tts/api-developer-v2/voices",
  "headers": {
    "Authorization": "Bearer ${apiKey.key}",
    "Content-Type": "application/json"
  }
}`,
    
    webhook: `{
  "url": "https://voice.botnoi.ai/tts/api-developer-v2/synthesize",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer ${apiKey.key}",
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
          "Authorization": "Bearer ${apiKey.key}"
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
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
            {t('dashboard.welcomeBack')}, {user?.name}!
          </h1>
          <p className={`text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.subtitle')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.totalRequests')}</p>
                <p className="text-2xl font-bold text-gray-900">{apiKey.requests.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.status')}</p>
                <p className={`text-2xl font-bold text-green-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.active')}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-gray-600 ${language === 'th' ? 'font-thai' : 'font-en'}`}>{t('dashboard.lastUsed')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : t('dashboard.never')}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
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
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                  {apiKey.status}
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <code className="bg-white px-4 py-3 rounded-lg text-sm font-mono flex-1 border">
                  {showKey ? apiKey.key : maskKey(apiKey.key)}
                </code>
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
              <div className={`flex items-center space-x-4 text-sm text-gray-500 ${language === 'th' ? 'font-thai' : 'font-en'}`}>
                <span>{t('dashboard.created')}: {apiKey.created.toLocaleDateString()}</span>
                <span>{t('dashboard.requests')}: {apiKey.requests.toLocaleString()}</span>
                <span>
                  {t('dashboard.lastUsed')}: {apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : t('dashboard.never')}
                </span>
              </div>
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
      </div>
    </div>
  );
}