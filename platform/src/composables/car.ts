import { Ref, ref } from "vue";
import API from "../config/api";

const typesList = ref<any[] | null>(null);
const drivesList = ref<any[] | null>(null);
const isLoadingTypes = ref(false);
const isLoadingDrives = ref(false);

export const useCar = (): {
  isLoadingTypes: Ref<boolean>;
  isLoadingDrives: Ref<boolean>;
  getTypes: () => Promise<void>;
  typesList: Ref<any[] | null>;
  drivesList: Ref<any[] | null>;
} => {
  const getTypes = async (): Promise<void> => {
    try {
      isLoadingTypes.value = true;
      isLoadingDrives.value = true;
      const [t, d] = await Promise.all([API.get("/types"), API.get("/drives")]);
      typesList.value = t.data;
      drivesList.value = d.data;
    } catch (err) {
      console.error(err);
    } finally {
      isLoadingTypes.value = false;
      isLoadingDrives.value = false;
    }
  };

  return {
    isLoadingTypes,
    isLoadingDrives,
    getTypes,
    typesList,
    drivesList,
  };
};
