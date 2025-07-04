/**
 * Component sizing utilities
 * Centralizes common sizing logic to eliminate duplication
 */

import type { Theme } from '@/theme';

// Common size type for components
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * Get padding horizontal value based on component size
 * Used by ButtonBase, InputBase, and other components
 */
export const getPaddingHorizontal = (size: ComponentSize, theme: Theme): number => {
  const spacingMap = {
    sm: theme.spacing.sm,
    md: theme.spacing.md,
    lg: theme.spacing.lg,
  };

  return spacingMap[size];
};

/**
 * Get typography variant based on component size
 * Standardizes typography selection across components
 */
export const getTypographyVariant = (size: ComponentSize) => {
  const typographyMap = {
    sm: 'body_small' as const,
    md: 'body_medium' as const,
    lg: 'body_large' as const,
  };

  return typographyMap[size];
};

/**
 * Get component height from theme based on component type and size
 */
export const getComponentHeight = (
  type: 'button' | 'input',
  size: ComponentSize,
  theme: Theme,
): number => {
  return type === 'button' ? theme.sizes.buttons[size] : theme.sizes.inputs[size];
};

/**
 * Combined sizing utility that returns all common sizing values
 * Reduces repetitive code in components
 */
export const getComponentSizing = (
  type: 'button' | 'input',
  size: ComponentSize,
  theme: Theme,
) => ({
  height: getComponentHeight(type, size, theme),
  paddingHorizontal: getPaddingHorizontal(size, theme),
  typography: getTypographyVariant(size),
});
