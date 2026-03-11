'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Admin } from '@/types';
import { authApi } from '@/lib/api';

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateAdmin: (data: Partial<Admin>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedAdmin = localStorage.getItem('admin');

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    setToken(data.token);
    setAdmin({
      _id: data._id,
      email: data.email,
      name: data.name,
      role: data.role as 'admin' | 'super-admin',
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('admin', JSON.stringify({
      _id: data._id,
      email: data.email,
      name: data.name,
      role: data.role,
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }, []);

  const updateAdmin = useCallback(async (data: Partial<Admin>) => {
    const updated = await authApi.updateProfile(data);
    setAdmin(updated);
    localStorage.setItem('admin', JSON.stringify(updated));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        updateAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
