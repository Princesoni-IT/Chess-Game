import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  date_joined: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (username: string, email: string, password: string, password2: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios base URL
const api = axios.create({
  baseURL: '/api/auth',
  headers: { 'Content-Type': 'application/json' },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);

  // Load user profile on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const savedToken = localStorage.getItem('access_token');
      if (savedToken) {
        try {
          const res = await api.get('/profile/', {
            headers: { Authorization: `Bearer ${savedToken}` },
          });
          setUser(res.data);
          setToken(savedToken);
        } catch {
          // Token expired or invalid
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await api.post('/login/', { username, password });
      const { user: userData, tokens } = res.data;
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
      setToken(tokens.access);
      setUser(userData);
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.error || err.response?.data?.detail || 'Login failed. Please try again.';
      return { success: false, error: message };
    }
  };

  const signup = async (username: string, email: string, password: string, password2: string) => {
    try {
      const res = await api.post('/register/', { username, email, password, password2 });
      const { user: userData, tokens } = res.data;
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
      setToken(tokens.access);
      setUser(userData);
      return { success: true };
    } catch (err: any) {
      const errors = err.response?.data;
      let message = 'Registration failed. Please try again.';
      if (errors) {
        const firstKey = Object.keys(errors)[0];
        const firstError = errors[firstKey];
        message = Array.isArray(firstError) ? firstError[0] : String(firstError);
      }
      return { success: false, error: message };
    }
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken && token) {
      api.post('/logout/', { refresh: refreshToken }, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => { });
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, login, signup, logout }}>
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
