import React from 'react';
import TheSeparator from './common/TheSeparator';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <TheSeparator />
      <div className="container-fluid px-3">
        <div className="footer-content">
          <span className="footer-text">© 2025 Aureon Motors</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
