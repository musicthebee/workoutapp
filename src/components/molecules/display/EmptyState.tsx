// src/components/molecules/display/EmptyState.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/hooks';
import { TextBase } from '@/components/atoms';
import { BigButton } from '@/components/molecules/button/BigButton';
import { useEntranceAnimation } from '@/hooks/ui/animations';
import type { BaseComponentProps } from '@/types';

interface EmptyStateProps extends BaseComponentProps {
  icon?: string;
  title: string;
  message?: string;
  action_label?: string;
  on_action?: () => void;
  variant?: 'default' | 'compact' | 'large';
  style?: ViewStyle;
}

/**
 * Empty State Component
 * Displays when lists are empty or no content is available
 * Provides clear messaging and optional CTA
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'add-circle-outline',
  title,
  message,
  action_label,
  on_action,
  variant = 'default',
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const { animatedStyle, AnimatedView } = useEntranceAnimation({
    type: 'combined',
    delay: 100,
  });
  
  // Size configurations
  const size_config = {
    compact: {
      icon_size: theme.sizes.icons.xl,
      title_variant: 'heading_4' as const,
      padding: theme.spacing.lg,
      icon_margin: theme.spacing.md,
      message_margin: theme.spacing.xs,
      action_margin: theme.spacing.lg,
    },
    default: {
      icon_size: theme.sizes.icons.xxxl,
      title_variant: 'heading_3' as const,
      padding: theme.spacing.xxxl,
      icon_margin: theme.spacing.xl,
      message_margin: theme.spacing.sm,
      action_margin: theme.spacing.xl,
    },
    large: {
      icon_size: 80,
      title_variant: 'heading_2' as const,
      padding: theme.spacing.xxxxl,
      icon_margin: theme.spacing.xxl,
      message_margin: theme.spacing.md,
      action_margin: theme.spacing.xxl,
    },
  };
  
  const config = size_config[variant];
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: config.padding,
    },
    content: {
      alignItems: 'center',
      maxWidth: 320,
    },
    icon: {
      marginBottom: config.icon_margin,
      opacity: 0.3,
    },
    title: {
      textAlign: 'center',
    },
    message: {
      textAlign: 'center',
      color: theme.colors.text_secondary,
      marginTop: config.message_margin,
    },
    actionContainer: {
      marginTop: config.action_margin,
      width: '100%',
      maxWidth: 280,
    },
  });

  return (
    <View 
      style={[styles.container, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || `${title}. ${message || ''}`}
    >
      <AnimatedView style={[styles.content, animatedStyle]}>
        <Ionicons 
          name={icon as any} 
          size={config.icon_size} 
          color={theme.colors.text_tertiary}
          style={styles.icon}
          testID={`${testID}-icon`}
        />
        
        <TextBase 
          variant={config.title_variant} 
          style={styles.title}
        >
          {title}
        </TextBase>
        
        {message && (
          <TextBase 
            variant="body_medium" 
            style={styles.message}
          >
            {message}
          </TextBase>
        )}
        
        {action_label && on_action && (
          <View style={styles.actionContainer}>
            <BigButton
              label={action_label}
              onPress={on_action}
              variant="primary"
              testID={`${testID}-action`}
              full_width
            >
              {action_label}
            </BigButton>
          </View>
        )}
      </AnimatedView>
    </View>
  );
};

/**
 * List Empty State
 * Specialized variant for empty lists
 */
interface ListEmptyStateProps extends Omit<EmptyStateProps, 'variant'> {
  item_type?: string;
}

export const ListEmptyState: React.FC<ListEmptyStateProps> = ({
  item_type = 'items',
  title,
  message,
  ...props
}) => {
  const default_title = title || `No ${item_type} yet`;
  const default_message = message || `Add your first ${item_type.slice(0, -1)} to get started`;
  
  return (
    <EmptyState
      {...props}
      title={default_title}
      message={default_message}
      variant="default"
      icon="folder-open-outline"
    />
  );
};

/**
 * Search Empty State
 * Specialized variant for empty search results
 */
interface SearchEmptyStateProps extends Omit<EmptyStateProps, 'icon' | 'action_label' | 'on_action'> {
  search_query?: string;
  on_clear_search?: () => void;
}

export const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({
  search_query,
  on_clear_search,
  title,
  message,
  ...props
}) => {
  const default_title = title || 'No results found';
  const default_message = message || (
    search_query 
      ? `No matches for "${search_query}"`
      : 'Try adjusting your search or filters'
  );
  
  return (
    <EmptyState
      {...props}
      icon="search-outline"
      title={default_title}
      message={default_message}
      action_label={on_clear_search ? 'Clear Search' : undefined}
      on_action={on_clear_search}
      variant="compact"
    />
  );
};

/**
 * Error Empty State
 * Specialized variant for error states
 */
interface ErrorEmptyStateProps extends Omit<EmptyStateProps, 'icon'> {
  error_message?: string;
  on_retry?: () => void;
}

export const ErrorEmptyState: React.FC<ErrorEmptyStateProps> = ({
  error_message,
  on_retry,
  title,
  message,
  action_label,
  on_action,
  ...props
}) => {
  const default_title = title || 'Something went wrong';
  const default_message = message || error_message || 'Please try again later';
  const default_action_label = action_label || 'Try Again';
  
  return (
    <EmptyState
      {...props}
      icon="alert-circle-outline"
      title={default_title}
      message={default_message}
      action_label={on_retry ? default_action_label : undefined}
      on_action={on_retry || on_action}
    />
  );
};

// Export all variants
export default EmptyState;
