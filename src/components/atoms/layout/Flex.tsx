import React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

import { useTheme } from '@/theme/hooks/useTheme';
import type { SpacingValue } from '@/types';

/**
 * Flex Props
 */
export interface FlexProps extends ViewProps {
  direction?: 'row' | 'column';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  wrap?: boolean;
  gap?: SpacingValue;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
} as const;

const alignMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

/**
 * Flex Component
 * Pure flexbox container with theme-based spacing
 */
export const Flex: React.FC<FlexProps> = ({
  direction = 'column',
  justify = 'start',
  align = 'stretch',
  wrap = false,
  gap,
  flex,
  style,
  children,
  ...viewProps
}) => {
  const theme = useTheme();
  const gapValue = gap ? theme.spacing[gap] : undefined;

  return (
    <View
      style={[
        {
          flexDirection: direction,
          justifyContent: justifyMap[justify],
          alignItems: alignMap[align],
          flexWrap: wrap ? 'wrap' : 'nowrap',
          gap: gapValue,
          flex,
        },
        style,
      ]}
      {...viewProps}
    >
      {children}
    </View>
  );
};
