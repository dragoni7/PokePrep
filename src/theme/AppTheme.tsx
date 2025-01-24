import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

interface AppThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions['components'];
}

declare module '@mui/material/styles' {
  interface PaletteColor {
    surface?: string;
    highlight?: string;
  }

  interface SimplePaletteColorOptions {
    surface?: string;
    highlight?: string;
  }
}

export default function AppTheme(props: AppThemeProps) {
  const { children } = props;
  return (
    <ThemeProvider
      theme={createTheme({
        cssVariables: {
          colorSchemeSelector: 'data-mui-color-scheme',
        },
        typography: {
          fontFamily: 'Cabin',
        },
        palette: {
          mode: 'dark',
          primary: {
            main: '#fff',
            surface: '#0b1c38',
            highlight: 'rgba(0,0,0,0.1)',
          },
          secondary: {
            main: '#fcdf14',
          },
          background: {
            default: '#0e6a8f',
            paper: 'rgba(0,0,0,0.45)',
          },
          divider: 'rgba(0,0,0,0.1)',
        },
        components: {
          MuiAccordion: {
            styleOverrides: {
              root: {
                borderRadius: 4,
                '&.Mui-disabled': {
                  backgroundColor: '#0b1c38',
                },
              },
            },
          },

          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      })}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
