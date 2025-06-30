/**
 * Main theme export
 * Combines all design tokens into a single theme object
 */

import { lightThemeColors, darkThemeColors } from './tokens/colors';
import { spacing, componentSpacing, touchTargets, iconSizes } from './tokens/spacing';
import { typographyPresets } from './tokens/typography';
import {
  glassEffects,
  skiaBlurEffects,
  animationDurations,
  animationSprings,
  animationEasings,
  borderRadii,
  borderWidths,
  shadows,
  zIndices,
  gradients,
} from './tokens/effects';

// Theme interface
export interface Theme {
  readonly colors: typeof lightThemeColors | typeof darkThemeColors;
  readonly spacing: typeof spacing;
  readonly componentSpacing: typeof componentSpacing;
  readonly typography: typeof typographyPresets;
  readonly glass: typeof glassEffects;
  readonly skiaBlur: typeof skiaBlurEffects;
  readonly animation: {
    readonly durations: typeof animationDurations;
    readonly springs: typeof animationSprings;
    readonly easings: typeof animationEasings;
  };
  readonly borders: {
    readonly radii: typeof borderRadii;
    readonly widths: typeof borderWidths;
  };
  readonly shadows: typeof shadows;
  readonly sizes: {
    readonly touchTargets: typeof touchTargets;
    readonly icons: typeof iconSizes;
    readonly buttons: {
      readonly sm: number;
      readonly md: number;
      readonly lg: number;
    };
    readonly inputs: {
      readonly sm: number;
      readonly md: number;
      readonly lg: number;
    };
  };
  readonly zIndices: typeof zIndices;
  readonly gradients: typeof gradients;
  readonly isDark: boolean;
}

// Create theme function
export const createTheme = (isDark: boolean): Theme => ({
  colors: isDark ? darkThemeColors : lightThemeColors,
  spacing,
  componentSpacing,
  typography: typographyPresets,
  glass: glassEffects,
  skiaBlur: skiaBlurEffects,
  animation: {
    durations: animationDurations,
    springs: animationSprings,
    easings: animationEasings,
  },
  borders: {
    radii: borderRadii,
    widths: borderWidths,
  },
  shadows,
  sizes: {
    touchTargets,
    icons: iconSizes,
    buttons: {
      sm: 36,
      md: 44,
      lg: 56,
    },
    inputs: {
      sm: 36,
      md: 44,
      lg: 56,
    },
  },
  zIndices,
  gradients,
  isDark,
});

// Export all tokens for direct access if needed
export * from './tokens/colors';
export * from './tokens/spacing';
export * from './tokens/typography';
export * from './tokens/effects';
