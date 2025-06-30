/**
 * Color design tokens
 * ALL colors in the app MUST come from this file
 */

// Base color palette
export const baseColors = {
  // Primary Palette (Blue)
  primary_50: '#E3F2FD',
  primary_100: '#BBDEFB',
  primary_200: '#90CAF9',
  primary_300: '#64B5F6',
  primary_400: '#42A5F5',
  primary_500: '#2196F3',
  primary_600: '#1E88E5',
  primary_700: '#1976D2',
  primary_800: '#1565C0',
  primary_900: '#0D47A1',

  // Secondary Palette (Purple)
  secondary_50: '#F3E5F5',
  secondary_100: '#E1BEE7',
  secondary_200: '#CE93D8',
  secondary_300: '#BA68C8',
  secondary_400: '#AB47BC',
  secondary_500: '#9C27B0',
  secondary_600: '#8E24AA',
  secondary_700: '#7B1FA2',
  secondary_800: '#6A1B9A',
  secondary_900: '#4A148C',

  // Neutral Palette
  neutral_0: '#FFFFFF',
  neutral_50: '#FAFAFA',
  neutral_100: '#F5F5F5',
  neutral_200: '#EEEEEE',
  neutral_300: '#E0E0E0',
  neutral_400: '#BDBDBD',
  neutral_500: '#9E9E9E',
  neutral_600: '#757575',
  neutral_700: '#616161',
  neutral_800: '#424242',
  neutral_900: '#212121',
  neutral_1000: '#000000',

  // Semantic Colors
  success_light: '#81C784',
  success_main: '#4CAF50',
  success_dark: '#388E3C',

  warning_light: '#FFD54F',
  warning_main: '#FFC107',
  warning_dark: '#F57C00',

  error_light: '#E57373',
  error_main: '#F44336',
  error_dark: '#D32F2F',

  info_light: '#64B5F6',
  info_main: '#2196F3',
  info_dark: '#1976D2',
} as const;

// Light theme colors
export const lightThemeColors = {
  // Primary brand colors
  primary: baseColors.primary_500,
  secondary: baseColors.secondary_500,
  
  // Semantic colors
  success: baseColors.success_main,
  warning: baseColors.warning_main,
  error: baseColors.error_main,
  info: baseColors.info_main,
  
  // Backgrounds
  background: baseColors.neutral_50,
  surface: baseColors.neutral_0,
  elevated: baseColors.neutral_0,
  
  // Borders
  border: baseColors.neutral_200,
  divider: baseColors.neutral_100,
  
  // Text colors
  text_primary: baseColors.neutral_900,
  text_secondary: baseColors.neutral_700,
  text_tertiary: baseColors.neutral_500,
  text_disabled: baseColors.neutral_400,
  text_inverse: baseColors.neutral_0,
  
  // Glass effects
  glass_light: 'rgba(255, 255, 255, 0.7)',
  glass_medium: 'rgba(255, 255, 255, 0.5)',
  glass_heavy: 'rgba(255, 255, 255, 0.3)',
  glass_border: 'rgba(255, 255, 255, 0.2)',
  
  // Shadows
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Special states
  overlay: 'rgba(0, 0, 0, 0.5)',
  scrim: 'rgba(0, 0, 0, 0.32)',
  
  // Semantic extended
  success_light: baseColors.success_light,
  success_dark: baseColors.success_dark,
  warning_light: baseColors.warning_light,
  warning_dark: baseColors.warning_dark,
  error_light: baseColors.error_light,
  error_dark: baseColors.error_dark,
  info_light: baseColors.info_light,
  info_dark: baseColors.info_dark,
} as const;

// Dark theme colors
export const darkThemeColors = {
  // Primary brand colors
  primary: baseColors.primary_400,
  secondary: baseColors.secondary_400,
  
  // Semantic colors
  success: baseColors.success_main,
  warning: baseColors.warning_main,
  error: baseColors.error_main,
  info: baseColors.info_main,
  
  // Backgrounds
  background: baseColors.neutral_900,
  surface: baseColors.neutral_800,
  elevated: baseColors.neutral_800,
  
  // Borders
  border: baseColors.neutral_700,
  divider: baseColors.neutral_800,
  
  // Text colors
  text_primary: baseColors.neutral_0,
  text_secondary: baseColors.neutral_200,
  text_tertiary: baseColors.neutral_400,
  text_disabled: baseColors.neutral_600,
  text_inverse: baseColors.neutral_900,
  
  // Glass effects
  glass_light: 'rgba(0, 0, 0, 0.7)',
  glass_medium: 'rgba(0, 0, 0, 0.5)',
  glass_heavy: 'rgba(0, 0, 0, 0.3)',
  glass_border: 'rgba(255, 255, 255, 0.1)',
  
  // Shadows
  shadow: 'rgba(0, 0, 0, 0.3)',
  
  // Special states
  overlay: 'rgba(0, 0, 0, 0.7)',
  scrim: 'rgba(0, 0, 0, 0.5)',
  
  // Semantic extended
  success_light: baseColors.success_light,
  success_dark: baseColors.success_dark,
  warning_light: baseColors.warning_light,
  warning_dark: baseColors.warning_dark,
  error_light: baseColors.error_light,
  error_dark: baseColors.error_dark,
  info_light: baseColors.info_light,
  info_dark: baseColors.info_dark,
} as const;

// Type exports
export type ThemeColors = typeof lightThemeColors;
export type ColorName = keyof ThemeColors;
