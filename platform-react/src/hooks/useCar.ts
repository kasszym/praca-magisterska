import { useState, useCallback } from 'react';
import api from '../config/api';

interface CarVersion {
  id: number;
  title: string;
  price: number;
}

interface Car {
  id: number;
  name: string;
  fk_type: number;
  fk_drive: number;
  drivetrain: string;
  range: number;
  main_image: string;
  images: string[];
  versions?: CarVersion[];
  acceleration_0_100_s?: string;
  max_speed_kmh?: string;
  charging?: string;
  trunk_capacity?: string;
  guarantee?: string;
}

interface Type {
  id: number;
  name: string;
}

interface Drive {
  id: number;
  titile: string;
}

const pickImageString = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object') {
    return (
      img.path ||
      img.url ||
      img.filename ||
      img.name ||
      img.src ||
      img.file ||
      img.main_image ||
      img.title ||
      ''
    );
  }
  return '';
};

const normalizeCar = (car: any): Car => {
  const images = Array.isArray(car.images)
    ? car.images.map(pickImageString).filter(Boolean)
    : [];
  const main_image = pickImageString(car.main_image);

  const finalImages = images.length ? images : main_image ? [main_image] : [];
  return { ...car, images: finalImages, main_image };
};

export const useCar = () => {
  const [typesList, setTypesList] = useState<Type[] | null>(null);
  const [drivesList, setDrivesList] = useState<Drive[] | null>(null);
  const [carsList, setCarsList] = useState<Car[] | null>(null);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [isLoadingDrives, setIsLoadingDrives] = useState(false);
  const [isLoadingCars, setIsLoadingCars] = useState(false);

  const getCars = useCallback(async () => {
    try {
      setIsLoadingCars(true);
      const res = await api.get('/cars');
      setCarsList(
        Array.isArray(res.data) ? res.data.map(normalizeCar) : []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingCars(false);
    }
  }, []);

  const getAll = useCallback(async () => {
    try {
      setIsLoadingTypes(true);
      setIsLoadingDrives(true);
      setIsLoadingCars(true);

      const [t, d, c] = await Promise.all([
        api.get('/types'),
        api.get('/drives'),
        api.get('/cars'),
      ]);

      setTypesList(t.data);
      setDrivesList(d.data);
      setCarsList(Array.isArray(c.data) ? c.data.map(normalizeCar) : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTypes(false);
      setIsLoadingDrives(false);
      setIsLoadingCars(false);
    }
  }, []);

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
