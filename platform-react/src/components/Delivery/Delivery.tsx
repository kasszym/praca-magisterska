import React, { useState, useEffect } from 'react';
import { FaLock, FaTruck, FaBox, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSummary } from '../../hooks/useSummary';
import { useAuth } from '../../hooks/useAuth';
import { useOrder } from '../../hooks/useOrder';
import { toast } from 'react-toastify';
import './Delivery.css';

interface DeliveryOption {
  id: string;
  label: string;
  eta: string;
  price: number;
  displayPrice: string;
  icon: string;
}

interface VerificationOption {
  id: string;
  label: string;
  price: number;
  displayPrice: string;
  description: string;
}

interface DeliveryProps {
  onSubmit?: () => void;
}

const Delivery: React.FC<DeliveryProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { selectedCar, personalData, setDeliveryInfo, setVerificationInfo } = useSummary();
  const { isAuthenticated } = useAuth();
  const { createOrder, isLoading } = useOrder();

  const [deliveryMethod, setDeliveryMethod] = useState('inpost');
  const [verificationMethod, setVerificationMethod] = useState('online');
  const [previousDelivery, setPreviousDelivery] = useState('inpost');

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'inpost',
      label: 'Inpost',
      eta: '1-2 dni robocze',
      price: 12.99,
      displayPrice: '12,99 zł',
      icon: 'box',
    },
    {
      id: 'fedex',
      label: 'Kurier FedEx',
      eta: '1-2 dni robocze',
      price: 19.99,
      displayPrice: '19,99 zł',
      icon: 'truck',
    },
    {
      id: 'poczta',
      label: 'Poczta Polska',
      eta: '2-5 dni robocze',
      price: 9.99,
      displayPrice: '9,99 zł',
      icon: 'mail',
    },
  ];

  const verificationOptions: VerificationOption[] = [
    {
      id: 'online',
      label: 'Weryfikacja online',
      price: 0,
      displayPrice: '0 zł',
      description: 'Potwierdź swoją tożsamość za pomocą przelewu bankowego.',
    },
    {
      id: 'courier',
      label: 'Weryfikacja u kuriera',
      price: 20,
      displayPrice: '20 zł',
      description:
        'Zamów kuriera, który przywiezie umowę do podpisu oraz potwierdzi Twoją tożsamość.',
    },
  ];

  useEffect(() => {
    const selectedDelivery = deliveryOptions.find((opt) => opt.id === deliveryMethod);
    if (selectedDelivery) {
      setDeliveryInfo({
        method: selectedDelivery.id,
        label: selectedDelivery.label,
        eta: selectedDelivery.eta,
        price: selectedDelivery.price,
      });
    }
  }, [deliveryMethod]);

  useEffect(() => {
    const selectedVerification = verificationOptions.find((opt) => opt.id === verificationMethod);
    if (selectedVerification) {
      setVerificationInfo({
        method: selectedVerification.id,
        label: selectedVerification.label,
        price: selectedVerification.price,
      });
    }
  }, [verificationMethod]);

  const selectMethod = (id: string) => {
    setDeliveryMethod(id);
  };

  const selectVerification = (id: string) => {
    setVerificationMethod(id);
    if (id === 'courier') {
      setPreviousDelivery(deliveryMethod);
      setDeliveryMethod('fedex');
    } else {
      setDeliveryMethod(previousDelivery || 'inpost');
    }
  };

  const shownDeliveryOptions = () => {
    return verificationMethod === 'courier'
      ? deliveryOptions.filter((o) => o.id === 'fedex')
      : deliveryOptions;
  };

  const handleSubmit = async () => {
    if (!deliveryMethod) {
      toast.warning('Wybierz metodę dostawy');
      return;
    }

    if (!isAuthenticated()) {
      toast.warning('Musisz być zalogowany, aby złożyć zamówienie', {
        autoClose: 3000,
      });
      return;
    }

    if (!selectedCar) {
      toast.warning('Wybierz samochód przed złożeniem zamówienia');
      return;
    }

    if (!personalData) {
      toast.warning('Uzupełnij dane osobowe przed złożeniem zamówienia');
      return;
    }

    const selectedDelivery = deliveryOptions.find((opt) => opt.id === deliveryMethod);
    const selectedVerification = verificationOptions.find((opt) => opt.id === verificationMethod);

    const deliveryPrice = Number(selectedDelivery?.price) || 0;
    const verificationPrice = Number(selectedVerification?.price) || 0;
    const carPrice = Number(selectedCar.price) || 0;

    const addonsTotal =
      Number(selectedCar.addons?.reduce((sum, addon) => sum + (Number(addon.price) || 0), 0)) || 0;

    const totalPrice = Number(carPrice + deliveryPrice + verificationPrice);

    const orderData = {
      car_id: selectedCar.car_id,
      car_name: selectedCar.name,
      car_version: selectedCar.version,
      color_id: selectedCar.color_id,
      color_name: selectedCar.color,
      car_price: Number(carPrice),
      addons: selectedCar.addons || [],
      addons_total: Number(addonsTotal),

      first_name: personalData.firstName,
      last_name: personalData.lastName,
      pesel: personalData.pesel,
      email: personalData.email,
      phone: personalData.phone,

      street: personalData.street,
      house_number: personalData.houseNumber,
      apartment_number: personalData.apartmentNumber || undefined,
      post_code: personalData.postCode,
      city: personalData.city,

      invoice_email:
        personalData.invoiceEmailOption === 'different'
          ? personalData.invoiceEmail
          : personalData.email,

      correspondence_street:
        personalData.correspondenceAddressOption === 'different'
          ? personalData.correspondenceStreet
          : undefined,
      correspondence_house_number:
        personalData.correspondenceAddressOption === 'different'
          ? personalData.correspondenceHouseNumber
          : undefined,
      correspondence_apartment_number:
        personalData.correspondenceAddressOption === 'different'
          ? personalData.correspondenceApartmentNumber || undefined
          : undefined,
      correspondence_post_code:
        personalData.correspondenceAddressOption === 'different'
          ? personalData.correspondencePostCode
          : undefined,
      correspondence_city:
        personalData.correspondenceAddressOption === 'different'
          ? personalData.correspondenceCity
          : undefined,

      delivery_method: deliveryMethod,
      delivery_method_label: selectedDelivery?.label,
      delivery_eta: selectedDelivery?.eta,
      delivery_price: deliveryPrice,
      verification_method: verificationMethod,
      verification_price: verificationPrice,

      total_price: totalPrice,
    };

    try {
      const result = await createOrder(orderData);

      if (result) {
        toast.success('Zamówienie zostało złożone pomyślnie!', {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/order-summary');
        }, 1000);

        if (onSubmit) {
          onSubmit();
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Wystąpił błąd podczas składania zamówienia', {
        autoClose: 3000,
      });
    }
  };

  const getDeliveryIcon = (iconName: string) => {
    switch (iconName) {
      case 'box':
        return <FaBox />;
      case 'truck':
        return <FaTruck />;
      case 'mail':
        return <FaEnvelope />;
      default:
        return <FaBox />;
    }
  };

  return (
    <div className="Delivery">
      <div className="delivery-header">
        <h1 className="delivery-title">Dostawa umowy i płatność</h1>
        <p className="delivery-subtitle">Finalizuj swoje zamówienie</p>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <FaLock size={32} color="var(--main-color)" />
          </div>
          <div>
            <h2 className="section-title">Weryfikacja tożsamości</h2>
            <p className="section-description">
              Wybierz preferowany sposób potwierdzenia tożsamości
            </p>
          </div>
        </div>

        <div className="verification-grid">
          {verificationOptions.map((v) => (
            <div
              key={v.id}
              className={`verification-card ${verificationMethod === v.id ? 'selected' : ''}`}
              onClick={() => selectVerification(v.id)}
              role="button"
              tabIndex={0}
              onKeyUp={(e) => e.key === 'Enter' && selectVerification(v.id)}
            >
              <div className="card-header">
                <div className="card-radio">
                  <div className="radio-outer">
                    {verificationMethod === v.id && <div className="radio-inner"></div>}
                  </div>
                </div>
                <div className="card-info">
                  <h3 className="card-title">{v.label}</h3>
                  <p className="card-price">{v.displayPrice}</p>
                </div>
              </div>
              <p className="card-description">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <FaShoppingCart size={32} color="var(--main-color)" />
          </div>
          <div>
            <h2 className="section-title">Sposób dostawy umowy</h2>
            <p className="section-description">Wybierz jak chcesz otrzymać dokumenty</p>
          </div>
        </div>

        <div className="delivery-options">
          {shownDeliveryOptions().map((opt) => (
            <div
              key={opt.id}
              className={`delivery-option ${deliveryMethod === opt.id ? 'selected' : ''}`}
              onClick={() => selectMethod(opt.id)}
              role="button"
              tabIndex={0}
              onKeyUp={(e) => e.key === 'Enter' && selectMethod(opt.id)}
            >
              <div className="option-radio">
                <div className="radio-outer">
                  {deliveryMethod === opt.id && <div className="radio-inner"></div>}
                </div>
              </div>
              <div className="option-icon">{getDeliveryIcon(opt.icon)}</div>
              <div className="option-content">
                <h3 className="option-label">{opt.label}</h3>
                <p className="option-eta">{opt.eta}</p>
              </div>
              <div className="option-price">{opt.displayPrice}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="submit-section">
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Przetwarzanie...' : 'Sfinalizuj zamówienie'}
        </button>
      </div>
    </div>
  );
};

export default Delivery;
