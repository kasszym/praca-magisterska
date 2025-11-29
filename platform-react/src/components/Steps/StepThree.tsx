import React from 'react';
import Summary from '../Summary/Summary';
import Delivery from '../Delivery/Delivery';
import SectionCard from '../common/SectionCard';
import './StepThree.css';

const StepThree: React.FC = () => {
  return (
    <div className="step-three-container">
      <div className="step-three-delivery">
        <Delivery />
      </div>

      <SectionCard className="step-three-summary">
        <Summary />
      </SectionCard>
    </div>
  );
};

export default StepThree;
