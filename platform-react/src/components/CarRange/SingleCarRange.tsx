import React, { useMemo, useRef } from 'react';
import ButtonComponent from '../common/ButtonComponent';
import CarModal from './CarModal';
import type { CarModalRef } from './CarModal';
import api from '../../config/api';
import type { Car, VersionData } from '../../types';

interface SingleCarRangeProps {
  car: Car;
}

const SingleCarRange: React.FC<SingleCarRangeProps> = ({ car }) => {
  const carModalRef = useRef<CarModalRef>(null);

  const formatPrice = (value: number) => {
    const n = Number(value ?? 0) || 0;
    return n.toLocaleString('pl-PL');
  };

  const extractImageString = (img: any): string => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    return '';
  };

  const getCarImage = () => {
    const img = extractImageString(car?.main_image || '');
    if (!img) return '';
    if (/^(https?:)?\/\//.test(img)) return img;
    if (img.includes('/storage/')) {
      try {
        const origin = String(api.defaults.baseURL).replace(/\/api\/?$/, '');
        return img.startsWith('/') ? origin + img : origin + '/' + img;
      } catch (e) {
        return img;
      }
    }
    try {
      return new URL(`../../assets/${img}`, import.meta.url).href;
    } catch (e) {
      return img;
    }
  };

  const selectedVersion = useMemo(() => {
    return (car.versions && car.versions.length > 0 && car.versions[0].id) ?? '';
  }, [car.versions]);

  const selectedPrice = useMemo(() => {
    if (!car.versions || car.versions.length === 0) return 0;
    const v = car.versions.find((x: VersionData | any) => String(x.id) === String(selectedVersion));
    return v?.price ?? 0;
  }, [car.versions, selectedVersion]);

  const handleOpenDialog = () => {
    carModalRef.current?.open();
  };

  return (
    <div
      className="card mx-auto w-100"
      style={{
        maxWidth: '368px',
        border: '1px solid var(--grey)',
        borderRadius: 'var(--border-radius)',
      }}
    >
      <img
        src={getCarImage()}
        alt={car.name}
        style={{ height: '200px', objectFit: 'cover' }}
        className="card-img-top d-block img-fluid"
      />
      <div className="card-body p-3 d-flex flex-column" style={{ rowGap: '7px' }}>
        <div
          className="d-flex flex-column fw-bold"
          style={{
            color: 'var(--navy)',
            fontSize: 'var(--fs-l)',
            rowGap: '3px',
          }}
        >
          <span>{car.name}</span>
          <span>od {formatPrice(selectedPrice)} zł</span>
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ fontSize: 'var(--fs-xs)', color: 'var(--dark-grey)' }}
        >
          <span>
            {car.drivetrain} • {car.range}km range
          </span>
          <ButtonComponent
            title="Sprawdź"
            width="88px"
            height="22px"
            fontSize="var(--fs-xxs)"
            onClick={handleOpenDialog}
          />
        </div>
      </div>
      <CarModal ref={carModalRef} car={car} />
    </div>
  );
};

export default SingleCarRange;
