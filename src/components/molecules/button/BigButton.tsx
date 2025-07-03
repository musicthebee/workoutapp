// src/components/molecules/button/BigButton.tsx
import React from 'react';
import { StyleSheet, ViewStyle, ActivityIndicator, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ButtonBase, TextBase, type ButtonBaseProps } from '@/components/atoms';
import { useTheme } from '@/hooks';

interface BigButtonProps extends Omit<ButtonBaseProps, 'size'> {
  label: string;
  icon?: string;
  icon_position?: 'left' | 'right';
  loading_text?: string;
  full_width?: boolean;
  style?: ViewStyle;
}

/**
 * Big Button Component
 * Large CTA button that extends ButtonBase
 * Used for primary actions throughout the app
 */
export const BigButton: React.FC<BigButtonProps> = ({
  label,
  icon,
  icon_position = 'left',
  loading,
  loading_text = 'Loading...',
  full_width = true,
  variant = 'primary',
  disabled = false,
  style,
  children,
  ...buttonProps
}) => {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    button: {
      height: theme.sizes.touchTargets.large, // 80pt minimum
      paddingHorizontal: theme.spacing.xl,
      width: full_width ? '100%' : undefined,
      minWidth: full_width ? undefined : theme.spacing.xxxxxl * 2,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
    },
    text: {
      color: variant === 'ghost' 
        ? (disabled ? theme.colors.text_disabled : theme.colors.primary)
        : theme.colors.text_inverse,
    },
    icon: {
      marginHorizontal: theme.spacing.xs,
    },
  });

  
  return (
    <ButtonBase
      {...buttonProps}
      variant={variant}
      size="lg"
      disabled={disabled || loading}
      loading={loading}
      style={[styles.button, style]}
    >
      <View style={styles.content}>
        {/* Loading indicator */}
        {loading && (
          <ActivityIndicator 
            size="small" 
            color={variant === 'ghost' || variant === 'secondary' ? theme.colors.primary : theme.colors.text_primary}
          />
        )}
        
        {/* Left icon */}
        {!loading && icon && icon_position === 'left' && (
          <Ionicons 
            name={icon as any} 
            size={theme.sizes.icons.md} 
            color={variant === 'ghost' || variant === 'secondary' ? theme.colors.primary : theme.colors.text_primary}
            style={styles.icon}
          />
        )}
        
        {/* Button text */}
        <TextBase 
          variant="button_large"
          style={[
            styles.text,
            { color: variant === 'ghost' || variant === 'secondary' ? theme.colors.primary : theme.colors.text_primary }
          ]}
        >
          {loading ? loading_text : (children || label)}
        </TextBase>
        
        {/* Right icon */}
        {!loading && icon && icon_position === 'right' && (
          <Ionicons 
            name={icon as any} 
            size={theme.sizes.icons.md} 
            color={variant === 'ghost' || variant === 'secondary' ? theme.colors.primary : theme.colors.text_primary}
            style={styles.icon}
          />
        )}
      </View>
    </ButtonBase>
  );
};

/**
 * Quick Action Button
 * Variant for home screen quick actions
 * Icon on top, label below
 */
interface QuickActionButtonProps {
  label: string;
  icon: string;
  on_press: () => void;
  variant?: 'primary' | 'secondary';
  badge?: string | number;
  style?: ViewStyle;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  label,
  icon,
  on_press,
  variant = 'primary',
  badge,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      minWidth: theme.sizes.touchTargets.large,
      height: theme.sizes.touchTargets.huge,
      paddingHorizontal: theme.spacing.sm,
      overflow: 'visible',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    iconContainer: {
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      top: -theme.spacing.sm,
      right: -theme.spacing.xs,
      minWidth: theme.spacing.lg,
      height: theme.spacing.lg,
      borderRadius: theme.borders.radii.full,
      backgroundColor: theme.colors.error,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xxs,
    },
    badgeText: {
      color: theme.colors.text_inverse,
      fontSize: theme.typography.caption.font_size - 2,
    },
    label: {
      textAlign: 'center',
      color: variant === 'primary' ? theme.colors.text_inverse : theme.colors.primary,
    },
  });

  return (
    <ButtonBase
      variant={variant}
      size="lg"
      onPress={on_press}
      style={[styles.container, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || `${label}${badge ? `, ${badge} new` : ''}`}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={icon as any} 
            size={theme.sizes.icons.xl} 
            color={variant === 'primary' ? theme.colors.text_inverse : theme.colors.primary}
          />
          {badge !== undefined && badge !== 0 && (
            <View style={styles.badge}>
              <TextBase variant="caption" style={styles.badgeText}>
                {typeof badge === 'number' && badge > 99 ? '99+' : badge}
              </TextBase>
            </View>
          )}
        </View>
        <TextBase variant="body_small" style={styles.label}>
          {label}
        </TextBase>
      </View>
    </ButtonBase>
  );
};

/**
 * Floating Action Button
 * For adding exercises during workout
 */
interface FloatingActionButtonProps {
  icon?: string;
  on_press: () => void;
  visible?: boolean;
  style?: ViewStyle;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon = 'add' as any,
  on_press,
  visible = true,
  style,
  testID,
  accessible = true,
  accessibilityLabel = 'Add exercise',
}) => {
  const theme = useTheme();
  
  if (!visible) return null;
  
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: theme.spacing.xl,
      right: theme.spacing.xl,
      width: theme.sizes.touchTargets.large,
      height: theme.sizes.touchTargets.large,
      borderRadius: theme.borders.radii.full,
      elevation: theme.shadows.lg.elevation,
      shadowColor: theme.colors.shadow,
      shadowOffset: theme.shadows.lg.shadowOffset,
      shadowOpacity: theme.shadows.lg.shadowOpacity,
      shadowRadius: theme.shadows.lg.shadowRadius,
    },
  });

  return (
    <ButtonBase
      variant="primary"
      size="lg"
      onPress={on_press}
      style={[styles.container, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      <Ionicons 
        name={icon} 
        size={theme.sizes.icons.lg} 
        color={theme.colors.text_inverse}
      />
    </ButtonBase>
  );
};

// Export all button variants
export default BigButton;
