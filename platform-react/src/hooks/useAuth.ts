import { useState } from 'react';
import api from '../config/api';
import type { GoogleUser } from './useOAuth';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  user: any;
  message?: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string | string[]>;
    };
  };
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showMessage = (message: string, type: 'success' | 'error' = 'success') => {
    if (type === 'success') {
      alert(message);
    } else {
      alert(`Error: ${message}`);
    }
  };

  const handleValidationErrors = (
    error: ApiError,
    setErrors?: (errors: Record<string, string>) => void,
    fieldMapping?: Record<string, string>
  ) => {
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      const formattedErrors: Record<string, string> = {};
      
      Object.keys(errors).forEach((field) => {
        const fieldName = fieldMapping?.[field] || field;
        const errorMsg = Array.isArray(errors[field]) ? errors[field][0] : errors[field];
        formattedErrors[fieldName] = errorMsg;
      });

      if (setErrors) {
        setErrors(formattedErrors);
      }
    }
  };

  const login = async (
    credentials: LoginCredentials,
    setErrors?: (errors: Record<string, string>) => void
  ): Promise<AuthResponse | null> => {
    setIsLoading(true);
    try {
      const response = await api.post<AuthResponse>('/login', credentials);

      localStorage.setItem('token', response.data.token);

      showMessage(response.data.message || 'Logowanie zakończone pomyślnie', 'success');

      return response.data;
    } catch (error) {
      handleValidationErrors(error as ApiError, setErrors);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    credentials: RegisterCredentials,
    setErrors?: (errors: Record<string, string>) => void
  ): Promise<AuthResponse | null> => {
    setIsLoading(true);
    try {
      const response = await api.post<AuthResponse>('/register', credentials);

      localStorage.setItem('token', response.data.token);

      showMessage(response.data.message || 'Rejestracja zakończona pomyślnie', 'success');

      return response.data;
    } catch (error) {
      const fieldMapping = {
        password_confirmation: 'confirmPassword',
      };
      handleValidationErrors(error as ApiError, setErrors, fieldMapping);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');

      showMessage('Wylogowano pomyślnie', 'success');
    }
  };

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
  };

  const getToken = (): string | null => {
    return localStorage.getItem('token');
  };

  const googleAuth = async (googleUser: GoogleUser): Promise<AuthResponse | null> => {
    setIsLoading(true);
    try {
      const response = await api.post<AuthResponse>('/auth/google', {
        email: googleUser.email,
        name: googleUser.name,
        google_id: googleUser.sub,
      });

      localStorage.setItem('token', response.data.token);

      showMessage(
        response.data.message || 'Uwierzytelnianie przez Google zakończone pomyślnie',
        'success'
      );

      return response.data;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
    getToken,
    googleAuth,
  };
};
