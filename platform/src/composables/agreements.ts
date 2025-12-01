import { Ref, ref } from "vue";
import API from "../config/api";
import type { AgreementItem } from "../types";

const agreementsList = ref<AgreementItem[] | null>(null);
const isLoadingAgreementsList = ref(false);

export const useAgreements = (): {
  isLoadingAgreementsList: Ref<boolean>;
  getAgreementsList: () => Promise<void>;
  agreementsList: Ref<AgreementItem[] | null>;
} => {
  const getAgreementsList = async (): Promise<void> => {
    try {
      isLoadingAgreementsList.value = true;
      const response = await API.get("/agreements");
      agreementsList.value = response.data;
    } catch (error) {
      console.log(error);
    } finally {
      isLoadingAgreementsList.value = false;
    }
  };
  return {
    isLoadingAgreementsList,
    getAgreementsList,
    agreementsList,
  };
};
