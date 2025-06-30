import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { GlassBase } from '@/components/atoms/glass/GlassBase';
import { usePressAnimation } from '@/hooks/ui/usePressAnimation';
import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps, ButtonSize, ButtonVariant } from '@/types';

/**
 * Button Base Props
 */
export interface ButtonBaseProps extends BaseComponentProps {
  variant: ButtonVariant;
  size: ButtonSize;
  onPress: PressableProps['onPress'];
  onLongPress?: PressableProps['onLongPress'];
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * Button Base Component
 * Pure button component with glass effect and press animation
 */
export const ButtonBase: React.FC<ButtonBaseProps> = ({
  variant,
  size,
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  style,
  children,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useTheme();
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();
  
  // Map button variant to glass variant
  const glassVariant = variant === 'ghost' ? 'light' : 'medium';
  
  // Get size from theme
  const height = theme.sizes.buttons[size];
  const paddingHorizontal = theme.spacing[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'];
  
  // Determine if button is interactive
  const isDisabled = disabled || loading;
  
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={isDisabled ? undefined : onPressIn}
      onPressOut={isDisabled ? undefined : onPressOut}
      disabled={isDisabled}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      <Animated.View style={animatedStyle}>
        <GlassBase
          variant={glassVariant}
          style={[
            {
              height,
              paddingHorizontal,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isDisabled ? 0.5 : 1,
              borderRadius: theme.borders.radii.md,
            },
            style,
          ]}
        >
          {children}
        </GlassBase>
      </Animated.View>
    </Pressable>
  );
};
