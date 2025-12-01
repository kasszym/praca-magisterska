import { Ref, ref } from "vue";
import API from "../config/api";
import type { Car, CarImage, TypeItem, DriveItem } from "../types";

const typesList = ref<TypeItem[] | null>(null);
const drivesList = ref<DriveItem[] | null>(null);
const carsList = ref<Car[] | null>(null);
const isLoadingTypes = ref(false);
const isLoadingDrives = ref(false);
const isLoadingCars = ref(false);

const pickImageString = (img: string | CarImage | null | undefined): string => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object") {
    return (
      img.path || img.url || img.filename || img.name || img.src || img.file || img.main_image || img.title || ""
    );
  }
  return "";
};

const normalizeCar = (car: any): Car => {
  const images = Array.isArray(car.images) ? car.images.map((i: string | CarImage) => pickImageString(i)).filter(Boolean) : [];
  const main_image = pickImageString(car.main_image as string | CarImage | null | undefined);

  const finalImages = images.length ? images : main_image ? [main_image] : [];
  return { ...car, images: finalImages, main_image } as Car;
};

export const useCar = (): {
  isLoadingTypes: Ref<boolean>;
  isLoadingDrives: Ref<boolean>;
  isLoadingCars: Ref<boolean>;
  getCars: () => Promise<void>;
  getAll: () => Promise<void>;
  typesList: Ref<TypeItem[] | null>;
  drivesList: Ref<DriveItem[] | null>;
  carsList: Ref<Car[] | null>;
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
