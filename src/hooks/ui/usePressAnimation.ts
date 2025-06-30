import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useTheme } from '@/theme/hooks/useTheme';

/**
 * Press Animation Hook
 * Provides consistent press animations for interactive components
 */
export const usePressAnimation = () => {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
  
  const onPressIn = (): void => {
    scale.value = withSpring(0.95, theme.animation.springs.responsive);
    opacity.value = withSpring(0.8, theme.animation.springs.responsive);
  };
  
  const onPressOut = (): void => {
    scale.value = withSpring(1, theme.animation.springs.smooth);
    opacity.value = withSpring(1, theme.animation.springs.smooth);
  };
  
  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
};
