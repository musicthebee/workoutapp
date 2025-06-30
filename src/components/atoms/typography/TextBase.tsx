import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps, TextVariant, TextColor } from '@/types';

/**
 * Text Base Props
 */
export interface TextBaseProps extends BaseComponentProps, Omit<TextProps, 'style'> {
  variant: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

/**
 * Text Base Component
 * Pure text component that applies theme typography
 */
export const TextBase: React.FC<TextBaseProps> = ({
  variant,
  color = 'primary',
  align = 'left',
  style,
  children,
  testID,
  accessible = true,
  accessibilityLabel,
  ...restProps
}) => {
  const theme = useTheme();
  const typography = theme.typography[variant];
  
  // Map color to theme color
  const textColor = {
    primary: theme.colors.text_primary,
    secondary: theme.colors.text_secondary,
    tertiary: theme.colors.text_tertiary,
    inverse: theme.colors.text_inverse,
    error: theme.colors.error,
    success: theme.colors.success,
    warning: theme.colors.warning,
    info: theme.colors.info,
  }[color];
  
  return (
    <Text
      style={[
        {
          fontSize: typography.font_size,
          lineHeight: typography.font_size * typography.line_height,
          fontWeight: typography.font_weight,
          letterSpacing: typography.letter_spacing,
          color: textColor,
          textAlign: align,
        },
        style,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      {...restProps}
    >
      {children}
    </Text>
  );
};
