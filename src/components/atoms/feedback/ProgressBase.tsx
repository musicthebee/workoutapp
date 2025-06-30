import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps, ProgressVariant, ProgressSize } from '@/types';

/**
 * Progress Base Props
 */
export interface ProgressBaseProps extends BaseComponentProps {
  progress: number; // 0-1
  variant: ProgressVariant;
  size: ProgressSize;
  style?: StyleProp<ViewStyle>;
}

/**
 * Progress Base Component
 * Pure progress indicator with animated fill
 */
export const ProgressBase: React.FC<ProgressBaseProps> = ({
  progress,
  variant,
  size,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  
  // Size mapping
  const sizeMap = {
    sm: { height: 4, width: 100 },
    md: { height: 8, width: 200 },
    lg: { height: 12, width: 300 },
  };
  
  const dimensions = sizeMap[size];
  
  // Clamp progress between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(
      dimensions.width * clampedProgress,
      theme.animation.springs.smooth
    ),
  }));
  
  // For now, only linear variant
  if (variant === 'linear') {
    return (
      <View
        style={[
          {
            height: dimensions.height,
            width: dimensions.width,
            backgroundColor: theme.colors.glass_border,
            borderRadius: dimensions.height / 2,
            overflow: 'hidden',
          },
          style,
        ]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="progressbar"
        accessibilityValue={{
          now: clampedProgress * 100,
          min: 0,
          max: 100,
        }}
      >
        <Animated.View
          style={[
            {
              height: '100%',
              backgroundColor: theme.colors.primary,
              borderRadius: dimensions.height / 2,
            },
            animatedStyle,
          ]}
        />
      </View>
    );
  }
  
  // TODO: Implement circular variant
  return null;
};
