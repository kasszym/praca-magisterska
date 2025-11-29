import React from 'react';
import './SectionCard.css';

interface SectionCardProps {
  padding?: string;
  maxWidth?: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  padding = '28px', 
  maxWidth = '100%',
  children 
}) => {
  return (
    <div
      className="section-card"
      style={{
        padding,
        maxWidth,
      }}
    >
      {children}
    </div>
  );
};

export default SectionCard;
