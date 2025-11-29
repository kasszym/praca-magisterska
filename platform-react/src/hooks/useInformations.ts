import { useState } from 'react';
import API from '../config/api';

interface Information {
  id: number;
  title: string;
  content: string;
}

export const useInformations = () => {
  const [informationsList, setInformationsList] = useState<Information[] | null>(null);
  const [isLoadingInformationsList, setIsLoadingInformationsList] = useState(false);

  const getInformationsList = async (): Promise<void> => {
    try {
      setIsLoadingInformationsList(true);
      const response = await API.get('/informations');
      setInformationsList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingInformationsList(false);
    }
  };

  return {
    isLoadingInformationsList,
    getInformationsList,
    informationsList,
  };
};
