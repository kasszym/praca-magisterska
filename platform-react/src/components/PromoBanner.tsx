import React from 'react';
import ButtonComponent from './common/ButtonComponent';
import './PromoBanner.css';

const PromoBanner: React.FC = () => {
  return (
    <div className="promo-banner">
      <span className="promo-text">
        Poczuj przyszłość jazdy z Aureon.
      </span>

      <ButtonComponent
        title="Umów się na jazdę próbną"
        width="256px"
        backgroundColor="#fff"
        color="var(--main-color)"
        fontSize="var(--fs-s)"
      />
    </div>
  );
};

export default PromoBanner;
