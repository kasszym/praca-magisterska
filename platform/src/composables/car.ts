import { Ref, ref } from "vue";
import API from "../config/api";

const typesList = ref<any[] | null>(null);
const drivesList = ref<any[] | null>(null);
const carsList = ref<any[] | null>(null);
const isLoadingTypes = ref(false);
const isLoadingDrives = ref(false);
const isLoadingCars = ref(false);

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
      carsList.value = res.data;
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
      carsList.value = c.data;
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
