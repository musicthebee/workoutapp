// src/theme/utils/glassMorphism.ts
import { ViewStyle, Platform } from 'react-native';
import { glassEffects, glassPresets as glassPresetTokens, gradients } from '../tokens/effects';

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
  
  // iOS: Full glass effect with borders and shadows
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

// Helper functions that use centralized tokens from effects.ts

// Glass preset utility functions (using centralized tokens)
export const getGlassPreset = (preset: keyof typeof glassPresetTokens, isDark: boolean): ViewStyle => {
  const presetConfig = glassPresetTokens[preset];
  return glassMorphism({ 
    ...presetConfig,
    isDark,
  });
};

// Simplified gradient utility using centralized tokens
export const gradient = {
  glass: (isDark: boolean) => {
    return Object.fromEntries(
      Object.entries(gradients.glass).map(([variant, config]) => [
        variant,
        {
          ...config,
          colors: config.colors[isDark ? 'dark' : 'light'],
        },
      ])
    );
  },
  orb: gradients.orb,
};
