// src/components/atoms/glass/GlassBase.android.tsx
// Enhanced Android-specific glass implementation with borders and shadows

import React, { useEffect } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
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
import type { BaseComponentProps } from '@/types';

export interface GlassBaseProps extends BaseComponentProps {
  variant: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  shimmer?: boolean;
  glow?: boolean;
  animated?: boolean;
}

// Enhanced Android Glass Component
export const GlassBaseAndroid: React.FC<GlassBaseProps> = ({
  variant,
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
  
  // Android-optimized glass styles with proper borders and shadows
  const getAndroidGlassStyle = (): ViewStyle => {
    // 1. SOLID BACKGROUND - Key to preventing banding
    const solidBackgrounds = {
      light: {
        dark: '#1a1a1a', // Solid dark grey
        light: '#ffffff', // Solid white
      },
      medium: {
        dark: '#1f1f1f', // Slightly lighter grey
        light: '#fafafa', // Off-white
      },
      heavy: {
        dark: '#242424', // Lighter grey
        light: '#f5f5f5', // Light grey
      },
    };
    
    // 2. ELEVATION - Use Android's native elevation for shadows
    const elevationLevels = {
      light: 2,
      medium: 4,
      heavy: 6,
    };
    
    // 3. BORDER - Use solid colors with low opacity
    const borderColors = {
      dark: 'rgba(255, 255, 255, 0.08)', // Very subtle white border
      light: 'rgba(0, 0, 0, 0.05)', // Very subtle black border
    };
    
    return {
      // Solid background prevents transparency stacking
      backgroundColor: isDark ? solidBackgrounds[variant].dark : solidBackgrounds[variant].light,
      
      // Native Android elevation
      elevation: elevationLevels[variant],
      
      // Subtle border
      borderWidth: 1,
      borderColor: isDark ? borderColors.dark : borderColors.light,
      
      // Border radius
      borderRadius: 12,
      
      // Important: clip children
      overflow: 'hidden' as const,
      
      // Android-specific shadow (works with elevation)
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevationLevels[variant] / 2 },
      shadowOpacity: 0.15,
      shadowRadius: elevationLevels[variant],
    };
  };
  
  const glassStyles = getAndroidGlassStyle();
  
  // 4. GRADIENT OVERLAY - Single subtle gradient for glass effect
  const getGradientConfig = () => {
    // Use alpha gradients over solid background
    const alphaGradients = {
      light: {
        colors: isDark
          ? ['rgba(255,255,255,0.03)', 'rgba(255,255,255,0)'] // 3% to 0% white
          : ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0)'], // 40% to 0% white
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 },
      },
      medium: {
        colors: isDark
          ? ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0)'] // 5% to 0% white
          : ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0)'], // 50% to 0% white
        start: { x: 0, y: 0 },
        end: { x: 0.7, y: 0.7 },
      },
      heavy: {
        colors: isDark
          ? ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0)'] // 8% to 0% white
          : ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0)'], // 60% to 0% white
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      },
    };
    
    return alphaGradients[variant];
  };
  
  const gradientConfig = getGradientConfig();
  
  // 5. INNER SHADOW - Creates depth without artifacts
  const innerShadowStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)',
  };
  
  // Animation values
  const shimmerProgress = useSharedValue(0);
  const breathingScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  
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
          withTiming(1.01, { duration: 3000 }), // Subtle scale
          withTiming(1, { duration: 3000 })
        ),
        -1,
        false
      );
    }
    
    if (glow) {
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        ),
        -1,
        false
      );
    }
  }, [shimmer, animated, glow, shimmerProgress, breathingScale, glowOpacity]);
  
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: animated ? [{ scale: breathingScale.value }] : [],
  }));
  
  const shimmerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: shimmer ? interpolate(
      shimmerProgress.value,
      [0, 0.5, 1],
      [0, 0.2, 0], // Subtle shimmer
      Extrapolate.CLAMP
    ) : 0,
  }));
  
  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glow ? glowOpacity.value * 0.3 : 0, // Subtle glow
  }));
  
  const flatStyle = StyleSheet.flatten([
    styles.base,
    glassStyles,
    style,
  ]);
  
  const borderRadius = (flatStyle.borderRadius as number) || 12;
  
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
      {/* Inner shadow for depth */}
      <View style={innerShadowStyle} pointerEvents="none" />
      
      {/* Glass gradient overlay */}
      <LinearGradient
        colors={gradientConfig.colors}
        start={gradientConfig.start}
        end={gradientConfig.end}
        style={[
          StyleSheet.absoluteFillObject,
          { borderRadius },
        ]}
        pointerEvents="none"
      />
      
      {/* Glow effect - subtle outer glow */}
      {glow && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            glowAnimatedStyle,
            {
              borderRadius,
              borderWidth: 2,
              borderColor: theme.colors.primary,
              margin: -1, // Expand slightly beyond container
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
            { borderRadius },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={[
              'transparent',
              'rgba(255,255,255,0.15)', // Reduced shimmer intensity
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

// Alternative approach using multiple layers for richer effect
export const GlassBaseAndroidRich: React.FC<GlassBaseProps> = ({
  variant,
  children,
  style,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.isDark;
  
  // Multi-layer approach for rich glass effect
  const layers = {
    // Base layer - solid with subtle transparency
    base: {
      backgroundColor: isDark 
        ? 'rgba(18, 18, 18, 0.95)' // 95% opaque
        : 'rgba(255, 255, 255, 0.3)', // Much more transparent for light theme
      borderRadius: 12,
      overflow: 'hidden' as const,
    },
    
    // Shadow layer - positioned inside container to prevent clipping
    shadow: {
      position: 'absolute' as const,
      top: 1,
      left: 1,
      right: 1,
      bottom: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 11,
      opacity: variant === 'heavy' ? 0.3 : variant === 'medium' ? 0.2 : 0.1,
    },
    
    // Border layer - separate view for clean borders
    border: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark 
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.05)',
    },
  };
  
  return (
    <View style={styles.container}>
      {/* Shadow layer */}
      <View style={layers.shadow} />
      
      {/* Main glass container - apply style prop here so padding works correctly */}
      <View style={[layers.base, style]}>
        {/* Border as separate layer */}
        <View style={layers.border} pointerEvents="none" />
        
        {/* Gradient overlay */}
        <LinearGradient
          colors={isDark ? [
            'rgba(255,255,255,0.05)',
            'transparent',
          ] : [
            'rgba(255,255,255,0.6)', // More visible gradient for light theme
            'rgba(255,255,255,0.2)',
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.7 }}
          style={StyleSheet.absoluteFillObject}
        />
        
        {/* Content */}
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </View>
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

// Export based on preference
export default GlassBaseAndroid;
