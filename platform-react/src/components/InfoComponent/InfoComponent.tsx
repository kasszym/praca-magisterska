import React, { useEffect } from 'react';
import SingleInfo from './SingleInfo';
import { useInformations } from '../../hooks/useInformations';
import './InfoComponent.css';

const InfoComponent: React.FC = () => {
  const { isLoadingInformationsList, getInformationsList, informationsList } = useInformations();

  useEffect(() => {
    getInformationsList();
  }, []);

  if (isLoadingInformationsList) {
    return (
      <div className="info-component-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="info-component">
      {informationsList?.map((info, index) => (
        <SingleInfo
          key={index}
          title={info.title}
          description={info.content}
        />
      ))}
    </div>
  );
};

export default InfoComponent;
