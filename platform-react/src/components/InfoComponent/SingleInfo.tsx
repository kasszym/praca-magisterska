import React, { useState } from 'react';
import './SingleInfo.css';

interface SingleInfoProps {
  title: string;
  description: string;
  open?: boolean;
}

const SingleInfo: React.FC<SingleInfoProps> = ({ title, description, open = false }) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`single-info ${isOpen ? 'is-open' : 'is-closed'}`}>
      <button
        type="button"
        className="single-info-button"
        onClick={toggle}
      >
        <span className="single-info-title">
          {title}
        </span>
        <span className="single-info-icon">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transition: 'transform 200ms ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transformOrigin: 'center',
            }}
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="var(--black100)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className="single-info-content"
        style={{
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? '1' : '0',
          transition: 'all 200ms ease',
        }}
      >
        <div className="single-info-inner">
          <span style={{ color: 'var(--black100)' }}>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleInfo;
