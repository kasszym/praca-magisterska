import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaCar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from './common/Modal';
import Login from './common/Login';
import Registration from './common/Registration';
import './Header.css';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<'register' | 'login'>('register');
  const [modalHeader, setModalHeader] = useState('Zarejestruj się');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleRegister = (_user: any) => {
    void _user;
    setIsModalOpen(false);
    setIsLoggedIn(true);
  };

  const handleLogin = (_user: any) => {
    void _user;
    setIsModalOpen(false);
    setIsLoggedIn(true);
  };

  const handleToggle = (target: 'register' | 'login') => {
    setView(target);
    setModalHeader(target === 'register' ? 'Zarejestruj się' : 'Zaloguj się');
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const goToOrders = () => {
    setShowProfileMenu(false);
    navigate('/orders');
  };

  const goToHome = () => {
    navigate('/');
  };


  return (
    <header className="header">
      <div className="container-fluid px-3">
        <div className="header-content">
          <div className="logo-container" onClick={goToHome}>
            <div className="logo-icon">
              <FaCar size={28} />
            </div>
            <span className="logo-text">
              Aureon <span className="logo-light">Motors</span>
            </span>
          </div>

          {!isLoggedIn ? (
            <div>
              <button
                className="login-button"
                onClick={() => setIsModalOpen(true)}
              >
                Logowanie i rejestracja
              </button>
            </div>
          ) : (
            <div className="user-section">
              <div className="profile-menu-container" ref={profileMenuRef}>
                <button className="profile-button" onClick={toggleProfileMenu}>
                  <FaUser size={20} />
                </button>

                <div className={`profile-dropdown ${showProfileMenu ? 'show' : ''}`}>
                  <button className="dropdown-item" onClick={goToOrders}>
                    <FaShoppingCart size={18} />
                    <span>Twoje zamówienia</span>
                  </button>
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <FaSignOutAlt size={18} />
                    <span>Wyloguj się</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="separator" />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalHeader}
      >
        {view === 'login' ? (
          <Login onLogin={handleLogin} onToggle={handleToggle} />
        ) : (
          <Registration onRegister={handleRegister} onToggle={handleToggle} />
        )}
      </Modal>
    </header>
  );
};

export default Header;
