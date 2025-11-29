import React, { useRef } from 'react';
import MainForm from '../MainForm/MainForm';
import type { MainFormRef } from '../MainForm/MainForm';
import Agreements from '../Agreements/Agreements';
import type { AgreementsRef } from '../Agreements/Agreements';
import Summary from '../Summary/Summary';
import SectionCard from '../common/SectionCard';
import './StepTwo.css';

const StepTwo: React.FC = () => {
  const formRef = useRef<MainFormRef>(null);
  const agreementsRef = useRef<AgreementsRef>(null);

  return (
    <div className="step-two-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <SectionCard>
          <MainForm ref={formRef} />
        </SectionCard>
        <SectionCard>
          <Agreements ref={agreementsRef} />
        </SectionCard>
      </div>
      <SectionCard className="step-two-summary">
        <Summary />
      </SectionCard>
    </div>
  );
};

export default StepTwo;
