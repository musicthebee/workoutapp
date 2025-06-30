import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme/hooks/useTheme';
import type { SpacingValue } from '@/types';

/**
 * Spacer Props
 */
export interface SpacerProps {
  size: SpacingValue;
  horizontal?: boolean;
}

/**
 * Spacer Component
 * Pure spacing component using theme values
 */
export const Spacer: React.FC<SpacerProps> = ({ 
  size, 
  horizontal = false 
}) => {
  const theme = useTheme();
  const spacing = theme.spacing[size];
  
  return (
    <View
      style={{
        width: horizontal ? spacing : undefined,
        height: horizontal ? undefined : spacing,
      }}
    />
  );
};
