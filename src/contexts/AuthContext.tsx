import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock JWT token generation
const generateMockToken = () => {
  return 'mock-jwt-' + Math.random().toString(36).substr(2, 9);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', generateMockToken());
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call your API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'customer'
    };
    
    setUser(mockUser);
  };

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - in production, this would call your API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: 'customer'
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
