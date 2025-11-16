import { ref, computed } from "vue";

interface SelectedCar {
  name: string;
  version: string;
  color: string;
  addons: Array<{ title: string; price: number }>;
  price: number;
}

const selectedCar = ref<SelectedCar | null>(null);

export const useSummary = () => {
  const setSelectedCar = (car: SelectedCar) => {
    selectedCar.value = car;
  };

  const getSelectedCar = computed(() => selectedCar.value);

  const clearSummary = () => {
    selectedCar.value = null;
  };

  const formatPrice = (value: number | null | undefined) => {
    const n = Number(value ?? 0) || 0;
    return n.toLocaleString("pl-PL");
  };

  return {
    selectedCar: getSelectedCar,
    setSelectedCar,
    clearSummary,
    formatPrice,
  };
};

