import React, { useRef } from 'react';
import MainForm from '../MainForm/MainForm';
import type { MainFormRef } from '../MainForm/MainForm';

const StepTwo: React.FC = () => {
  const formRef = useRef<MainFormRef>(null);
  

  return (
    <div className="step-content">
      <MainForm ref={formRef} />
    </div>
  );
};

export default StepTwo;
