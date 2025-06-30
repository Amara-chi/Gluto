import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from 'react';

// Example useAuth hook implementation
export function useAuth() {
  interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  }
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    if (!response.ok) throw new Error('Login failed');
    
    const { token, isAdmin } = await response.json();
    
    if (!isAdmin) {
      throw new Error('Admin access required');
    }
  
    localStorage.setItem('token', token);
    
    // Get user data
    const userResponse = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const userData = await userResponse.json();
    setUser(userData);
    setIsAuthenticated(true);  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return { user, isLoading, isAuthenticated, login, logout };
}
