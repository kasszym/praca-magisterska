import React from 'react';
import TheSeparator from '../common/TheSeparator';

interface CarFeaturesProps {
  acceleration: string | number;
  max_speed: string | number;
  charging: string | number;
  trunk_capacity: string | number;
  guarantee: string | number;
}

const CarFeatures: React.FC<CarFeaturesProps> = ({
  acceleration,
  max_speed,
  charging,
  trunk_capacity,
  guarantee,
}) => {
  const features = [
    {
      label: '0–100 km/h',
      value: `${acceleration}s`,
    },
    {
      label: 'Maksymalna prędkość',
      value: `${max_speed} km/h`,
    },
    {
      label: 'Ładowanie',
      value: `${charging} kW DC`,
    },
    {
      label: 'Pojemność bagażnika',
      value: `${trunk_capacity} L`,
    },
    {
      label: 'Gwarancja',
      value: `${guarantee} lat`,
    },
  ];

  return (
    <div className="d-flex flex-column gap-2">
      <span style={{ color: 'var(--navy)', fontSize: 'var(--fs-base)', fontWeight: 700 }}>
        Kluczowe cechy
      </span>
      <TheSeparator />

      <div className="d-flex flex-column gap-2 mt-1" style={{ marginBottom: '55px' }}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="d-flex justify-content-between"
            style={{ fontSize: 'var(--fs-s)' }}
          >
            <span style={{ color: 'var(--dark-grey)' }}>{feature.label}</span>
            <span style={{ color: 'var(--navy)' }}>{feature.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarFeatures;
