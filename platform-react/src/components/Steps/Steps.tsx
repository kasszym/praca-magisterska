import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { stepsData } from './stepsData';
import './Steps.css';

interface StepsProps {
  active: number;
  onUpdate: (stepId: number) => void;
  children: React.ReactNode;
}

const Steps: React.FC<StepsProps> = ({ active, onUpdate, children }) => {
  return (
    <div className="TheSteps">
      <div className="TheSteps__container">
        <div className="TheSteps__step-counter">Krok {active}/3</div>

        <div className="TheSteps__steps">
          {stepsData.map((step, i) => (
            <div
              key={step.id}
              data-testid={`the-steps-${step.id}`}
              className={`TheSteps__step ${
                active > step.id
                  ? 'TheSteps__step--checked'
                  : active === step.id
                  ? 'TheSteps__step--active'
                  : ''
              }`}
            >
              {i !== 0 && (
                <svg
                  width="62"
                  height="14"
                  viewBox="0 0 62 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="6.5"
                    width="59"
                    height="1"
                    rx="0.5"
                    fill={active >= step.id ? '#00AA00' : '#B6B6B6'}
                    stroke="#B6B6B6"
                  />
                  <path
                    d="M56.7071 1.29289L56 0.585786L54.5858 2L55.2929 2.70711L56.7071 1.29289ZM61 7L61.7071 7.70711C62.0976 7.31658 62.0976 6.68342 61.7071 6.29289L61 7ZM55.2929 11.2929L54.5858 12L56 13.4142L56.7071 12.7071L55.2929 11.2929ZM55.2929 2.70711L60.2929 7.70711L61.7071 6.29289L56.7071 1.29289L55.2929 2.70711ZM60.2929 6.29289L55.2929 11.2929L56.7071 12.7071L61.7071 7.70711L60.2929 6.29289Z"
                    fill="#B6B6B6"
                  />
                </svg>
              )}

              <div className="TheSteps__box-wrapper">
                <div className="TheSteps__box" onClick={() => onUpdate(step.id)}>
                  <span>
                    {active > step.id ? (
                      <FaCheck size={16} />
                    ) : (
                      <div>{step.id}</div>
                    )}
                  </span>
                  <div className="TheSteps__title">{step.title}</div>
                </div>
              </div>

              <div className="TheSteps__mobile">
                <div
                  className={`TheSteps__mobile-container ${
                    active >= step.id
                      ? 'TheSteps__mobile-container-pink'
                      : 'TheSteps__mobile-container-grey'
                  }`}
                  onClick={() => onUpdate(step.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="TheSteps__content">{children}</div>
      </div>
    </div>
  );
};

export default Steps;
