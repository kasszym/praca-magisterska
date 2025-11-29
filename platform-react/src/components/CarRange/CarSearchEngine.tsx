import React, { useState } from 'react';
import SectionCard from '../common/SectionCard';
import ButtonComponent from '../common/ButtonComponent';

interface CarSearchEngineProps {
  typesList: Array<{ id: number; name: string }> | null;
  drivesList: Array<{ id: number; titile: string }> | null;
  isLoadingTypes: boolean;
  isLoadingDrives: boolean;
  onFilter: (filters: {
    type: string;
    drive: string;
    priceMin: number | null;
    priceMax: number | null;
  }) => void;
}

const CarSearchEngine: React.FC<CarSearchEngineProps> = ({
  typesList,
  drivesList,
  isLoadingTypes,
  isLoadingDrives,
  onFilter,
}) => {
  const [chosenType, setChosenType] = useState<string>('');
  const [chosenDrive, setChosenDrive] = useState<string>('');
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      type: chosenType,
      drive: chosenDrive,
      priceMin,
      priceMax,
    });
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D+/g, '');
  };

  return (
    <SectionCard>
      <form
        onSubmit={handleSubmit}
        className="filters-form d-flex justify-content-between align-items-center w-100"
        style={{ gap: '16px' }}
      >
        <div className="filters row g-3 align-items-center flex-nowrap">
          <div className="field col-auto d-flex align-items-center gap-2">
            <label className="label m-0">Typ</label>
            <select
              className="form-select car-select"
              value={chosenType}
              onChange={(e) => setChosenType(e.target.value)}
              disabled={isLoadingTypes}
              style={{ width: '160px', height: '36px' }}
            >
              <option value="">Wybierz</option>
              {typesList?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field col-auto d-flex align-items-center gap-2">
            <label className="label m-0">Napęd</label>
            <select
              className="form-select car-select"
              value={chosenDrive}
              onChange={(e) => setChosenDrive(e.target.value)}
              disabled={isLoadingDrives}
              style={{ width: '160px', height: '36px' }}
            >
              <option value="">Wybierz</option>
              {drivesList?.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.titile}
                </option>
              ))}
            </select>
          </div>

          <div className="field price col-auto d-flex align-items-center gap-2">
            <label className="label m-0">Cena</label>
            <div className="range-group d-inline-flex align-items-center gap-2">
              <input
                type="number"
                className="input"
                placeholder="min"
                value={priceMin || ''}
                onChange={(e) =>
                  setPriceMin(e.target.value ? Number(e.target.value) : null)
                }
                onInput={handleNumberInput}
              />
              <span className="dash">-</span>
              <input
                type="number"
                className="input"
                placeholder="max"
                value={priceMax || ''}
                onChange={(e) =>
                  setPriceMax(e.target.value ? Number(e.target.value) : null)
                }
                onInput={handleNumberInput}
              />
            </div>
          </div>
        </div>

        <div className="btn-wrap me-3">
          <ButtonComponent
            type="submit"
            title="Filtruj"
            width="135px"
            backgroundColor="var(--pink)"
            backgroundColorHover="var(--dark-pink)"
          />
        </div>
      </form>
    </SectionCard>
  );
};

export default CarSearchEngine;
