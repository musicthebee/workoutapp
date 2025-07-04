// src/theme/tokens/effects.ts
/**
 * Visual effects tokens
 * Glass effects, animations, borders, shadows
 */

// Glass morphism effects - Based on NexAI approach
export const glassEffects = {
  light: {
    blur_amount: 10, // Lower blur for subtle effect
    tint_opacity: 0.3, // Low opacity for maximum translucency
    border_opacity: 0.2, // Visible but subtle border
    shadow_opacity: 0.1, // Light shadow
  },
  medium: {
    blur_amount: 20, // Medium blur for balanced effect
    tint_opacity: 0.5, // Moderate opacity
    border_opacity: 0.15, // Subtle border
    shadow_opacity: 0.15, // Medium shadow
  },
  heavy: {
    blur_amount: 30, // High blur for strong effect
    tint_opacity: 0.7, // Higher opacity but still translucent
    border_opacity: 0.1, // Very subtle border
    shadow_opacity: 0.2, // Stronger shadow
  },
} as const;

// Animation configurations
export const animationConfig = {
  // Easing functions
  easing: {
    spring: {
      responsive: {
        damping: 15,
        stiffness: 150,
        mass: 1,
      },
      bouncy: {
        damping: 10,
        stiffness: 180,
        mass: 0.8,
      },
      smooth: {
        damping: 20,
        stiffness: 90,
        mass: 1.2,
      },
    },
    timing: {
      fast: { duration: 150 },
      normal: { duration: 300 },
      slow: { duration: 500 },
      crawl: { duration: 1000 },
      ambient: { duration: 3000 },
    },
  },

  // Complex animations
  sequences: {
    fadeInScale: {
      from: { opacity: 0, scale: 0.9 },
      to: { opacity: 1, scale: 1 },
      duration: 300,
    },
    slideInBottom: {
      from: { translateY: 100, opacity: 0 },
      to: { translateY: 0, opacity: 1 },
      duration: 400,
    },
    glow: {
      loop: true,
      sequence: [
        { opacity: 0.3, duration: 2000 },
        { opacity: 0.6, duration: 2000 },
      ],
    },
    shimmer: {
      loop: true,
      from: { translateX: -200 },
      to: { translateX: 200 },
      duration: 3000,
    },
  },
} as const;

// Glass component presets (moved from glassMorphism.ts for centralization)
export const glassPresets = {
  card: { variant: 'light' as const, borderOpacity: 0.15 },
  modal: { variant: 'medium' as const, shadowOpacity: 0.3 },
  button: { variant: 'light' as const, tintOpacity: 0.3, borderOpacity: 0.2 },
  navigation: { variant: 'heavy' as const, tintOpacity: 0.7 },
  input: { variant: 'light' as const, tintOpacity: 0.2, borderOpacity: 0.25 },
} as const;

// Gradient definitions (consolidated from glassMorphism.ts)
export const gradients = {
  // Glass gradients with LinearGradient configurations
  glass: {
    light: {
      colors: {
        light: ['rgba(255,255,255,0.2)', 'transparent'],
        dark: ['rgba(255,255,255,0.05)', 'transparent'],
      },
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    medium: {
      colors: {
        light: ['rgba(255,255,255,0.15)', 'transparent'],
        dark: ['rgba(255,255,255,0.08)', 'transparent'],
      },
      start: { x: 0, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    heavy: {
      colors: {
        light: ['rgba(255,255,255,0.1)', 'transparent'],
        dark: ['rgba(255,255,255,0.1)', 'transparent'],
      },
      start: { x: 0, y: 0 },
      end: { x: 0.3, y: 1 },
    },
  },

  // Orb gradients
  orb: {
    primary: {
      colors: ['rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 0.1)', 'transparent'],
      start: { x: 0.5, y: 0.5 },
      end: { x: 1, y: 1 },
    },
    secondary: {
      colors: ['rgba(249, 115, 22, 0.3)', 'rgba(249, 115, 22, 0.1)', 'transparent'],
      start: { x: 0.5, y: 0.5 },
      end: { x: 1, y: 1 },
    },
    accent: {
      colors: ['rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.1)', 'transparent'],
      start: { x: 0.5, y: 0.5 },
      end: { x: 1, y: 1 },
    },
  },

  // Color gradients
  primary: ['#6366F1', '#4F46E5', '#4338CA'],
  secondary: ['#F97316', '#EA580C', '#DC2626'],
  accent: ['#8B5CF6', '#7C3AED', '#6D28D9'],
  success: ['#10B981', '#059669', '#047857'],

  // Special effects
  shimmer: ['transparent', 'rgba(255,255,255,0.3)', 'transparent'],
  glow: ['transparent', 'rgba(255,255,255,0.2)', 'transparent'],
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

// Enhanced shadow definitions
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
    shadowOpacity: 0.1,
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
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  // Glass-specific shadows
  glass: {
    light: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    medium: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
    heavy: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 10,
    },
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

// Skia blur effects for compatibility
export const skiaBlurEffects = {
  light: 10,
  medium: 20,
  heavy: 30,
} as const;

// Simplified exports using centralized animationConfig (removes duplication)
export const animationDurations = animationConfig.easing.timing;
export const animationSprings = animationConfig.easing.spring;
export const animationEasings = animationConfig.easing;

// Type exports
export type GlassEffect = keyof typeof glassEffects;
export type GlassPreset = keyof typeof glassPresets;
export type AnimationConfig = typeof animationConfig;
export type Gradient = keyof typeof gradients;
export type BorderRadius = keyof typeof borderRadii;
export type BorderWidth = keyof typeof borderWidths;
export type Shadow = keyof typeof shadows;
export type ZIndex = keyof typeof zIndices;
