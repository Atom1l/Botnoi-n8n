import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Shield, ArrowRight, Mail, Eye, EyeOff, Key } from 'lucide-react';
import Navigation from '../components/Navigation';

export default function LandingPage() {
  const { user, login, loginWithGoogle, loginWithLine, loading } = useAuth();
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
      
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-20 mb-16 max-w-4xl">
          <img 
              src="/botnoi.svg" 
              alt="Botnoi" 
              className="h-36 w-36 mb-8 pb-2 mx-auto border border-[7px] border-[#01bffb] rounded-full transition-all duration-200 transform hover:scale-105"
          />
          <h1 className="font-en text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            BOTNOi
          </h1>
          <p className="font-en text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Easily convert any text into realistic speech, helping you work smoothly, finish tasks easily, and do it anywhere.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-[#01bffb] font-en text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#05aee3] transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 inline" />
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Key className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-en text-xl font-semibold text-gray-900 mb-2">Log In</h3>
            <p className="font-en text-gray-600">Generate secure API keys instantly with customizable permissions and expiration dates.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-600" /> 
            </div>
            <h3 className="font-en text-xl font-semibold text-gray-900 mb-2">Get API Key</h3>
            <p className="font-en text-gray-600">Seamlessly integrate with n8n workflows using our comprehensive API documentation.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-en text-xl font-semibold text-gray-900 mb-2">Try it</h3>
            <p className="font-en text-gray-600">Bank-grade encryption and security measures to protect your API keys and data.</p>
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
              <h2 className="text-2xl font-bold text-gray-900">Welcome!</h2>
              <p className="text-gray-600">Choose your preferred sign-in method</p>
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
                <span>Continue with Google</span>
              </button>

              <button
                onClick={loginWithLine}
                disabled={loading}
                className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
<svg xmlns="http://www.w3.org/2000/svg" fill="white" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
<path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 25 10 C 16.297049 10 9 15.678331 9 22.947266 C 9 29.432462 14.784063 34.70004 22.335938 35.712891 C 22.335938 35.712891 22.337891 35.712891 22.337891 35.712891 C 22.536678 35.755374 22.765454 35.823119 22.900391 35.886719 C 22.927968 35.899717 22.92499 35.900858 22.939453 35.910156 C 22.936808 35.992303 22.962381 36.370293 22.923828 36.660156 C 22.914328 36.716266 22.750575 37.685545 22.716797 37.876953 L 22.716797 37.878906 C 22.670157 38.145846 22.493944 38.683413 22.949219 39.369141 C 23.176856 39.712004 23.648332 39.989421 24.089844 40.027344 C 24.531355 40.065264 24.936512 39.956154 25.388672 39.765625 C 26.423745 39.336822 28.490518 38.115392 30.876953 36.482422 C 33.261295 34.850883 35.83616 32.871381 37.521484 30.970703 C 39.813508 28.503964 41 25.843504 41 22.947266 C 41 15.679227 33.703032 10 25 10 z M 25 12 C 32.838968 12 39 17.041304 39 22.947266 C 39 25.319988 38.105988 27.408105 36.052734 29.615234 L 36.042969 29.625 L 36.035156 29.634766 C 34.573278 31.286637 32.063988 33.245345 29.748047 34.830078 C 27.492074 36.373777 25.386061 37.559635 24.75 37.839844 C 24.81529 37.455902 24.900391 36.957031 24.900391 36.957031 L 24.904297 36.939453 L 24.90625 36.921875 C 24.96188 36.503517 25.111583 35.868916 24.792969 35.083984 L 24.792969 35.082031 L 24.792969 35.080078 C 24.555561 34.50218 24.11359 34.248575 23.751953 34.078125 C 23.390316 33.907675 23.042681 33.819356 22.753906 33.757812 L 22.714844 33.748047 L 22.673828 33.744141 C 15.849442 32.857984 11 28.250827 11 22.947266 C 11 17.040201 17.160951 12 25 12 z M 23.992188 18.998047 C 23.488379 19.007393 23 19.391875 23 20 L 23 26 C 23 26.552 23.448 27 24 27 C 24.552 27 25 26.552 25 26 L 25 23.121094 L 27.185547 26.580078 C 27.751547 27.372078 29 26.973 29 26 L 29 20 C 29 19.448 28.552 19 28 19 C 27.448 19 27 19.448 27 20 L 27 23 L 24.814453 19.419922 C 24.602203 19.122922 24.294473 18.992439 23.992188 18.998047 z M 15 19 C 14.448 19 14 19.448 14 20 L 14 26 C 14 26.552 14.448 27 15 27 L 18 27 C 18.552 27 19 26.552 19 26 C 19 25.448 18.552 25 18 25 L 16 25 L 16 20 C 16 19.448 15.552 19 15 19 z M 21 19 C 20.448 19 20 19.448 20 20 L 20 26 C 20 26.552 20.448 27 21 27 C 21.552 27 22 26.552 22 26 L 22 20 C 22 19.448 21.552 19 21 19 z M 31 19 C 30.448 19 30 19.448 30 20 L 30 26 C 30 26.552 30.448 27 31 27 L 34 27 C 34.552 27 35 26.552 35 26 C 35 25.448 34.552 25 34 25 L 32 25 L 32 24 L 34 24 C 34.553 24 35 23.552 35 23 C 35 22.448 34.553 22 34 22 L 32 22 L 32 21 L 34 21 C 34.552 21 35 20.552 35 20 C 35 19.448 34.552 19 34 19 L 31 19 z"></path>
</svg>
                <span>Continue with Line</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                      placeholder="Enter your email"
                      required
                    />
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                      placeholder="Enter your password"
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
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}