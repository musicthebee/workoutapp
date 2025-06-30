import React, { forwardRef } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { GlassBase } from '@/components/atoms/glass/GlassBase';
import { useTheme } from '@/theme/hooks/useTheme';
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
  ...textInputProps
}, ref) => {
  const theme = useTheme();
  
  // Get size from theme
  const height = theme.sizes.inputs[size];
  const paddingHorizontal = theme.spacing[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'];
  
  // Typography based on size
  const typography = theme.typography[size === 'sm' ? 'body_small' : size === 'md' ? 'body_medium' : 'body_large'];
  
  // Keyboard type based on variant
  const keyboardType = variant === 'numeric' ? 'numeric' : 'default';
  
  return (
    <GlassBase
      variant="light"
      style={[
        {
          height,
          paddingHorizontal,
          borderWidth: theme.borders.widths.thin,
          borderColor: hasError 
            ? theme.colors.error 
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
            fontSize: typography.font_size,
            color: theme.colors.text_primary,
            padding: 0, // Remove default padding
          },
          inputStyle,
        ]}
        placeholderTextColor={
          placeholderTextColor || theme.colors.text_tertiary
        }
        keyboardType={keyboardType}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        {...textInputProps}
      />
    </GlassBase>
  );
});

InputBase.displayName = 'InputBase';
