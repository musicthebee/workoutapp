import React from 'react';
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/theme/hooks/useTheme';
import type { SpacingValue } from '@/types';

/**
 * Grid Props
 */
export interface GridProps extends ViewProps {
  columns: number;
  gap?: SpacingValue;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * Grid Component
 * Pure grid layout using flexbox with wrap
 */
export const Grid: React.FC<GridProps> = ({
  columns,
  gap,
  style,
  children,
  ...viewProps
}) => {
  const theme = useTheme();
  const gapValue = gap ? theme.spacing[gap] : 0;
  
  // Calculate item width as percentage
  const itemWidth = `${100 / columns}%`;
  
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -gapValue / 2,
        },
        style,
      ]}
      {...viewProps}
    >
      {React.Children.map(children, (child, index) => (
        <View
          key={index}
          style={{
            width: itemWidth as any,
            paddingHorizontal: gapValue / 2,
            marginBottom: gapValue,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};
