// src/theme/utils/glassMorphism.ts
import { ViewStyle, Platform } from 'react-native';
import { glassEffects } from '../tokens/effects';

export interface GlassMorphismOptions {
  variant?: 'light' | 'medium' | 'heavy';
  isDark?: boolean;
  blurAmount?: number;
  tintOpacity?: number;
  borderOpacity?: number;
  shadowOpacity?: number;
  customTint?: string;
}

export const glassMorphism = ({
  variant = 'medium',
  isDark = false,
  blurAmount,
  tintOpacity,
  borderOpacity,
  shadowOpacity,
  customTint,
}: GlassMorphismOptions = {}): ViewStyle => {
  const glass = glassEffects[variant];
  
  const blur = blurAmount ?? glass.blur_amount;
  const tint = tintOpacity ?? glass.tint_opacity;
  const border = borderOpacity ?? glass.border_opacity;
  const shadow = shadowOpacity ?? glass.shadow_opacity;
  
  // Platform-specific implementations
  if (Platform.OS === 'android') {
    // Android: Simple subtle background, no elevation/shadows that cause thick borders
    const backgroundColor = isDark
      ? `rgba(255, 255, 255, 0.03)` // Very subtle white on dark
      : `rgba(255, 255, 255, 0.15)`; // Subtle white on light
    
    return {
      backgroundColor,
      borderWidth: 0,
      borderRadius: 12,
      // No elevation, shadows, or other effects that create thick borders
      overflow: 'hidden' as const,
    };
  }
  
  // iOS: Can use borders and blur effects
  const lightTint = customTint || `rgba(255, 255, 255, ${tint * 0.7})`;
  const darkTint = customTint || `rgba(10, 10, 20, ${tint * 0.5})`;
  const tintColor = isDark ? darkTint : lightTint;
  
  const borderColor = isDark 
    ? `rgba(255, 255, 255, ${border * 0.2})`
    : `rgba(255, 255, 255, ${border * 0.3})`;
  
  return {
    backgroundColor: tintColor,
    // @ts-ignore - custom property for blur configuration
    blurAmount: blur,
    borderWidth: 1,
    borderColor,
    shadowColor: isDark ? '#000' : '#000',
    shadowOffset: {
      width: 0,
      height: variant === 'heavy' ? 8 : variant === 'medium' ? 4 : 2,
    },
    shadowOpacity: shadow,
    shadowRadius: variant === 'heavy' ? 16 : variant === 'medium' ? 8 : 4,
    elevation: variant === 'heavy' ? 12 : variant === 'medium' ? 6 : 3,
    overflow: 'visible' as const,
  };
};

// Glass variants preset
export const glassPresets = {
  card: (isDark: boolean): ViewStyle => glassMorphism({ 
    variant: 'light', 
    isDark,
    borderOpacity: 0.15,
  }),
  
  modal: (isDark: boolean): ViewStyle => glassMorphism({ 
    variant: 'medium', 
    isDark,
    shadowOpacity: 0.3,
  }),
  
  button: (isDark: boolean): ViewStyle => glassMorphism({ 
    variant: 'light', 
    isDark,
    tintOpacity: 0.3,
    borderOpacity: 0.2,
  }),
  
  navigation: (isDark: boolean): ViewStyle => glassMorphism({ 
    variant: 'heavy', 
    isDark,
    tintOpacity: 0.7,
  }),
  
  input: (isDark: boolean): ViewStyle => glassMorphism({ 
    variant: 'light', 
    isDark,
    tintOpacity: 0.2,
    borderOpacity: 0.25,
  }),
};

// Gradient utility for LinearGradient component
export const gradient = {
  glass: (isDark: boolean) => ({
    light: {
      colors: isDark
        ? ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.01)', 'rgba(255,255,255,0.01)', 'transparent']
        : ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)', 'transparent'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    medium: {
      colors: isDark
        ? ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)', 'transparent']
        : ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)', 'transparent'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    heavy: {
      colors: isDark
        ? ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)', 'transparent']
        : ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)', 'transparent'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  }),
  
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
};
