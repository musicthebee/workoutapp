import type { ReactElement, ReactNode } from 'react';
import type { AccessibilityRole, TextStyle, ViewStyle } from 'react-native';

/**
 * UI component prop types
 * Base types that all components extend
 */

// Base props that EVERY component extends
export interface BaseComponentProps {
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
}

// Spacing props for consistent layout
export interface SpacingProps {
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginRight?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginHorizontal?: SpacingValue;
  marginVertical?: SpacingValue;
  padding?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  paddingHorizontal?: SpacingValue;
  paddingVertical?: SpacingValue;
}

// Spacing values from theme
export type SpacingValue =
  | 'xxxs'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'xxxxl'
  | 'xxxxxl';

// Animation props
export interface AnimationProps {
  animationType?: 'spring' | 'timing';
  animationDuration?: number;
  animationDelay?: number;
}

// List component props
export interface ListProps<T> extends BaseComponentProps {
  data: ReadonlyArray<T>;
  renderItem: (item: T, index: number) => ReactElement;
  keyExtractor: (item: T, index: number) => string;
  emptyComponent?: ReactElement;
  headerComponent?: ReactElement;
  footerComponent?: ReactElement;
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

// Form component props
export interface FormProps<T> extends BaseComponentProps {
  initialValues: T;
  validation?: unknown; // Will use FormValidation<T> from validation.ts
  onSubmit: (values: T) => void | Promise<void>;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
}

// Modal props
export interface ModalProps extends BaseComponentProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footerComponent?: ReactElement;
}

// Card props
export interface CardProps extends BaseComponentProps, SpacingProps {
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  children: ReactNode;
  style?: ViewStyle;
}

// Button size variants
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

// Input size variants
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'search' | 'numeric';

// Text variants matching theme typography
export type TextVariant =
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'heading_4'
  | 'body_large'
  | 'body_medium'
  | 'body_small'
  | 'button_large'
  | 'button_medium'
  | 'button_small'
  | 'caption';

// Text color options
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

// Glass effect variants
export type GlassVariant = 'light' | 'medium' | 'heavy';

// Progress variants
export type ProgressVariant = 'linear' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';

// Timer display formats
export type TimerFormat = 'mm:ss' | 'hh:mm:ss' | 'seconds';

// Common style prop combinations
export interface StyleProps {
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  textStyle?: TextStyle;
}

// Loading state props
export interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
  skeleton?: boolean;
}

// Error state props
export interface ErrorProps {
  error?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

// Helper type for components that can be disabled
export interface DisableableProps {
  disabled?: boolean;
}

// Helper type for components with press handlers
export interface PressableProps {
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}
