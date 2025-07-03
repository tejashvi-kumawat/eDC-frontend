import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const darkKnightTheme = {
  colors: {
    primary: '#0071e3',
    primaryDark: '#0056b3',
    secondary: '#1d1d1f',
    accent: '#007aff',
    success: '#32d74b',
    warning: '#ff9f0a',
    danger: '#ff453a',
    
    background: '#000000',
    surface: '#1c1c1e',
    surfaceLight: '#2c2c2e',
    surfaceSecondary: '#3a3a3c',
    
    text: {
      primary: '#ffffff',
      secondary: '#a1a1a6',
      tertiary: '#636366',
      inverse: '#000000'
    },
    
    gradients: {
      primary: 'linear-gradient(135deg, #007aff 0%, #0056b3 100%)',
      dark: 'linear-gradient(135deg, #1c1c1e 0%, #000000 100%)',
      glow: 'linear-gradient(135deg, #007aff20 0%, #0056b320 100%)',
      card: 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)'
    },
    
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 32px rgba(0, 0, 0, 0.5)',
      xl: '0 16px 64px rgba(0, 0, 0, 0.6)',
      glow: '0 0 20px rgba(0, 122, 255, 0.3)'
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem'
  },
  
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '50%'
  },
  
  transitions: {
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    base: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

const ThemeContext = createContext(darkKnightTheme);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={darkKnightTheme}>
      <StyledThemeProvider theme={darkKnightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
