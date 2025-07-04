import { useContext } from 'react';

import { ThemeContext } from '@/contexts/ThemeContext';
import type { Theme } from '../index';

/**
 * Hook to access the current theme
 * Must be used within ThemeProvider
 */
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context.theme;
};

/**
 * Hook to access theme controls
 * Includes theme toggle functionality
 */
export const useThemeControls = (): {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
} => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeControls must be used within ThemeProvider');
  }

  return context;
};

/**
 * Helper hook to get specific theme tokens
 */
export const useThemeToken = <K extends keyof Theme>(key: K): Theme[K] => {
  const theme = useTheme();
  return theme[key];
};

/**
 * Helper hook for responsive values based on theme
 */
export const useThemeValue = <T>(lightValue: T, darkValue: T): T => {
  const { isDark } = useThemeControls();
  return isDark ? darkValue : lightValue;
};
