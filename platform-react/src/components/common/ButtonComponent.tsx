import React from 'react';
import Button from '@mui/material/Button';

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
  backgroundColor = 'primary',
  width = '195px',
  height = '44px',
  fontSize = 'var(--fs-xs)',
  fontWeight = 700,
  border = 'none',
  type = 'button',
}) => {
  const muiColors = ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'];
  const isMuiColor = muiColors.includes(backgroundColor || '');

  return (
    <Button
      type={type}
      onClick={onClick}
      variant={border === 'none' ? 'contained' : 'outlined'}
      color={isMuiColor ? (backgroundColor as any) : 'inherit'}
      sx={(theme) => ({
        width,
        height,
        fontSize,
        fontWeight,
        textTransform: 'none',
        border: border === 'none' ? undefined : border,
        ...(isMuiColor
          ? {}
          : (() => {
              const isCssVar = typeof backgroundColor === 'string' && (/var\(|--/).test(backgroundColor);
              let contrast: string | undefined = undefined;
              if (!isCssVar) {
                try {
                  contrast = theme.palette.getContrastText(backgroundColor || '#000');
                } catch (e) {
   
                  contrast = undefined;
                }
              }
              return {
             
                backgroundColor: backgroundColor,
                ...(contrast ? { color: contrast } : {}),
                '&:hover': {
                  backgroundColor: backgroundColor,
                  opacity: 0.9,
                },
              };
            })()),
      })}
    >
      {title}
    </Button>
  );
};

export default ButtonComponent;
