import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { GlassBase } from '@/components/atoms/glass/GlassBase';
import { useTheme } from '@/theme/hooks/useTheme';
import { useTransitionAnimation } from '@/hooks/ui/animations';
import { getComponentSizing } from '@/utils/helpers';
import type { BaseComponentProps, InputSize, InputVariant } from '@/types';

/**
 * Input Base Props
 */
export interface InputBaseProps extends BaseComponentProps, Omit<TextInputProps, 'style'> {
  variant: InputVariant;
  size: InputSize;
  hasError?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * Input Base Component
 * Pure text input with glass effect
 */
export const InputBase = forwardRef<TextInput, InputBaseProps>(({
  variant,
  size,
  hasError = false,
  containerStyle,
  inputStyle,
  testID,
  accessible = true,
  accessibilityLabel,
  placeholderTextColor,
  onFocus,
  onBlur,
  ...textInputProps
}, ref) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  
  // Get sizing using centralized utility (eliminates duplication)
  const { height, paddingHorizontal, typography } = getComponentSizing('input', size, theme);
  const typographyConfig = theme.typography[typography];
  
  // Keyboard type based on variant
  const keyboardType = variant === 'numeric' ? 'numeric' : 'default';
  
  // Focus transition animation
  const focusAnimation = useTransitionAnimation({
    type: 'timing',
    duration: theme.animation.durations.fast,
  });
  
  // Update animation based on focus state
  React.useEffect(() => {
    if (focusAnimation.animatedValue) {
      focusAnimation.animatedValue.setValue(isFocused ? 1 : 0);
    }
  }, [isFocused, focusAnimation.animatedValue]);
  
  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  
  return (
    <focusAnimation.AnimatedView
      style={[
        focusAnimation.animatedStyle,
        focusAnimation.animatedValue && {
          transform: [{
            scale: focusAnimation.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.02],
            }),
          }],
        },
      ]}
    >
      <GlassBase
        style={[
          {
            height,
            paddingHorizontal,
            borderWidth: theme.borders.widths.thin,
            borderColor: hasError 
              ? theme.colors.error 
              : isFocused
              ? theme.colors.primary
              : theme.colors.glass_border,
            borderRadius: theme.borders.radii.md,
          },
          containerStyle,
        ]}
        testID={`${testID}-container`}
      >
        <TextInput
          ref={ref}
          style={[
            {
              flex: 1,
              fontSize: typographyConfig.font_size,
              color: theme.colors.text_primary,
              padding: 0, // Remove default padding
            },
            inputStyle,
          ]}
          placeholderTextColor={
            placeholderTextColor || theme.colors.text_tertiary
          }
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          testID={testID}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          {...textInputProps}
        />
      </GlassBase>
    </focusAnimation.AnimatedView>
  );
});

InputBase.displayName = 'InputBase';
