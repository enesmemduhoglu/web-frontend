import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { loginUser as loginApiService } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));

  const decodeToken = useCallback((token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      
      return {
        username: decoded.sub,
        userId: decoded.user_id,
        roles: decoded.authorities || [] 
      };
    } catch (e) {
      console.error("Token decode hatası:", e);
      return null;
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
      setUser(decodeToken(storedToken));
    }
  }, [decodeToken]);

  const login = async (credentials, isAdmin = false) => {
    const response = await loginApiService(credentials, isAdmin);
    const { access_token, refresh_token } = response.data;
    
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    setToken(access_token);
    
    const decodedUser = decodeToken(access_token);
    setUser(decodedUser);
    
    return response;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};