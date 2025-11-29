import React, { useRef } from 'react';
import MainForm from '../MainForm/MainForm';
import type { MainFormRef } from '../MainForm/MainForm';
import Agreements from '../Agreements/Agreements';
import type { AgreementsRef } from '../Agreements/Agreements';

const StepTwo: React.FC = () => {
  const formRef = useRef<MainFormRef>(null);
  const agreementsRef = useRef<AgreementsRef>(null);

  const handleValidation = () => {
    const isFormValid = formRef.current?.validateForm();
    const areAgreementsValid = agreementsRef.current?.validateForm();
    
    if (isFormValid && areAgreementsValid) {
      console.log('Form is valid!');
      const agreementsData = agreementsRef.current?.getFormValues();
      console.log('Selected agreements:', agreementsData);
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="step-content">
      <MainForm ref={formRef} />
      <Agreements ref={agreementsRef} />
    </div>
  );
};

export default StepTwo;
