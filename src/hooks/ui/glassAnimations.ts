import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '@/theme/hooks/useTheme';

/**
 * Shimmer animation for glass effects
 */
export const useShimmerAnimation = (enabled = true, duration = 3000) => {
  const progress = useSharedValue(0);
  
  useEffect(() => {
    if (enabled) {
      progress.value = withRepeat(
        withTiming(1, { duration }),
        -1,
        true
      );
    } else {
      progress.value = 0;
    }
  }, [enabled, duration, progress]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.5, 1],
      [0, 0.3, 0],
      Extrapolate.CLAMP
    ),
  }));
  
  return { progress, animatedStyle };
};

/**
 * Glow pulse animation for glass borders
 */
export const useGlowAnimation = (enabled = true) => {
  const theme = useTheme();
  const intensity = useSharedValue(0);
  
  useEffect(() => {
    if (enabled) {
      intensity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0.3, { duration: 2000 })
        ),
        -1,
        false
      );
    } else {
      intensity.value = 0;
    }
  }, [enabled, intensity]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    shadowOpacity: interpolate(
      intensity.value,
      [0, 1],
      [0.1, 0.3],
      Extrapolate.CLAMP
    ),
    borderColor: theme.isDark
      ? `rgba(255, 255, 255, ${interpolate(intensity.value, [0, 1], [0.1, 0.3])})`
      : `rgba(255, 255, 255, ${interpolate(intensity.value, [0, 1], [0.3, 0.6])})`,
  }));
  
  return { intensity, animatedStyle };
};

/**
 * Breathing animation for subtle glass movement
 */
export const useBreathingAnimation = (enabled = true) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  useEffect(() => {
    if (enabled) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 3000 }),
          withTiming(1, { duration: 3000 })
        ),
        -1,
        false
      );
      
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.95, { duration: 3000 }),
          withTiming(1, { duration: 3000 })
        ),
        -1,
        false
      );
    } else {
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
    }
  }, [enabled, scale, opacity]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
  
  return { scale, opacity, animatedStyle };
};

/**
 * Parallax animation for glass layers
 */
export const useParallaxAnimation = (scrollOffset: any, factor = 0.5) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-100, 0, 100],
          [50 * factor, 0, -50 * factor],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));
  
  return animatedStyle;
};

/**
 * Color shift animation for dynamic glass tints
 */
export const useColorShiftAnimation = (enabled = true) => {
  const hue = useSharedValue(0);
  
  useEffect(() => {
    if (enabled) {
      hue.value = withRepeat(
        withTiming(360, { duration: 10000 }),
        -1,
        false
      );
    } else {
      hue.value = 0;
    }
  }, [enabled, hue]);
  
  const animatedStyle = useAnimatedStyle(() => {
    const hueRotate = hue.value;
    // This would need a color manipulation library in practice
    // For now, we'll just adjust opacity as a placeholder
    return {
      opacity: interpolate(
        Math.sin((hueRotate * Math.PI) / 180),
        [-1, 1],
        [0.8, 1],
        Extrapolate.CLAMP
      ),
    };
  });
  
  return { hue, animatedStyle };
};

/**
 * Frost animation for glass texture
 */
export const useFrostAnimation = (enabled = true) => {
  const frost = useSharedValue(0);
  
  useEffect(() => {
    if (enabled) {
      frost.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 5000 }),
          withTiming(0, { duration: 5000 })
        ),
        -1,
        false
      );
    } else {
      frost.value = 0;
    }
  }, [enabled, frost]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      frost.value,
      [0, 1],
      [0, 0.1],
      Extrapolate.CLAMP
    ),
  }));
  
  return { frost, animatedStyle };
};

/**
 * Combined glass effects animation
 */
export const useGlassEffects = (options: {
  shimmer?: boolean;
  glow?: boolean;
  breathing?: boolean;
  colorShift?: boolean;
  frost?: boolean;
} = {}) => {
  const shimmer = useShimmerAnimation(options.shimmer);
  const glow = useGlowAnimation(options.glow);
  const breathing = useBreathingAnimation(options.breathing);
  const colorShift = useColorShiftAnimation(options.colorShift);
  const frost = useFrostAnimation(options.frost);
  
  return {
    shimmer,
    glow,
    breathing,
    colorShift,
    frost,
  };
};
