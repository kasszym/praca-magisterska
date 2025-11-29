import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import ButtonComponent from './ButtonComponent';
import { useAuth } from '../../hooks/useAuth';
import { useOAuth } from '../../hooks/useOAuth';
import { GOOGLE_CLIENT_ID } from '../../config/oauth';
import './Login.css';

interface LoginProps {
  onLogin: (user: any) => void;
  onToggle: (view: 'register' | 'login') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onToggle }) => {
  const { login, isLoading, googleAuth } = useAuth();
  const { initializeGoogleButton, parseJwt } = useOAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    setErrors((prev) => ({ ...prev, [name]: '' }));
    markHasValue(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const content = e.target.closest('.form-item');
    if (content) {
      content.classList.add('focused');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const content = e.target.closest('.form-item');
    if (content) {
      content.classList.remove('focused');
    }
    markHasValue(e);
  };

  const markHasValue = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.closest('.form-item');
    if (content) {
      if (e.target.value && e.target.value.length > 0) {
        content.classList.add('has-value');
      } else {
        content.classList.remove('has-value');
      }
    }
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    const result = await login(
      {
        email: form.email,
        password: form.password,
      },
      setErrors
    );

    if (result) {
      onLogin(result.user);
    }
  };

  const handleGoogleCallback = async (response: any) => {
    const userData = parseJwt(response.credential);
    if (userData) {
      const result = await googleAuth(userData);
      if (result) {
        onLogin(result.user);
      }
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll('.login .form-input');
    inputs.forEach((inp) => {
      const input = inp as HTMLInputElement;
      const content = input.closest('.form-item');
      if (content && input.value && input.value.length > 0) {
        content.classList.add('has-value');
      }
    });

    try {
      initializeGoogleButton('google-login-btn', GOOGLE_CLIENT_ID, handleGoogleCallback);
    } catch (error) {
      console.error('Failed to initialize Google button:', error);
    }
  }, []);

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-item">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="form-input"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-item">
            <label className="form-label">Hasło</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="form-input"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
        </div>

        <div className="divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">lub</span>
          <div className="divider-line"></div>
        </div>

        <div className="oauth-section">
          <div id="google-login-btn"></div>
        </div>

        <div className="submit-section">
          <ButtonComponent
            width="100%"
            onClick={handleSubmit}
            title={isLoading ? 'Logowanie...' : 'Zaloguj się'}
            type="submit"
          />
        </div>

        <div className="footer-section">
          <p className="footer-text">
            Nie masz konta?{' '}
            <button
              className="link-btn"
              onClick={() => onToggle('register')}
              type="button"
            >
              Zarejestruj się
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
