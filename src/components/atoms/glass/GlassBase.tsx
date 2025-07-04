// src/components/atoms/glass/GlassBase.tsx
import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { useTheme } from '@/theme/hooks/useTheme';
import { glassMorphism, gradient } from '@/theme/utils/glassMorphism';
import { useGlassEffects } from '@/hooks/ui/glassAnimations';
import { useGlassVariant } from '@/contexts/GlassVariantContext';
import type { BaseComponentProps } from '@/types';

export interface GlassBaseProps extends BaseComponentProps {
  variant?: 'light' | 'medium' | 'heavy'; // Now optional - uses global variant if not specified
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  shimmer?: boolean;
  glow?: boolean;
  animated?: boolean;
}

/**
 * Unified Glass Base Component
 * Consolidates all glass implementations with proper hook usage and DRY principles
 * Handles platform differences cleanly without code duplication
 */
export const GlassBase: React.FC<GlassBaseProps> = ({
  variant: propVariant,
  children,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
  shimmer = false,
  glow = false,
  animated = false,
}) => {
  const theme = useTheme();
  const isDark = theme.isDark;
  const { selectedVariant } = useGlassVariant();
  
  // Use prop variant if provided, otherwise use global selected variant
  const variant = propVariant || selectedVariant;
  
  // Use the glass animation hooks that were previously unused
  const glassEffects = useGlassEffects({
    shimmer,
    glow,
    breathing: animated,
  });
  
  // Enhanced Android glass styles with borders, elevation, and shadows
  const getAndroidGlassStyle = (): ViewStyle => {
    // Solid backgrounds to prevent banding
    const solidBackgrounds = {
      light: {
        // dark: '#1a1a1a',
        // light: '#ffffff',
        dark: 'rgba(26, 26, 26, 0.65)',
        light: 'rgba(255, 255, 255, 0.55)',
      },
      medium: {
        // dark: '#1f1f1f',
        // light: '#fafafa',
        dark: 'rgba(31, 31, 31, 0.7)',
        light: 'rgba(250, 250, 250, 0.65)',
      },
      heavy: {
        // dark: '#242424',
        // light: '#f5f5f5',
        dark: 'rgba(36, 36, 36, 0.75)',
        light: 'rgba(245, 245, 245, 0.7)',
      },
    };

    // Android native elevation for shadows
    const elevationLevels = {
      light: 2,
      medium: 4,
      heavy: 6,
    };

    // Subtle borders
    const borderColors = {
      dark: 'rgba(255, 255, 255, 0.08)',
      light: 'rgba(0, 0, 0, 0.05)',
    };

    return {
      backgroundColor: isDark ? solidBackgrounds[variant].dark : solidBackgrounds[variant].light,
      elevation: elevationLevels[variant],
      borderWidth: theme.borders.widths.thin,
      borderColor: isDark ? borderColors.dark : borderColors.light,
      borderRadius: theme.borders.radii.md,
      overflow: 'hidden' as const,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: elevationLevels[variant] / 2 },
      shadowOpacity: theme.shadows.glass[variant].shadowOpacity,
      shadowRadius: elevationLevels[variant],
    };
  };

  // Get Android gradient configuration
  const getAndroidGradientConfig = () => {
    const alphaGradients = {
      light: {
        colors: isDark
          ? ['rgba(255,255,255,0.03)', 'rgba(255,255,255,0)']
          : ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0)'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 },
      },
      medium: {
        colors: isDark
          ? ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0)']
          : ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0)'],
        start: { x: 0, y: 0 },
        end: { x: 0.7, y: 0.7 },
      },
      heavy: {
        colors: isDark
          ? ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0)']
          : ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0)'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      },
    };
    return alphaGradients[variant];
  };

  // Get platform-specific glass styles
  const glassStyles = Platform.OS === 'android' 
    ? getAndroidGlassStyle()
    : glassMorphism({ variant, isDark });
  const blurAmount = theme.glass[variant].blur_amount;
  
  // Flatten style to get dimensions
  const flatStyle = StyleSheet.flatten([
    styles.base,
    glassStyles,
    style,
  ]);
  
  const borderRadius = (flatStyle.borderRadius as number) || theme.borders.radii.md;

  // Platform-specific rendering with shared logic
  const renderPlatformLayer = () => {
    if (Platform.OS === 'ios') {
      // iOS: Use BlurView with gradient overlay
      const glassGradients = gradient.glass(isDark);
      const gradientConfig = glassGradients[variant];
      
      return (
        <>
          <BlurView
            style={StyleSheet.absoluteFillObject}
            blurType={isDark ? 'dark' : 'light'}
            blurAmount={blurAmount}
            reducedTransparencyFallbackColor={
              isDark ? 'rgba(10, 10, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)'
            }
          />
          <LinearGradient
            colors={[...gradientConfig.colors]}
            start={gradientConfig.start}
            end={gradientConfig.end}
            style={StyleSheet.absoluteFillObject}
          />
        </>
      );
    }
    
    // Android: Enhanced glass with gradients
    const gradientConfig = getAndroidGradientConfig();
    return (
      <>
        {/* Inner shadow for depth */}
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: theme.borders.radii.md,
            borderWidth: theme.borders.widths.thin,
            borderColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)',
          }}
          pointerEvents="none" 
        />
        
        {/* Glass gradient overlay */}
        <LinearGradient
          colors={gradientConfig.colors}
          start={gradientConfig.start}
          end={gradientConfig.end}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
      </>
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        flatStyle,
        animated && glassEffects.breathing.animatedStyle,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {/* Platform-specific background layer */}
      {renderPlatformLayer()}
      
      {/* Glow effect using hooks */}
      {glow && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            glassEffects.glow.animatedStyle,
            {
              borderRadius,
              borderWidth: 1,
              borderColor: isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(255, 255, 255, 0.4)',
            },
          ]}
          pointerEvents="none"
        />
      )}
      
      {/* Shimmer effect using hooks */}
      {shimmer && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            glassEffects.shimmer.animatedStyle,
            { borderRadius },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={[
              'transparent',
              'rgba(255,255,255,0.3)',
              'transparent',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      )}
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  base: {
    borderRadius: 12,
    overflow: 'hidden' as const,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

export default GlassBase;
