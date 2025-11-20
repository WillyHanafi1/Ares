'use client';

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#06b6d4', // cyan-500
      light: '#22d3ee', // cyan-400
      dark: '#0891b2', // cyan-600
    },
    secondary: {
      main: '#a855f7', // purple-500
      light: '#c084fc', // purple-400
      dark: '#9333ea', // purple-600
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 32px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
