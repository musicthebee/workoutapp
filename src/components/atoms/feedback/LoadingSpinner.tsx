// src/components/atoms/feedback/LoadingSpinner.tsx
import React from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/hooks';
import type { BaseComponentProps } from '@/types';

interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'pulse';
  color?: string;
  style?: ViewStyle;
}

/**
 * Loading Spinner Component
 * Animated loading indicators for various loading states
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  variant = 'spinner',
  color,
  style,
  testID,
  accessible = true,
  accessibilityLabel = 'Loading',
}) => {
  const theme = useTheme();
  
  // Size configuration
  const sizeConfig = {
    small: theme.sizes.icons.sm,
    medium: theme.sizes.icons.md,
    large: theme.sizes.icons.lg,
  };
  
  const iconSize = sizeConfig[size];
  const spinnerColor = color || theme.colors.primary;
  
  // Rotation animation for spinner
  const rotation = useSharedValue(0);
  
  // Scale animation for pulse
  const scale = useSharedValue(1);
  
  // Opacity animation for dots
  const opacity1 = useSharedValue(0.3);
  const opacity2 = useSharedValue(0.3);
  const opacity3 = useSharedValue(0.3);
  
  React.useEffect(() => {
    if (variant === 'spinner') {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000 }),
        -1,
        false
      );
    } else if (variant === 'pulse') {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1,
        false
      );
    } else if (variant === 'dots') {
      // Staggered dot animation
      const animateDots = () => {
        opacity1.value = withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(0.3, { duration: 300 })
        );
        
        setTimeout(() => {
          opacity2.value = withSequence(
            withTiming(1, { duration: 300 }),
            withTiming(0.3, { duration: 300 })
          );
        }, 150);
        
        setTimeout(() => {
          opacity3.value = withSequence(
            withTiming(1, { duration: 300 }),
            withTiming(0.3, { duration: 300 })
          );
        }, 300);
      };
      
      animateDots();
      const interval = setInterval(animateDots, 900);
      
      return () => clearInterval(interval);
    }
  }, [variant, rotation, scale, opacity1, opacity2, opacity3]);
  
  // Animated styles
  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const dot1Style = useAnimatedStyle(() => ({
    opacity: opacity1.value,
  }));
  
  const dot2Style = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));
  
  const dot3Style = useAnimatedStyle(() => ({
    opacity: opacity3.value,
  }));
  
  if (variant === 'spinner') {
    return (
      <Animated.View
        style={[spinnerStyle, style]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="progressbar"
      >
        <Ionicons 
          name="refresh" 
          size={iconSize} 
          color={spinnerColor}
        />
      </Animated.View>
    );
  }
  
  if (variant === 'pulse') {
    return (
      <Animated.View
        style={[pulseStyle, style]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="progressbar"
      >
        <Ionicons 
          name="ellipse" 
          size={iconSize} 
          color={spinnerColor}
        />
      </Animated.View>
    );
  }
  
  if (variant === 'dots') {
    const dotSize = iconSize * 0.3;
    const dotSpacing = theme.spacing.xs;
    
    return (
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: dotSpacing,
          },
          style,
        ]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="progressbar"
      >
        <Animated.View style={dot1Style}>
          <Ionicons name="ellipse" size={dotSize} color={spinnerColor} />
        </Animated.View>
        <Animated.View style={dot2Style}>
          <Ionicons name="ellipse" size={dotSize} color={spinnerColor} />
        </Animated.View>
        <Animated.View style={dot3Style}>
          <Ionicons name="ellipse" size={dotSize} color={spinnerColor} />
        </Animated.View>
      </Animated.View>
    );
  }
  
  return null;
};

export default LoadingSpinner;