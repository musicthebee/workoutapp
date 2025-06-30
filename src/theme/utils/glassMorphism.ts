// src/theme/utils/glassMorphism.ts
import { ViewStyle } from 'react-native';
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
  
  // Dynamic values based on theme
  const blur = blurAmount ?? glass.blur_amount;
  const tint = tintOpacity ?? glass.tint_opacity;
  const border = borderOpacity ?? glass.border_opacity;
  const shadow = shadowOpacity ?? glass.shadow_opacity;
  
  // Tint colors - use customTint if provided
  const lightTint = customTint || `rgba(255, 255, 255, ${tint * 0.7})`;
  const darkTint = customTint || `rgba(10, 10, 20, ${tint * 0.5})`;
  const tintColor = isDark ? darkTint : lightTint;
  
  // Border colors
  const borderColor = isDark 
    ? `rgba(255, 255, 255, ${border * 2})`
    : `rgba(255, 255, 255, ${border * 3})`;
  
  return {
    // Glass background - use the calculated tintColor
    backgroundColor: tintColor,
    
    // Include blur amount for use with BlurView
    // @ts-ignore - custom property for blur configuration
    blurAmount: blur,
    
    // Border for definition
    borderWidth: 1,
    borderColor,
    
    // Shadow for depth
    shadowColor: isDark ? '#000' : '#000',
    shadowOffset: {
      width: 0,
      height: variant === 'heavy' ? 8 : variant === 'medium' ? 4 : 2,
    },
    shadowOpacity: shadow,
    shadowRadius: variant === 'heavy' ? 16 : variant === 'medium' ? 8 : 4,
    elevation: variant === 'heavy' ? 12 : variant === 'medium' ? 6 : 3,
    
    // Ensure overflow is visible for shadow
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
        ? ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)', 'rgba(0,0,0,0.1)']
        : ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    medium: {
      colors: isDark
        ? ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)', 'rgba(0,0,0,0.15)']
        : ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    heavy: {
      colors: isDark
        ? ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.2)']
        : ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)'],
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
