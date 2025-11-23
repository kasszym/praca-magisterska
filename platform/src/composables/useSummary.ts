import { ref, computed } from "vue";

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

const selectedCar = ref<SelectedCar | null>(null);
const deliveryInfo = ref<DeliveryInfo | null>(null);
const verificationInfo = ref<VerificationInfo | null>(null);
const personalData = ref<PersonalData | null>(null);

export const useSummary = () => {
  const setSelectedCar = (car: SelectedCar) => {
    selectedCar.value = car;
  };

  const setDeliveryInfo = (delivery: DeliveryInfo) => {
    deliveryInfo.value = delivery;
  };

  const setVerificationInfo = (verification: VerificationInfo) => {
    verificationInfo.value = verification;
  };

  const setPersonalData = (data: PersonalData) => {
    personalData.value = data;
  };

  const getSelectedCar = computed(() => selectedCar.value);
  const getDeliveryInfo = computed(() => deliveryInfo.value);
  const getVerificationInfo = computed(() => verificationInfo.value);
  const getPersonalData = computed(() => personalData.value);

  const clearSummary = () => {
    selectedCar.value = null;
    deliveryInfo.value = null;
    verificationInfo.value = null;
    personalData.value = null;
  };

  const formatPrice = (value: number | null | undefined) => {
    const n = Number(value ?? 0) || 0;
    return n.toLocaleString("pl-PL");
  };

  return {
    selectedCar: getSelectedCar,
    deliveryInfo: getDeliveryInfo,
    verificationInfo: getVerificationInfo,
    personalData: getPersonalData,
    setSelectedCar,
    setDeliveryInfo,
    setVerificationInfo,
    setPersonalData,
    clearSummary,
    formatPrice,
  };
};

