import { ref } from 'vue';
import API from '../config/api';

import type { CarData, ColorData } from '../types';

const isLoading = ref(false);

export const useResponseGenerator = () => {
  const generateResponse = async (intentName: string, carName: string | null = null): Promise<string> => {
    try {
      isLoading.value = true;

      switch (intentName) {
        case 'ask_price':
          return await generatePriceResponse(carName);
        case 'ask_range':
          return await generateRangeResponse(carName);
        case 'ask_colors':
          return await generateColorsResponse();
        case 'ask_specs':
          return await generateSpecsResponse(carName);
        default:
          return 'Przepraszam, nie rozumiem. Możesz zapytać o ceny, zasięg, kolory lub specyfikację naszych samochodów.';
      }
    } catch (error: any) {
      console.error('Error generating response:', error);
      return 'Przepraszam, wystąpił błąd. Spróbuj ponownie za chwilę.';
    } finally {
      isLoading.value = false;
    }
  };

  const generatePriceResponse = async (carName: string | null): Promise<string> => {
    const res = carName
      ? await API.get('/chatbot/car-data', { params: { car_name: carName } })
      : await API.get('/chatbot/car-data');

    const data = res.data;
    const cars: CarData[] = Array.isArray(data) ? data : [data];

    if (carName) {
      const car = cars.find(c => (c.name || '').toLowerCase().includes(carName.toLowerCase()));
      if (car && Array.isArray(car.versions) && car.versions.length > 0) {
        const priceList = car.versions
          .map(v => `${v.name || 'wersja'}: ${(v.price ?? 0).toLocaleString('pl-PL')} zł`)
          .join(', ');
        return `${car.name} jest dostępny w następujących wersjach: ${priceList}`;
      }
      return `Nie znalazłem informacji o cenie dla ${carName}. Sprawdź nazwę modelu.`;
    }

    const allPrices = cars.map(car => {
      const versions = Array.isArray(car.versions) ? car.versions : [];
      const prices = versions.map(v => v.price ?? 0);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      return `${car.name || 'Model'} od ${minPrice.toLocaleString('pl-PL')} zł`;
    }).join(', ');

    return `Nasze modele: ${allPrices}. O który model chcesz dowiedzieć się więcej?`;
  };

  const generateRangeResponse = async (carName: string | null): Promise<string> => {
    const res = carName
      ? await API.get('/chatbot/car-data', { params: { car_name: carName } })
      : await API.get('/chatbot/car-data');

    const data = res.data;
    const cars: CarData[] = Array.isArray(data) ? data : [data];

    if (carName) {
  const car = cars.find(c => (c.name || '').toLowerCase().includes(carName.toLowerCase()));
      if (car) {
        return `${car.name} ma zasięg ${car.range ?? '—'} km z baterią ${car.battery_capacity ?? '—'} kWh.`;
      }
      return `Nie znalazłem informacji o zasięgu dla ${carName}. Sprawdź nazwę modelu.`;
    }

    const allRanges = cars.map(car => `${car.name}: ${car.range} km`).join(', ');
    return `Zasięg naszych modeli: ${allRanges}`;
  };

  const generateColorsResponse = async (): Promise<string> => {
    const res = await API.get('/chatbot/colors');
    const colors: ColorData[] = res.data;

    const colorList = colors.map(c => c.name).join(', ');
    return `Dostępne kolory: ${colorList}. Każdy kolor dodaje wyjątkowego charakteru Twojemu Aureon!`;
  };

  const generateSpecsResponse = async (carName: string | null): Promise<string> => {
    const res = carName
      ? await API.get('/chatbot/car-data', { params: { car_name: carName } })
      : await API.get('/chatbot/car-data');

    const data = res.data;
    const cars: CarData[] = Array.isArray(data) ? data : [data];

    if (carName) {
      const car = cars.find(c => (c.name || '').toLowerCase().includes(carName.toLowerCase()));
      if (car) {
        return `${car.name || 'Model'} - Typ: ${car.type}, Napęd: ${car.drive}, Zasięg: ${car.range ?? '—'} km, Bateria: ${car.battery_capacity ?? '—'} kWh, Moc: ${car.power ?? '—'} KM`;
      }
      return `Nie znalazłem specyfikacji dla ${carName}. Sprawdź nazwę modelu.`;
    }

    const allModels = ['Aureon E-City', 'Aureon PX', 'Aureon GT Sport', 'Aureon Lux Sedan'];
    return `O którym modelu chcesz poznać specyfikację? Dostępne modele: ${allModels.join(', ')}.`;
  };

  return {
    generateResponse,
    isLoading,
  };
};