import React, { useState } from 'react';
import './ButtonComponent.css';

interface ButtonComponentProps {
  title: string;
  onClick?: () => void;
  backgroundColor?: string;
  backgroundColorHover?: string;
  color?: string;
  colorHover?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: number;
  border?: string;
  borderHover?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onClick,
  backgroundColor = 'var(--main-color)',
  backgroundColorHover = 'var(--dark-pink)',
  color = '#FFFFFF',
  colorHover = '#FFFFFF',
  width = '195px',
  height = '44px',
  fontSize = 'var(--fs-xs)',
  fontWeight = 700,
  border = 'none',
  borderHover = 'none',
  type = 'button',
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type={type}
      className="button-component"
      style={{
        background: isHover ? backgroundColorHover : backgroundColor,
        color: isHover ? colorHover : color,
        width,
        height,
        fontSize,
        fontWeight,
        border: isHover ? borderHover : border,
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonComponent;
