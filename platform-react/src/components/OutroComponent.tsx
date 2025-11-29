import React from 'react';
import outroImage from '../assets/outro-image.png';
import './OutroComponent.css';

const OutroComponent: React.FC = () => {
  return (
    <div className="outro-component">
      <img
        src={outroImage}
        alt="volutra car"
        className="outro-image"
      />

      <span className="outro-text">
        Postaw na innowację. Postaw na Aureon.
      </span>
    </div>
  );
};

export default OutroComponent;
