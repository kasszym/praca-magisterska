import React, { useState, useMemo } from 'react';
import ButtonComponent from '../common/ButtonComponent';
import { useSummary } from '../../hooks/useSummary';
import './CarCustomization.css';

interface CarVersion {
  id: number;
  title?: string;
  titile?: string;
  name?: string;
  price: number;
}

interface CarColor {
  id: number;
  name: string;
  value: string;
}

interface CarAdditional {
  id: number;
  title: string;
  price: number;
}

interface Car {
  id: number;
  name: string;
  versions?: CarVersion[];
  colors?: CarColor[];
  additionals?: CarAdditional[];
}

interface CarCustomizationProps {
  car: Car;
  onClose: () => void;
}

const CarCustomization: React.FC<CarCustomizationProps> = ({ car, onClose }) => {
  const { setSelectedCar } = useSummary();

  const [version, setVersion] = useState<number | null>(car.versions?.[0]?.id ?? null);
  const [selectedAddonIds, setSelectedAddonIds] = useState<number[]>([]);
  const [color, setColor] = useState<number | null>(car.colors?.[0]?.id ?? null);

  const basePrice = useMemo(() => {
    const versions = car.versions || [];
    const v = versions.find((x) => x.id === version);
    return Number(v?.price) || 0;
  }, [car.versions, version]);

  const selectedAddons = useMemo(() => {
    const ids = selectedAddonIds.map((id) => Number(id));
    return (car.additionals || []).filter((a) => ids.includes(Number(a.id)));
  }, [car.additionals, selectedAddonIds]);

  const addonsTotal = useMemo(
    () => selectedAddons.reduce((sum, a) => sum + (Number(a.price) || 0), 0),
    [selectedAddons]
  );

  const totalPrice = useMemo(() => basePrice + addonsTotal, [basePrice, addonsTotal]);

  const formatPrice = (value: number) => {
    const n = Number(value ?? 0) || 0;
    return n.toLocaleString('pl-PL');
  };

  const toggleAddon = (addonId: number) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const saveToSummary = () => {
    if (version != null && color != null) {
      const versionLabel =
        car.versions?.find((x) => x.id === version)?.title ||
        car.versions?.find((x) => x.id === version)?.titile ||
        '';
      const colorLabel = car.colors?.find((c) => c.id === color)?.name || '';
      const payload = {
        car_id: car.id,
        version_id: version,
        color_id: color,
        addon_ids: selectedAddonIds.map((id) => Number(id)),
        name: car.name,
        version: versionLabel,
        color: colorLabel,
        addons: selectedAddons.map((a) => ({
          id: a.id,
          title: a.title,
          price: a.price ?? 0,
        })),
        price: totalPrice,
      };
      setSelectedCar(payload);
      onClose();
    }
  };

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-column gap-2">
        <span className="car-customization-label">Wersja</span>
        <div className="version-group">
          {car.versions?.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`version-btn ${version === v.id ? 'active' : ''}`}
              onClick={() => setVersion(v.id)}
            >
              {v.title || v.titile || v.name}
            </button>
          ))}
        </div>
      </div>

      <div className="d-flex flex-column gap-2">
        <span className="car-customization-label">Kolor</span>
        <div className="color-swatches">
          {car.colors?.map((c) => (
            <label key={c.id} className={`color-swatch ${color === c.id ? 'checked' : ''}`}>
              <input
                type="radio"
                name="color"
                checked={color === c.id}
                onChange={() => setColor(c.id)}
                style={{ display: 'none' }}
              />
              <span
                className="color-dot"
                style={{
                  backgroundColor: c.value,
                  border: `1px solid ${c.value}`,
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="d-flex flex-column gap-2">
        <span className="car-customization-label">Dodatki</span>
        <div className="addon-group">
          {car.additionals?.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`addon-btn ${selectedAddonIds.includes(a.id) ? 'active' : ''}`}
              onClick={() => toggleAddon(a.id)}
            >
              {a.title}
            </button>
          ))}
        </div>
      </div>

      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-column">
          <span className="car-customization-label">Cena</span>
          <span className="fw-bold fs-4" style={{ color: 'var(--navy)' }}>
            {formatPrice(totalPrice)} zł
          </span>
        </div>

        <ButtonComponent
          title="Wybierz"
          width="100%"
          backgroundColor="var(--pink)"
          backgroundColorHover="var(--dark-pink)"
          height="40px"
          onClick={saveToSummary}
        />
      </div>
    </div>
  );
};

export default CarCustomization;
