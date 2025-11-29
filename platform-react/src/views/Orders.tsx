import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaCalendar, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import type { Order } from "../hooks/useOrder";
import "./Orders.css";

const Orders: React.FC = () => {
  const { getOrders, isLoading } = useOrder();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const formatPrice = (price: number): string => {
    return Number(price || 0).toLocaleString("pl-PL");
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusLabel = (status: string): string => {
    const labels: { [key: string]: string } = {
      pending: "Oczekuje",
      processing: "W realizacji",
      completed: "Zrealizowane",
      cancelled: "Anulowane",
    };
    return labels[status] || status;
  };

  const getStatusClass = (status: string): string => {
    const classes: { [key: string]: string } = {
      pending: "status-pending",
      processing: "status-processing",
      completed: "status-completed",
      cancelled: "status-cancelled",
    };
    return classes[status] || "status-pending";
  };

  return (
    <main className="orders-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <FaShoppingCart
              size={32}
              color="var(--main-color)"
            />
            <div>
              <h1 className="page-title">Twoje zamówienia</h1>
              <p className="page-subtitle">
                Przeglądaj historię swoich zakupów
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <FaSpinner
              className="spinner"
              size={48}
              color="var(--main-color)"
            />
            <p>Ładowanie zamówień...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <FaShoppingCart
              size={64}
              color="var(--grey)"
            />
            <h3>Brak zamówień</h3>
            <p>Nie masz jeszcze żadnych zamówień</p>
            <Link
              to="/"
              className="cta-button"
            >
              Przejdź do sklepu
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div
                key={order.id}
                className="order-card"
              >
                <div className="order-header">
                  <div className="order-number">
                    <span className="label">Zamówienie #{order.id}</span>
                    <span
                      className={`status-badge ${getStatusClass(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="order-date">
                    <FaCalendar size={16} />
                    <span>{formatDate(order.created_at)}</span>
                  </div>
                </div>

                <div className="order-body">
                  <div className="order-section">
                    <h4 className="section-title">Samochód</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Model</span>
                        <span className="info-value">{order.car_name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Wersja</span>
                        <span className="info-value">{order.car_version}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Kolor</span>
                        <span className="info-value">{order.color_name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Cena pojazdu</span>
                        <span className="info-value price">
                          {formatPrice(order.car_price)} zł
                        </span>
                      </div>
                    </div>

                    {order.addons && order.addons.length > 0 && (
                      <div className="addons-list">
                        <span className="addons-label">Dodatki:</span>
                        <div className="addon-tags">
                          {order.addons.map((addon, index) => (
                            <span
                              key={index}
                              className="addon-tag"
                            >
                              {addon.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="order-section">
                    <h4 className="section-title">Dostawa i weryfikacja</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Dostawa</span>
                        <span className="info-value">
                          {order.delivery_method_label}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Weryfikacja</span>
                        <span className="info-value">
                          {order.verification_method === "online"
                            ? "Online"
                            : "U kuriera"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-footer">
                  <span className="total-label">Całkowita kwota</span>
                  <span className="total-value">
                    {formatPrice(order.total_price)} zł
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
