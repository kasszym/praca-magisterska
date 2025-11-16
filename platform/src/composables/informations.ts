import { Ref, ref } from "vue";
import API from "../config/api";

const informationsList = ref<any[] | null>(null);
const isLoadingInformationsList = ref(false);

export const useInformations = (): {
  isLoadingInformationsList: Ref<boolean>;
  getInformationsList: () => Promise<void>;
  informationsList: Ref<any[] | null>;
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
