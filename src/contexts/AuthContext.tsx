import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'email' | 'google' | 'line';
  apiKey?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithLine: () => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateApiKey: (newApiKey: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Mock authentication - in production, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockApiKey = 'ak_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const mockUser: User = {
      id: '1',
      userId: 'USR_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      email,
      name: email.split('@')[0],
      provider: 'email',
      apiKey: mockApiKey
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    // Mock Google authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockApiKey = 'ak_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const mockUser: User = {
      id: '2',
      userId: 'USR_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      email: 'user@gmail.com',
      name: 'Google User',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      provider: 'google',
      apiKey: mockApiKey
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const loginWithLine = async () => {
    setLoading(true);
    // Mock Line authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockApiKey = 'ak_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const mockUser: User = {
      id: '3',
      userId: 'USR_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      email: 'user@line.me',
      name: 'Line User',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
      provider: 'line',
      apiKey: mockApiKey
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateApiKey = (newApiKey: string) => {
    if (user) {
      const updatedUser = { ...user, apiKey: newApiKey };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };
  const value = {
    user,
    login,
    loginWithGoogle,
    loginWithLine,
    logout,
    loading,
    updateApiKey
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}