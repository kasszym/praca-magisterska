import React, { useState } from 'react';
import type { FormEvent } from 'react';
import ButtonComponent from './ButtonComponent';
import './Registration.css';

interface RegistrationProps {
  onRegister: (user: any) => void;
  onToggle: (view: 'register' | 'login') => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegister, onToggle }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  const validate = (): boolean => {
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!form.name) {
      newErrors.name = 'Imię i nazwisko jest wymagane';
      isValid = false;
    }

    if (!form.email) {
      newErrors.email = 'E-mail jest wymagany';
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Nieprawidłowy format e-mail';
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = 'Hasło jest wymagane';
      isValid = false;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Powtórzenie hasła jest wymagane';
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są identyczne';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    
      const user = {
        name: form.name,
        email: form.email,
      };
      
      onRegister(user);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors((prev) => ({ ...prev, email: 'Rejestracja nie powiodła się' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    console.log('Google register clicked');
  };

  return (
    <div className="registration">
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-item">
            <label className="form-label">Imię i nazwisko</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="form-input"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

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

          <div className="form-item">
            <label className="form-label">Powtórz hasło</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="form-input"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
        </div>

        <div className="divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">lub</span>
          <div className="divider-line"></div>
        </div>

        <div className="oauth-section">
          <div id="google-register-btn">
            <button type="button" className="oauth-btn" onClick={handleGoogleRegister}>
              <svg className="oauth-icon" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Kontynuuj przez Google</span>
            </button>
          </div>
        </div>

        <div className="submit-section">
          <ButtonComponent
            width="100%"
            onClick={handleSubmit}
            title={isLoading ? 'Rejestrowanie...' : 'Zarejestruj się'}
            type="submit"
          />
        </div>

        <div className="footer-section">
          <p className="footer-text">
            Czy masz już konto?{' '}
            <button
              className="link-btn"
              onClick={() => onToggle('login')}
              type="button"
            >
              Zaloguj się
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
