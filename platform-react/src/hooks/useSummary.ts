import { useState } from 'react';

interface SelectedCar {
  car_id: number;
  version_id: number;
  color_id: number;
  addon_ids: number[];
  name: string;
  version: string;
  color: string;
  addons: Array<{ id: number; title: string; price: number }>;
  price: number;
}

interface DeliveryInfo {
  method: string;
  label: string;
  eta: string;
  price: number;
}

interface VerificationInfo {
  method: string;
  label: string;
  price: number;
}

interface PersonalData {
  firstName: string;
  lastName: string;
  pesel: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  postCode: string;
  city: string;
  email: string;
  phone: string;
  invoiceEmailOption: string;
  invoiceEmail: string;
  correspondenceAddressOption: string;
  correspondenceStreet: string;
  correspondenceHouseNumber: string;
  correspondenceApartmentNumber: string;
  correspondencePostCode: string;
  correspondenceCity: string;
}

// Global state (similar to Vue's ref outside the composable)
let selectedCarState: SelectedCar | null = null;
let deliveryInfoState: DeliveryInfo | null = null;
let verificationInfoState: VerificationInfo | null = null;
let personalDataState: PersonalData | null = null;

export const useSummary = () => {
  const [, forceUpdate] = useState({});

  const setSelectedCar = (car: SelectedCar) => {
    selectedCarState = car;
    forceUpdate({});
  };

  const setDeliveryInfo = (delivery: DeliveryInfo) => {
    deliveryInfoState = delivery;
    forceUpdate({});
  };

  const setVerificationInfo = (verification: VerificationInfo) => {
    verificationInfoState = verification;
    forceUpdate({});
  };

  const setPersonalData = (data: PersonalData) => {
    personalDataState = data;
    forceUpdate({});
  };

  const clearSummary = () => {
    selectedCarState = null;
    deliveryInfoState = null;
    verificationInfoState = null;
    personalDataState = null;
    forceUpdate({});
  };

  const formatPrice = (value: number | null | undefined) => {
    const n = Number(value ?? 0) || 0;
    return n.toLocaleString('pl-PL');
  };

  return {
    selectedCar: selectedCarState,
    deliveryInfo: deliveryInfoState,
    verificationInfo: verificationInfoState,
    personalData: personalDataState,
    setSelectedCar,
    setDeliveryInfo,
    setVerificationInfo,
    setPersonalData,
    clearSummary,
    formatPrice,
  };
};
