import React, { useState, useEffect, useMemo } from 'react';
import SingleCarRange from './SingleCarRange';
import CarSearchEngine from './CarSearchEngine';
import { useCar } from '../../hooks/useCar';
import './CarSearchEngine.css';

interface Filters {
  type: string;
  drive: string;
  priceMin: number | null;
  priceMax: number | null;
}

const CarRanges: React.FC = () => {
  const { getAll, carsList, typesList, drivesList, isLoadingCars, isLoadingTypes, isLoadingDrives } =
    useCar();

  const [filters, setFilters] = useState<Filters>({
    type: '',
    drive: '',
    priceMin: null,
    priceMax: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAll();
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [getAll]);

  useEffect(() => {
    if (carsList == null) {
      console.warn('carsList is null or undefined after fetch');
    }
  }, [carsList]);

  const getCarPrice = (car: any) => {
    const chosen = car.versions?.[0]?.title;
    const v = car.versions?.find((x: any) => x.title === chosen);
    return v?.price ?? 0;
  };

  const filteredCars = useMemo(() => {
    const { type, drive, priceMin, priceMax } = filters;

    const list = Array.isArray(carsList) ? carsList : [];

    return list.filter((car) => {
      if (type && String(car.fk_type) !== String(type)) return false;
      if (drive && String(car.fk_drive) !== String(drive)) return false;

      const price = getCarPrice(car);

      if (priceMin != null && priceMin !== 0 && price < Number(priceMin))
        return false;
      if (priceMax != null && priceMax !== 0 && price > Number(priceMax))
        return false;

      return true;
    });
  }, [carsList, filters]);

  const applyFilter = (payload: Filters) => {
    setFilters(payload);
  };

  return (
    <div>
      {isLoadingCars && (
        <div className="d-flex justify-content-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      <h2 className="fs-3 fw-bold text-navy mb-3">Gama naszych samochodów</h2>

      <div className="d-flex flex-column gap-3">
        <CarSearchEngine
          typesList={typesList}
          drivesList={drivesList}
          isLoadingTypes={isLoadingTypes}
          isLoadingDrives={isLoadingDrives}
          onFilter={applyFilter}
        />

        {filteredCars.length > 0 ? (
          <div className="row gx-5 gy-4 justify-content-center">
            {filteredCars.map((car, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-lg-4 d-flex"
              >
                <SingleCarRange car={car} />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-muted small">Brak wyników</span>
        )}
      </div>
    </div>
  );
};

export default CarRanges;
