/**
 * Theme helper utilities
 * Centralizes common theme operations to eliminate duplication
 */

import type { Theme } from '@/theme';
import type { TypographyPreset } from '@/theme/tokens/typography';
import type { TextColor } from '@/types';

/**
 * Get text color value from theme based on color name
 * Centralizes the color mapping logic used across text components
 */
export const getTextColor = (color: TextColor, theme: Theme): string => {
  const colorMap = {
    primary: theme.colors.text_primary,
    secondary: theme.colors.text_secondary,
    tertiary: theme.colors.text_tertiary,
    inverse: theme.colors.text_inverse,
    error: theme.colors.error,
    success: theme.colors.success,
    warning: theme.colors.warning,
    info: theme.colors.info,
  };
  
  return colorMap[color];
};

/**
 * Get typography configuration from theme
 * Includes safety check and warning for undefined variants
 */
export const getTypographyConfig = (variant: TypographyPreset, theme: Theme) => {
  const typography = theme.typography[variant];
  
  if (!typography) {
    console.warn(`Typography variant "${variant}" not found in theme`);
    return null;
  }
  
  return typography;
};

/**
 * Generate complete text style object from typography variant
 * Combines font properties into ready-to-use style
 */
export const getTextStyle = (
  variant: TypographyPreset,
  color: TextColor,
  align: 'left' | 'center' | 'right',
  theme: Theme
) => {
  const typography = getTypographyConfig(variant, theme);
  
  if (!typography) {
    return null;
  }
  
  return {
    fontSize: typography.font_size,
    lineHeight: typography.font_size * typography.line_height,
    fontWeight: typography.font_weight as any,
    letterSpacing: typography.letter_spacing,
    color: getTextColor(color, theme),
    textAlign: align,
  };
};

/**
 * Helper to get semantic colors consistently
 * Used for status indicators, buttons, etc.
 */
export const getSemanticColor = (
  type: 'success' | 'error' | 'warning' | 'info',
  variant: 'main' | 'light' | 'dark',
  theme: Theme
): string => {
  const colorKey = `${type}_${variant}` as keyof typeof theme.colors;
  return theme.colors[colorKey] || theme.colors[type];
};