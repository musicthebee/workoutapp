/**
 * Visual effects tokens
 * Glass effects, animations, borders, shadows
 */

// Glass morphism effects
export const glassEffects = {
  light: {
    blur_amount: 20,
    tint_opacity: 0.7,
    border_opacity: 0.2,
    shadow_opacity: 0.1,
  },
  medium: {
    blur_amount: 30,
    tint_opacity: 0.5,
    border_opacity: 0.15,
    shadow_opacity: 0.15,
  },
  heavy: {
    blur_amount: 40,
    tint_opacity: 0.3,
    border_opacity: 0.1,
    shadow_opacity: 0.2,
  },
} as const;

// Animation durations (ms)
export const animationDurations = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  crawl: 1000,
} as const;

// Spring animations (react-native-reanimated)
export const animationSprings = {
  // Snappy UI responses
  fast: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  // Balanced feel
  normal: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  // Smooth, deliberate
  slow: {
    damping: 20,
    stiffness: 90,
    mass: 1.2,
  },
  // Bouncy
  bouncy: {
    damping: 10,
    stiffness: 180,
    mass: 0.8,
  },
} as const;

// Easing curves (cubic-bezier)
export const animationEasings = {
  easeIn: [0.42, 0, 1, 1] as const,
  easeOut: [0, 0, 0.58, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
  linear: [0, 0, 1, 1] as const,
  easeInQuad: [0.55, 0.085, 0.68, 0.53] as const,
  easeOutQuad: [0.25, 0.46, 0.45, 0.94] as const,
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955] as const,
} as const;

// Border radii
export const borderRadii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const;

// Border widths
export const borderWidths = {
  none: 0,
  hairline: 0.5,
  thin: 1,
  medium: 2,
  thick: 4,
} as const;

// Shadow definitions
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.20,
    shadowRadius: 24,
    elevation: 12,
  },
  xxl: {
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
  },
} as const;

// Z-index layers
export const zIndices = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modalBackdrop: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  notification: 1600,
} as const;

// Type exports
export type GlassEffect = keyof typeof glassEffects;
export type AnimationDuration = keyof typeof animationDurations;
export type AnimationSpring = keyof typeof animationSprings;
export type AnimationEasing = keyof typeof animationEasings;
export type BorderRadius = keyof typeof borderRadii;
export type BorderWidth = keyof typeof borderWidths;
export type Shadow = keyof typeof shadows;
export type ZIndex = keyof typeof zIndices;
