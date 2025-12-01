import { createTheme } from '@mui/material/styles';

function readCssVar(name: string, fallback: string) {
  if (typeof window === 'undefined' || !window?.getComputedStyle) return fallback;
  try {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name);
    return (val || '').trim() || fallback;
  } catch (e) {
    return fallback;
  }
}

export function getMuiTheme() {
  const main = readCssVar('--main-color', '#540863');
  const mainHover = readCssVar('--main-hover-color', '#3d0548');
  const pink = readCssVar('--pink', '#92487A');
  const font = readCssVar('--font-inter', 'Inter, sans-serif');

  return createTheme({
    palette: {
      primary: { main, contrastText: '#fff' },
      secondary: { main: pink, contrastText: '#fff' },
    },
    typography: {
      fontFamily: font,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
          },
          containedPrimary: {
            backgroundColor: main,
            '&:hover': {
              backgroundColor: mainHover,
            },
          },
        },
      },
    },
  });
}

export default getMuiTheme;
