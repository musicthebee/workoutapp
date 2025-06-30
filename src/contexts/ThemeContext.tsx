import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createTheme, type Theme } from '@/theme';

/**
 * Theme context value interface
 */
interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * Theme context
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme persistence key
 */
const THEME_STORAGE_KEY = '@workout_tracker/theme_preference';

/**
 * Theme provider props
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component
 * Manages theme state and persistence
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(systemColorScheme);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async (): Promise<void> => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setColorScheme(savedTheme);
        } else {
          // Use system preference if no saved preference
          setColorScheme(systemColorScheme);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
        setColorScheme(systemColorScheme);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, [systemColorScheme]);

  // Toggle theme
  const toggleTheme = async (): Promise<void> => {
    const newScheme: ColorSchemeName = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
    
    // Save preference
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newScheme || 'light');
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Create theme object
  const isDark = colorScheme === 'dark';
  const theme = createTheme(isDark);

  const value: ThemeContextValue = {
    theme,
    isDark,
    toggleTheme,
  };

  // Don't render until theme is loaded to prevent flash
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
