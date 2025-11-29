import React, { useMemo } from 'react';
import { useSummary } from '../../hooks/useSummary';
import { FaShoppingCart, FaTruck, FaLock, FaCheckCircle } from 'react-icons/fa';
import './Summary.css';

const Summary: React.FC = () => {
  const { selectedCar, deliveryInfo, verificationInfo } = useSummary();

  const formatPrice = (price: number | undefined): string => {
    if (price === undefined || price === null) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const totalPrice = useMemo(() => {
    if (!selectedCar) return 0;

    let total = selectedCar.price || 0;

    if (deliveryInfo?.price) {
      total += deliveryInfo.price;
    }

    if (verificationInfo?.price) {
      total += verificationInfo.price;
    }

    return total;
  }, [selectedCar, deliveryInfo, verificationInfo]);

  if (!selectedCar) {
    return (
      <div className="summary-container">
        <div className="summary-header">
          <FaShoppingCart size={24} color="var(--main-color)" />
          <h3 className="summary-title">Podsumowanie zamówienia</h3>
        </div>
        <div className="summary-empty">
          <FaShoppingCart size={48} color="var(--grey)" />
          <p>Wybierz samochód, aby zobaczyć podsumowanie</p>
        </div>
      </div>
    );
  }

  return (
    <div className="summary-container">
      <div className="summary-header">
        <FaShoppingCart size={24} color="var(--main-color)" />
        <h3 className="summary-title">Podsumowanie zamówienia</h3>
      </div>

      <div className="summary-content">
        {/* Selected Car Card */}
        <div className="summary-card">
          <div className="card-icon">
            <FaCheckCircle size={20} color="var(--main-color)" />
          </div>
          <div className="card-content">
            <h4 className="card-title">Wybrany samochód</h4>

            <div className="info-row">
              <span className="info-label">Model</span>
              <span className="info-value">{selectedCar.name}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Wersja</span>
              <span className="info-value">{selectedCar.version}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Kolor</span>
              <span className="info-value">{selectedCar.color}</span>
            </div>

            <div className="info-row price-row">
              <span className="info-label">Cena pojazdu</span>
              <span className="info-price">{formatPrice(selectedCar.price)} zł</span>
            </div>

            {selectedCar.addons && selectedCar.addons.length > 0 && (
              <div className="addons-section">
                <div className="addons-header">Dodatki:</div>
                {selectedCar.addons.map((addon, index) => (
                  <div key={index} className="addon-item">
                    <span className="addon-name">{addon.title}</span>
                    <span className="addon-price">+{formatPrice(addon.price)} zł</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Delivery Card */}
        {deliveryInfo && (
          <div className="summary-card">
            <div className="card-icon">
              <FaTruck size={20} color="var(--main-color)" />
            </div>
            <div className="card-content">
              <h4 className="card-title">Dostawa</h4>

              <div className="info-row">
                <span className="info-label">Sposób</span>
                <span className="info-value">{deliveryInfo.label}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Czas dostawy</span>
                <span className="info-value">{deliveryInfo.eta}</span>
              </div>

              <div className="info-row price-row">
                <span className="info-label">Koszt</span>
                <span className="info-price">{formatPrice(deliveryInfo.price)} zł</span>
              </div>
            </div>
          </div>
        )}

        {/* Verification Card */}
        {verificationInfo && (
          <div className="summary-card">
            <div className="card-icon">
              <FaLock size={20} color="var(--main-color)" />
            </div>
            <div className="card-content">
              <h4 className="card-title">Weryfikacja</h4>

              <div className="info-row">
                <span className="info-label">Sposób</span>
                <span className="info-value">{verificationInfo.label}</span>
              </div>

              <div className="info-row price-row">
                <span className="info-label">Koszt</span>
                <span className="info-price">{formatPrice(verificationInfo.price)} zł</span>
              </div>
            </div>
          </div>
        )}

        {/* Total Section */}
        <div className="total-section">
          <div className="total-row">
            <span className="total-label">Cena całkowita</span>
            <span className="total-value">{formatPrice(totalPrice)} zł</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
