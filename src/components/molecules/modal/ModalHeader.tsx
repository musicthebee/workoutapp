// src/components/molecules/modal/ModalHeader.tsx
import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/hooks';
import { TextBase } from '@/components/atoms';
import type { BaseComponentProps } from '@/types';

interface ModalHeaderProps extends BaseComponentProps {
  title: string;
  on_back?: () => void;
  on_action?: () => void;
  action_label?: string;
  back_icon?: string;
  action_disabled?: boolean;
  variant?: 'default' | 'minimal' | 'prominent';
  style?: ViewStyle;
}

/**
 * Modal Header Component
 * Consistent header for all modal screens
 * Provides navigation and action buttons
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  on_back,
  on_action,
  action_label = 'Save',
  back_icon = 'arrow-back',
  action_disabled = false,
  variant = 'default',
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: theme.sizes.touchTargets.medium, // 60pt standard
      paddingHorizontal: theme.spacing.sm,
      backgroundColor: variant === 'minimal' ? 'transparent' : theme.colors.background,
      borderBottomWidth: variant === 'minimal' ? 0 : theme.borders.widths.hairline,
      borderBottomColor: theme.colors.border,
    },
    prominentContainer: {
      height: theme.sizes.touchTargets.large, // 80pt for prominent
      backgroundColor: theme.colors.surface,
    },
    button: {
      minWidth: theme.sizes.touchTargets.small,
      height: theme.sizes.touchTargets.small,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.sm,
    },
    backButton: {
      marginLeft: theme.spacing.xs,
    },
    actionButton: {
      marginRight: theme.spacing.xs,
    },
    titleContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
    },
    title: {
      textAlign: 'center',
    },
    actionText: {
      color: action_disabled ? theme.colors.text_disabled : theme.colors.primary,
    },
    disabledButton: {
      opacity: 0.5,
    },
  });

  // Get appropriate title variant based on header variant
  const title_variant = variant === 'prominent' ? 'heading_3' : 'heading_4';

  return (
    <View 
      style={[
        styles.container,
        variant === 'prominent' && styles.prominentContainer,
        style,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="header"
    >
      {/* Back button or spacer */}
      {on_back ? (
        <Pressable 
          style={[styles.button, styles.backButton]}
          onPress={on_back}
          testID={`${testID}-back`}
          accessible={true}
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={back_icon} 
            size={theme.sizes.icons.md} 
            color={theme.colors.text_primary}
          />
        </Pressable>
      ) : (
        <View style={styles.button} />
      )}
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <TextBase 
          variant={title_variant} 
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </TextBase>
      </View>
      
      {/* Action button or spacer */}
      {on_action ? (
        <Pressable 
          style={[
            styles.button, 
            styles.actionButton,
            action_disabled && styles.disabledButton,
          ]}
          onPress={on_action}
          disabled={action_disabled}
          testID={`${testID}-action`}
          accessible={true}
          accessibilityLabel={action_label}
          accessibilityRole="button"
          accessibilityState={{ disabled: action_disabled }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <TextBase 
            variant="body_medium" 
            style={styles.actionText}
          >
            {action_label}
          </TextBase>
        </Pressable>
      ) : (
        <View style={styles.button} />
      )}
    </View>
  );
};

/**
 * Close-only Modal Header
 * Simplified variant with just close button
 */
export const ModalHeaderClose: React.FC<Omit<ModalHeaderProps, 'on_action' | 'action_label' | 'back_icon'>> = ({
  on_back,
  ...props
}) => {
  return (
    <ModalHeader
      {...props}
      on_back={on_back}
      back_icon="close"
      variant="minimal"
    />
  );
};

/**
 * Modal Header with Multiple Actions
 * For modals that need more than one action
 */
interface ModalHeaderMultipleActionsProps extends Omit<ModalHeaderProps, 'on_action' | 'action_label'> {
  actions: Array<{
    label: string;
    on_press: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'danger';
  }>;
}

export const ModalHeaderMultipleActions: React.FC<ModalHeaderMultipleActionsProps> = ({
  actions,
  ...props
}) => {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      marginRight: theme.spacing.xs,
    },
    actionButton: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    dangerText: {
      color: theme.colors.error,
    },
  });

  const actions_component = (
    <View style={styles.actionsContainer}>
      {actions.map((action, index) => (
        <Pressable
          key={index}
          style={styles.actionButton}
          onPress={action.on_press}
          disabled={action.disabled}
          accessible={true}
          accessibilityLabel={action.label}
          accessibilityRole="button"
        >
          <TextBase
            variant="body_medium"
            style={action.variant === 'danger' ? styles.dangerText : undefined}
          >
            {action.label}
          </TextBase>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ModalHeader {...props} />
      {actions_component}
    </View>
  );
};

// Export all variants
export default ModalHeader;
