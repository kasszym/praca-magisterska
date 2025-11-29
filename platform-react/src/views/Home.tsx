import React, { useState } from 'react';
import Steps from '../components/Steps/Steps';
import StepOne from '../components/Steps/StepOne';
import StepTwo from '../components/Steps/StepTwo';
import StepThree from '../components/Steps/StepThree';

const Home: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleStepUpdate = (stepId: number) => {
    setActiveStep(stepId);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return <StepOne />;
    }
  };

  return (
    <main className="container-fluid px-3" style={{ margin: '32px auto 18px auto' }}>
      <Steps active={activeStep} onUpdate={handleStepUpdate}>
        {renderStepContent()}
      </Steps>
    </main>
  );
};

export default Home;
