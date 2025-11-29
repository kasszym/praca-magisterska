import React, { useState, useMemo, useEffect } from 'react';
import api from '../../config/api';

interface CarGalleryProps {
  images: string[];
}

const CarGallery: React.FC<CarGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(images) || images.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  const current = useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) return null;
    const idx = Math.max(0, Math.min(currentIndex, images.length - 1));
    return images[idx] || null;
  }, [images, currentIndex]);

  const filteredImages = useMemo(
    () =>
      (Array.isArray(images) ? images : [])
        .map((img, idx) => ({ img, idx }))
        .filter((t) => t.idx !== currentIndex),
    [images, currentIndex]
  );

  const select = (idx: number) => setCurrentIndex(idx);
  const next = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prev = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  const extractImageString = (img: any): string => {
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

  const getCarImage = (img: any): string => {
    const resolved = extractImageString(img);
    if (!resolved) return '';
    if (/^(https?:)?\/\//.test(resolved)) return resolved;
    if (resolved.includes('/storage/')) {
      try {
        const origin = String(api.defaults.baseURL).replace(/\/api\/?$/, '');
        return resolved.startsWith('/') ? origin + resolved : origin + '/' + resolved;
      } catch (e) {
        return resolved;
      }
    }
    try {
      return new URL(`../../assets/${resolved}`, import.meta.url).href;
    } catch (e) {
      return resolved;
    }
  };

  const placeholder = (() => {
    try {
      return new URL(`../../assets/mainCarImage.png`, import.meta.url).href;
    } catch (e) {
      return '';
    }
  })();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div
        className="position-relative overflow-hidden main-image"
        style={{ borderRadius: '8px' }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {current && (
          <img
            style={{ objectFit: 'cover', borderRadius: '8px' }}
            src={getCarImage(current)}
            onError={(e) => {
              e.currentTarget.src = placeholder;
            }}
            alt="Zdjęcie samochodu"
            className="w-100 d-block"
            loading="eager"
          />
        )}
      </div>
      <div className="d-flex flex-wrap images-wrap">
        {filteredImages.map((t) => (
          <button
            key={t.img}
            type="button"
            className="p-0 border-0 bg-transparent overflow-hidden thumb-btn"
            style={{ borderRadius: '8px' }}
            onClick={() => select(t.idx)}
          >
            <img
              src={getCarImage(t.img)}
              onError={(e) => {
                e.currentTarget.src = placeholder;
              }}
              alt="Miniatura"
              className="d-block thumb-image"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarGallery;
