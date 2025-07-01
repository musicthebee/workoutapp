// src/components/atoms/glass/GlassBase.tsx
import React, { useEffect } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import { useTheme } from '@/theme/hooks/useTheme';
import { glassMorphism, gradient } from '@/theme/utils/glassMorphism';
import type { BaseComponentProps } from '@/types';

export interface GlassBaseProps extends BaseComponentProps {
  variant: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  shimmer?: boolean;
  glow?: boolean;
  animated?: boolean;
}

export const GlassBase: React.FC<GlassBaseProps> = ({
  variant,
  children,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
  shimmer = false,
  glow = true,
  animated = false,
}) => {
  const theme = useTheme();
  const isDark = theme.isDark;
  
  // Animation values
  const shimmerProgress = useSharedValue(0);
  const glowAnimation = useSharedValue(0);
  const breathingScale = useSharedValue(1);
  
  // Get glass styles
  const glassStyles = glassMorphism({ variant, isDark });
  const gradientConfig = gradient.glass(isDark)[variant];
  
  // Get blur amount based on variant
  const blurAmount = theme.glass[variant].blur_amount;
  
  // Start animations
  useEffect(() => {
    if (shimmer) {
      shimmerProgress.value = withRepeat(
        withTiming(1, { duration: 3000 }),
        -1,
        true
      );
    }
    
    if (glow) {
      glowAnimation.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0.3, { duration: 2000 })
        ),
        -1,
        false
      );
    }
    
    if (animated) {
      breathingScale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 3000 }),
          withTiming(1, { duration: 3000 })
        ),
        -1,
        false
      );
    }
  }, [shimmer, glow, animated, shimmerProgress, glowAnimation, breathingScale]);
  
  // Animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: animated ? [{ scale: breathingScale.value }] : [],
  }));
  
  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      glowAnimation.value,
      [0, 1],
      [0.3, 0.6],
      Extrapolate.CLAMP
    ),
    shadowOpacity: interpolate(
      glowAnimation.value,
      [0, 1],
      [0.1, 0.3],
      Extrapolate.CLAMP
    ),
  }));
  
  const shimmerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: shimmer ? interpolate(
      shimmerProgress.value,
      [0, 0.5, 1],
      [0, 0.3, 0],
      Extrapolate.CLAMP
    ) : 0,
  }));
  
  // Flatten style to get dimensions
  const flatStyle = StyleSheet.flatten([
    styles.base,
    glassStyles,
    style,
  ]);
  
  const borderRadius = (flatStyle.borderRadius as number) || theme.borders.radii.md;
  
  return (
    <Animated.View
      style={[
        styles.container,
        flatStyle,
        containerAnimatedStyle,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {/* Blur layer */}
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType={isDark ? 'dark' : 'light'}
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor={
          isDark ? 'rgba(10, 10, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)'
        }
      />
      
      {/* Gradient overlay */}
      <LinearGradient
        colors={gradientConfig.colors}
        start={gradientConfig.start}
        end={gradientConfig.end}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Glow effect */}
      {glow && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            glowAnimatedStyle,
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
      
      {/* Shimmer effect */}
      {shimmer && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            shimmerAnimatedStyle,
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

// Fallback for Android - Enhanced with better glass effect
export const GlassBaseFallback: React.FC<GlassBaseProps> = ({
  variant,
  children,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
  shimmer = false,
  glow = false, // Disable glow on Android by default
  animated = false,
}) => {
  const theme = useTheme();
  const isDark = theme.isDark;
  
  // Get Android-optimized glass styles
  const getAndroidGlassStyle = (): ViewStyle => {
    // Base colors with higher opacity for Android
    const baseColors = {
      light: {
        dark: 'rgba(255, 255, 255, 0.08)',
        light: 'rgba(255, 255, 255, 0.85)',
      },
      medium: {
        dark: 'rgba(255, 255, 255, 0.12)',
        light: 'rgba(255, 255, 255, 0.75)',
      },
      heavy: {
        dark: 'rgba(255, 255, 255, 0.18)',
        light: 'rgba(255, 255, 255, 0.65)',
      },
    };
    
    return {
      backgroundColor: isDark ? baseColors[variant].dark : baseColors[variant].light,
      borderRadius: theme.borders.radii.md,
      // No borders or elevation to avoid artifacts
      overflow: 'hidden' as const,
    };
  };
  
  const glassStyles = getAndroidGlassStyle();
  
  // Simplified gradient for Android
  const androidGradientConfig = {
    light: {
      colors: isDark
        ? ['rgba(255,255,255,0.05)', 'transparent']
        : ['rgba(255,255,255,0.2)', 'transparent'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    medium: {
      colors: isDark
        ? ['rgba(255,255,255,0.08)', 'transparent']
        : ['rgba(255,255,255,0.15)', 'transparent'],
      start: { x: 0, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    heavy: {
      colors: isDark
        ? ['rgba(255,255,255,0.1)', 'transparent']
        : ['rgba(255,255,255,0.1)', 'transparent'],
      start: { x: 0, y: 0 },
      end: { x: 0.3, y: 1 },
    },
  };
  
  // Animation values
  const shimmerProgress = useSharedValue(0);
  const breathingScale = useSharedValue(1);
  
  useEffect(() => {
    if (shimmer) {
      shimmerProgress.value = withRepeat(
        withTiming(1, { duration: 3000 }),
        -1,
        true
      );
    }
    
    if (animated) {
      breathingScale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 3000 }),
          withTiming(1, { duration: 3000 })
        ),
        -1,
        false
      );
    }
  }, [shimmer, animated, shimmerProgress, breathingScale]);
  
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: animated ? [{ scale: breathingScale.value }] : [],
  }));
  
  const shimmerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: shimmer ? interpolate(
      shimmerProgress.value,
      [0, 0.5, 1],
      [0, 0.3, 0],
      Extrapolate.CLAMP
    ) : 0,
  }));
  
  const flatStyle = StyleSheet.flatten([
    styles.base,
    glassStyles,
    style,
  ]);
  
  const borderRadius = (flatStyle.borderRadius as number) || theme.borders.radii.md;
  
  return (
    <Animated.View
      style={[
        styles.container,
        flatStyle,
        containerAnimatedStyle,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {/* Single gradient layer for Android */}
      <LinearGradient
        colors={androidGradientConfig[variant].colors}
        start={androidGradientConfig[variant].start}
        end={androidGradientConfig[variant].end}
        style={[
          StyleSheet.absoluteFillObject,
          { borderRadius },
        ]}
      />
      
      {/* Shimmer effect */}
      {shimmer && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            shimmerAnimatedStyle,
            { borderRadius },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={[
              'transparent',
              'rgba(255,255,255,0.2)',
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

// Export the appropriate component based on platform
const GlassComponent = Platform.select({
  ios: GlassBase,
  android: GlassBaseFallback,
  default: GlassBase,
}) as React.FC<GlassBaseProps>;

export default GlassComponent;

