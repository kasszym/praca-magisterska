import React, { useImperativeHandle, forwardRef } from 'react';
import Modal from '../common/Modal';
import SectionCard from '../common/SectionCard';
import CarGallery from './CarGallery';
import CarCustomization from './CarCustomization';
import CarFeatures from './CarFeatures';
import './CarGallery.css';
import './CarModal.css';
import type { Car } from '../../types';

interface CarModalProps {
  car: Car;
}

export interface CarModalRef {
  open: () => void;
  close: () => void;
}

const CarModal = forwardRef<CarModalRef, CarModalProps>(({ car }, ref) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const open = () => setIsDialogOpen(true);
  const close = () => setIsDialogOpen(false);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal isOpen={isDialogOpen} onClose={close} title={car.name ?? ''}>
      <div className="car-modal">
        <div className="car-gallery">
          <CarGallery images={car.images ?? []} />
        </div>
        <div className="d-flex flex-column gap-3">
          <SectionCard padding="16px 14px">
            <CarCustomization car={car} onClose={close} />
          </SectionCard>
          <SectionCard padding="16px 14px">
            <CarFeatures
              acceleration={car.acceleration_0_100_s || '0'}
              max_speed={car.max_speed_kmh || '0'}
              charging={car.charging || '0'}
              trunk_capacity={car.trunk_capacity || '0'}
              guarantee={car.guarantee || '0'}
            />
          </SectionCard>
        </div>
      </div>
    </Modal>
  );
});

CarModal.displayName = 'CarModal';

export default CarModal;
