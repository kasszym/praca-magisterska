import React from 'react';
import SectionCard from '../common/SectionCard';
import ButtonComponent from '../common/ButtonComponent';
import carImage from '../../assets/car.png';
import './IntroComponent.css';

const IntroComponent: React.FC = () => {
  return (
    <SectionCard>
      <div className="intro-row">
        <div className="intro-content-col">
          <div className="intro-content">
            <span className="headline">Moc spotyka efektywność</span>
            <span className="subhead">
              Odkryj nową linię Aureon e-Line – zaprojektowaną z myślą o
              mieście i długich trasach
            </span>
            <span className="bodycopy">
              Aureon e-Line to zupełnie nowa generacja samochodów
              elektrycznych, łączących dynamiczne osiągi z wyjątkową
              energooszczędnością. <br />
              Zaprojektowana w oparciu o najnowsze technologie, oferuje nie
              tylko imponujący zasięg, ale też komfort jazdy na najwyższym
              poziomie. Nowoczesne systemy wspomagania kierowcy sprawiają, że
              każda podróż staje się bezpieczniejsza i bardziej intuicyjna.
              <br />
              Elegancka sylwetka i dopracowane detale nadwozia podkreślają
              charakter premium marki Aureon.
            </span>

            <div className="button-wrapper">
              <ButtonComponent title="Sprawdź szczegóły" width="195px" />
            </div>
          </div>
        </div>

        <div className="intro-image-col">
          <div className="image-wrap">
            <img
              src={carImage}
              alt="car"
              className="car-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default IntroComponent;
