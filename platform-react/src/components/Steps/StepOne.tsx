import React from "react";
import IntroComponent from "../MainPageComponents/IntroComponent";
import InfoComponent from "../InfoComponent/InfoComponent";
import PromoBanner from "../PromoBanner";
import OutroComponent from "../OutroComponent";

const StepOne: React.FC = () => {
  return (
    <div className="app-container mx-auto d-flex flex-column gap-4 gap-md-5">
      <IntroComponent />

      <InfoComponent />

      <PromoBanner />

      <OutroComponent />
    </div>
  );
};

export default StepOne;
