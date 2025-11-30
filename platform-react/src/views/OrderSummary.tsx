import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './OrderSummary.css';

const OrderSummary: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToOrders = () => {
    navigate('/orders');
  };

  return (
    <main className="order-summary-page">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <FaCheckCircle size={80} color="#4ade80" />
          </div>

          <h1 className="success-title">Dziękujemy za złożenie zamówienia!</h1>
          <p className="success-subtitle">
            Twoje zamówienie zostało pomyślnie złożone i jest obecnie przetwarzane.
          </p>

          <div className="info-box">
            <h3>Co dalej?</h3>
            <ul className="next-steps">
  
              <li>
                <span className="step-number">1</span>
                <span className="step-text">Skontaktujemy się z Tobą w celu weryfikacji danych</span>
              </li>
              <li>
                <span className="step-number">2</span>
                <span className="step-text">Przygotujemy dokumenty zgodnie z wybraną opcją dostawy</span>
              </li>
              <li>
                <span className="step-number">3</span>
                <span className="step-text">Twój samochód będzie gotowy do odbioru!</span>
              </li>
            </ul>
          </div>

          <div className="actions">
            <button className="btn-primary" onClick={goToOrders}>
              Przejdź do moich zamówień
            </button>
            <button className="btn-secondary" onClick={goToHome}>
              Wróć do strony głównej
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderSummary;
