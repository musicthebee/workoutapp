import React, { useEffect } from 'react';
import { TextInput, StyleProp, TextStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps } from '@/types';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

/**
 * Animated Value Props
 */
export interface AnimatedValueProps extends BaseComponentProps {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  style?: StyleProp<TextStyle>;
}

/**
 * Animated Value Component
 * Pure animated number display
 */
export const AnimatedValue: React.FC<AnimatedValueProps> = ({
  value,
  format = (v) => Math.round(v).toString(),
  duration,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const animatedValue = useSharedValue(0);
  
  useEffect(() => {
    // Ensure value is a valid number
    const numericValue = typeof value === 'number' && !isNaN(value) ? value : 0;
    animatedValue.value = withTiming(
      numericValue,
      { duration: duration || theme.animation.durations.normal }
    );
  }, [value, duration, animatedValue, theme]);
  
  // Create a worklet-compatible format function
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    // Ensure animated value is valid before rounding
    const currentValue = isNaN(animatedValue.value) ? 0 : animatedValue.value;
    const roundedValue = Math.round(currentValue);
    return {
      text: roundedValue.toString(),
      defaultValue: roundedValue.toString(),
    };
  });
  
  return (
    <AnimatedTextInput
      editable={false}
      style={[
        {
          color: theme.colors.text_primary,
          fontSize: theme.typography.heading_1.font_size,
          fontWeight: theme.typography.heading_1.font_weight,
        },
        style,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      animatedProps={animatedProps}
    />
  );
};
