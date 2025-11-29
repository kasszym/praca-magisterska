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
    <div className={`rounded-3 transition-surface ${isOpen ? 'is-open' : 'is-closed'}`}>
      <button
        type="button"
        className="w-100 d-flex justify-content-between align-items-center px-3 py-3 pb-3 rounded-3 border-0 bg-transparent focus-shadow-none gap-3"
        onClick={toggle}
      >
        <span
          className="fw-semibold text-start"
          style={{ fontSize: 'var(--fs-base, 16px)' }}
        >
          {title}
        </span>
        <span className="flex-shrink-0 d-flex align-items-center">
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
        className="overflow-hidden"
        style={{
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? '1' : '0',
          transition: 'all 200ms ease',
        }}
      >
        <div className="px-3 pt-3 pb-3 bg-white rounded-bottom-3">
          <span style={{ color: 'var(--black100)' }}>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleInfo;
