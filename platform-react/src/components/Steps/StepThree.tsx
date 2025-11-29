import React from 'react';
import Summary from '../Summary/Summary';
import SectionCard from '../common/SectionCard';
import './StepThree.css';

const StepThree: React.FC = () => {
  return (
    <div className="step-three-container">
      <div className="step-three-delivery">
        <h2>Dostawa i weryfikacja</h2>
        <p>Delivery component coming soon...</p>
      </div>

      <SectionCard className="step-three-summary">
        <Summary />
      </SectionCard>
    </div>
  );
};

export default StepThree;
