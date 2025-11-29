import { useState } from 'react';
import api from '../config/api';

interface Agreement {
  id: number;
  title: string;
  label: string;
  content: string;
  is_required: boolean;
}

let agreementsListState: Agreement[] | null = null;

export const useAgreements = () => {
  const [isLoadingAgreementsList, setIsLoadingAgreementsList] = useState(false);
  const [agreementsList, setAgreementsList] = useState<Agreement[] | null>(agreementsListState);

  const getAgreementsList = async () => {
    try {
      setIsLoadingAgreementsList(true);
      const response = await api.get('/agreements');
      agreementsListState = response.data;
      setAgreementsList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingAgreementsList(false);
    }
  };

  return {
    isLoadingAgreementsList,
    getAgreementsList,
    agreementsList,
  };
};
