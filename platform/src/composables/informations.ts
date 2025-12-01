import { Ref, ref } from "vue";
import API from "../config/api";
import type { InformationItem } from "../types";

const informationsList = ref<InformationItem[] | null>(null);
const isLoadingInformationsList = ref(false);

export const useInformations = (): {
  isLoadingInformationsList: Ref<boolean>;
  getInformationsList: () => Promise<void>;
  informationsList: Ref<InformationItem[] | null>;
} => {
  const getInformationsList = async (): Promise<void> => {
    try {
      isLoadingInformationsList.value = true;
      const response = await API.get("/informations");
      informationsList.value = response.data;
    } catch (error) {
      console.log(error);
    } finally {
      isLoadingInformationsList.value = false;
    }
  };
  return {
    isLoadingInformationsList,
    getInformationsList,
    informationsList,
  };
};
