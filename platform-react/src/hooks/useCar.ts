import { useState, useCallback } from 'react';
import api from '../config/api';
import type { Car, CarImage, TypeItem, DriveItem } from '../types';

const pickImageString = (img: string | CarImage | null | undefined): string => {
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
    ? car.images.map((i: string | CarImage) => pickImageString(i)).filter(Boolean)
    : [];
  const main_image = pickImageString(car.main_image as string | CarImage | null | undefined);

  const finalImages = images.length ? images : main_image ? [main_image] : [];
  return { ...car, images: finalImages, main_image } as Car;
};

export const useCar = () => {
  const [typesList, setTypesList] = useState<TypeItem[] | null>(null);
  const [drivesList, setDrivesList] = useState<DriveItem[] | null>(null);
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
