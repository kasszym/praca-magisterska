import { Ref, ref } from "vue";
import API from "../config/api";

const typesList = ref<any[] | null>(null);
const drivesList = ref<any[] | null>(null);
const carsList = ref<any[] | null>(null);
const isLoadingTypes = ref(false);
const isLoadingDrives = ref(false);
const isLoadingCars = ref(false);

const pickImageString = (img: any) => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object") {
    return (
      img.path || img.url || img.filename || img.name || img.src || img.file || img.main_image || img.title || ""
    );
  }
  return "";
};

const normalizeCar = (car: any) => {
  const images = Array.isArray(car.images) ? car.images.map(pickImageString).filter(Boolean) : [];
  const main_image = pickImageString(car.main_image);

  const finalImages = images.length ? images : main_image ? [main_image] : [];
  return { ...car, images: finalImages, main_image };
};

export const useCar = (): {
  isLoadingTypes: Ref<boolean>;
  isLoadingDrives: Ref<boolean>;
  isLoadingCars: Ref<boolean>;
  getCars: () => Promise<void>;
  getAll: () => Promise<void>;
  typesList: Ref<any[] | null>;
  drivesList: Ref<any[] | null>;
  carsList: Ref<any[] | null>;
} => {
  const getCars = async (): Promise<void> => {
    try {
      isLoadingCars.value = true;
      const res = await API.get("/cars");
      carsList.value = Array.isArray(res.data) ? res.data.map(normalizeCar) : [];
    } catch (err) {
      console.error(err);
    } finally {
      isLoadingCars.value = false;
    }
  };

  const getAll = async (): Promise<void> => {
    try {
      isLoadingTypes.value = true;
      isLoadingDrives.value = true;
      isLoadingCars.value = true;

      const [t, d, c] = await Promise.all([API.get("/types"), API.get("/drives"), API.get("/cars")]);

  typesList.value = t.data;
  drivesList.value = d.data;
  carsList.value = Array.isArray(c.data) ? c.data.map(normalizeCar) : [];
    } catch (err) {
      console.error(err);
    } finally {
      isLoadingTypes.value = false;
      isLoadingDrives.value = false;
      isLoadingCars.value = false;
    }
  };

  return {
    isLoadingTypes,
    isLoadingDrives,
    isLoadingCars,
    getCars,
    getAll,
    typesList,
    drivesList,
    carsList,
  };
};
