/**
 * Main types export file
 * Re-exports all types for easy importing throughout the app
 */

import { ViewProps } from 'react-native';

export interface BaseComponentProps extends ViewProps {
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: ViewProps['accessibilityRole'];
}

// Common types
export * from './common';

// Database types
export * from './database/models';

// Business logic types
export * from './business/activeWorkout';
export * from './business/filters';
export * from './business/mutations';

// UI types
export * from './ui/validation';
export * from './ui/components';
export * from './ui/navigation';
export * from './ui/settings';

// Utility types
export * from './utils/api';
export * from './utils/ordering';

// Note: Generated types will be imported from './generated/graphql'
// after running codegen
