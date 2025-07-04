import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import { useTheme } from '@/theme/hooks/useTheme';
import { getTextStyle } from '@/utils/helpers';
import type { BaseComponentProps, TextColor, TextVariant } from '@/types';

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

  // Use centralized theme helper (eliminates duplication)
  const textStyle = getTextStyle(variant, color, align, theme);

  if (!textStyle) {
    return null;
  }

  return (
    <Text
      style={[textStyle, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      {...restProps}
    >
      {children}
    </Text>
  );
};
