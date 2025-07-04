/**
 * Spacing design tokens
 * ALL spacing values MUST come from this file
 */

// Base spacing scale
export const spacing = {
  xxxs: 2, // Hairline
  xxs: 4, // Tiny
  xs: 8, // Extra small
  sm: 12, // Small
  md: 16, // Medium (base)
  lg: 24, // Large
  xl: 32, // Extra large
  xxl: 48, // Huge
  xxxl: 64, // Massive
  xxxxl: 80, // Giant
  xxxxxl: 96, // Colossal
} as const;

// Component-specific spacing
export const componentSpacing = {
  // Screen padding
  screenPaddingHorizontal: spacing.md,
  screenPaddingVertical: spacing.lg,

  // Card spacing
  cardPadding: spacing.md,
  cardGap: spacing.sm,

  // List spacing
  listItemPadding: spacing.sm,
  listItemGap: spacing.xs,
  listSectionGap: spacing.xl,

  // Form spacing
  formFieldGap: spacing.lg,
  formSectionGap: spacing.xl,
  labelGap: spacing.xs,

  // Button spacing
  buttonPaddingHorizontal: spacing.lg,
  buttonPaddingVertical: spacing.sm,
  buttonGap: spacing.md,

  // Modal spacing
  modalPadding: spacing.lg,
  modalHeaderHeight: 60, // Fixed
  modalFooterPadding: spacing.md,
} as const;

// Touch target sizes (minimum)
export const touchTargets = {
  minimum: 44, // iOS HIG minimum
  small: 48, // Small controls
  medium: 56, // Standard controls
  large: 64, // Primary actions
  huge: 80, // Active workout buttons
  massive: 100, // Critical actions
} as const;

// Icon sizes
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
  xxxl: 56,
} as const;

// Type exports
export type SpacingScale = typeof spacing;
export type SpacingKey = keyof SpacingScale;
export type TouchTargetSize = keyof typeof touchTargets;
export type IconSize = keyof typeof iconSizes;
