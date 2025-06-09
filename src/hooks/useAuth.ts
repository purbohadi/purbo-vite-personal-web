// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UseAuthResult extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

/**
 * Hook for authentication state and operations
 */
export function useAuth(): UseAuthResult {
  const [authData, setAuthData] = useLocalStorage<{
    user: User | null;
    token: string | null;
  }>('auth_data', { user: null, token: null });

  const [state, setState] = useState<AuthState>({
    user: authData.user,
    token: authData.token,
    isAuthenticated: !!authData.token,
    isLoading: false,
    error: null,
  });

  // In a real app, this would call your auth API endpoint
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Mock login - replace with actual API call in production
      await new Promise(resolve => setTimeout(resolve, 800));

      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
          role: 'admin'
        };

        const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2);

        // Update state and localStorage
        setState({
          user: userData,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });

        setAuthData({ user: userData, token });
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: unknown) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      }));
      return false;
    }
  }, [setAuthData]);

  const logout = useCallback(() => {
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });

    setAuthData({ user: null, token: null });
  }, [setAuthData]);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    if (!state.token) return false;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // In a real app, verify the token with the server
      await new Promise(resolve => setTimeout(resolve, 500));

      // Token is valid (in a real app, this would check with the server)
      setState(prev => ({ ...prev, isLoading: false, isAuthenticated: true }));
      return true;
    } catch {
      // Token is invalid
      logout();
      return false;
    }
  }, [state.token, logout]);

  // Check auth on mount
  useEffect(() => {
    if (state.token) {
      checkAuth();
    }
  }, [checkAuth, state.token]);

  return {
    ...state,
    login,
    logout,
    checkAuth
  };
}