export const Colors = {
  // Primary brand colors
  primary: '#FF6B47', // Orange/coral from the button
  primaryDark: '#E55A3F',
  
  // Background colors
  background: '#F5F7FA', // Light background
  backgroundDark: '#1A1A1A',
  
  // Text colors
  text: '#2C3E50',
  textSecondary: '#7F8C8D',
  textLight: '#BDC3C7',
  
  // Input colors
  inputBackground: '#FFFFFF',
  inputBorder: '#E1E8ED',
  inputBorderFocus: '#FF6B47',
  
  // Status colors
  error: '#E74C3C',
  success: '#27AE60',
  warning: '#F39C12',
  info: '#3498DB',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F8F9FA',
    100: '#F1F3F4',
    200: '#E8EAED',
    300: '#DADCE0',
    400: '#BDC1C6',
    500: '#9AA0A6',
    600: '#80868B',
    700: '#5F6368',
    800: '#3C4043',
    900: '#202124',
  },
} as const;

export type ColorKey = keyof typeof Colors;