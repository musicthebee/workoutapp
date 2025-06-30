/**
 * Typography design tokens
 * ALL text styles MUST use these presets
 */

// Font families (using system fonts)
export const fontFamilies = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
} as const;

// Font sizes
export const fontSizes = {
  xxxs: 10,
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
  xxxxxl: 56,
} as const;

// Line heights (as multipliers)
export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

// Font weights
export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

// Letter spacing
export const letterSpacing = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
} as const;

// Typography presets
export const typographyPresets = {
  // Headings
  heading_1: {
    font_size: fontSizes.xxxxl,
    line_height: lineHeights.tight,
    font_weight: fontWeights.bold,
    letter_spacing: letterSpacing.tight,
  },
  heading_2: {
    font_size: fontSizes.xxxl,
    line_height: lineHeights.tight,
    font_weight: fontWeights.bold,
    letter_spacing: letterSpacing.tight,
  },
  heading_3: {
    font_size: fontSizes.xxl,
    line_height: lineHeights.normal,
    font_weight: fontWeights.semibold,
    letter_spacing: letterSpacing.normal,
  },
  heading_4: {
    font_size: fontSizes.xl,
    line_height: lineHeights.normal,
    font_weight: fontWeights.semibold,
    letter_spacing: letterSpacing.normal,
  },

  // Body text
  body_large: {
    font_size: fontSizes.lg,
    line_height: lineHeights.normal,
    font_weight: fontWeights.regular,
    letter_spacing: letterSpacing.normal,
  },
  body_medium: {
    font_size: fontSizes.md,
    line_height: lineHeights.normal,
    font_weight: fontWeights.regular,
    letter_spacing: letterSpacing.normal,
  },
  body_small: {
    font_size: fontSizes.sm,
    line_height: lineHeights.normal,
    font_weight: fontWeights.regular,
    letter_spacing: letterSpacing.normal,
  },

  // Button text
  button_large: {
    font_size: fontSizes.lg,
    line_height: lineHeights.tight,
    font_weight: fontWeights.semibold,
    letter_spacing: letterSpacing.wide,
  },
  button_medium: {
    font_size: fontSizes.md,
    line_height: lineHeights.tight,
    font_weight: fontWeights.semibold,
    letter_spacing: letterSpacing.wide,
  },
  button_small: {
    font_size: fontSizes.sm,
    line_height: lineHeights.tight,
    font_weight: fontWeights.medium,
    letter_spacing: letterSpacing.wide,
  },

  // Special text
  caption: {
    font_size: fontSizes.xs,
    line_height: lineHeights.normal,
    font_weight: fontWeights.regular,
    letter_spacing: letterSpacing.normal,
  },
  overline: {
    font_size: fontSizes.xxs,
    line_height: lineHeights.tight,
    font_weight: fontWeights.medium,
    letter_spacing: letterSpacing.widest,
  },
  
  // Workout-specific
  workout_timer: {
    font_size: fontSizes.xxxxxl,
    line_height: lineHeights.tight,
    font_weight: fontWeights.bold,
    letter_spacing: letterSpacing.tight,
  },
  workout_value: {
    font_size: fontSizes.xxxxl,
    line_height: lineHeights.tight,
    font_weight: fontWeights.bold,
    letter_spacing: letterSpacing.normal,
  },
  workout_label: {
    font_size: fontSizes.sm,
    line_height: lineHeights.normal,
    font_weight: fontWeights.medium,
    letter_spacing: letterSpacing.wide,
  },
} as const;

// Type exports
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
export type LetterSpacing = keyof typeof letterSpacing;
export type TypographyPreset = keyof typeof typographyPresets;
export type Typography = typeof typographyPresets[TypographyPreset];
