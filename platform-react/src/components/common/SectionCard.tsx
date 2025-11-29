import React from 'react';
import './SectionCard.css';

interface SectionCardProps {
  padding?: string;
  maxWidth?: string;
  className?: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  padding = '28px', 
  maxWidth = '100%',
  className = '',
  children 
}) => {
  return (
    <div
      className={`section-card ${className}`}
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
