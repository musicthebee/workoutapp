// src/components/molecules/list/SettingsRow.tsx
import React from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { TextBase } from '@/components/atoms';
import { useTheme } from '@/hooks';
import type { SettingsRowProps } from '@/types';

/**
 * Settings Row Component
 * Base component for all settings list items
 * Handles different row types: toggle, action, display, navigation
 */
export const SettingsRow: React.FC<SettingsRowProps> = ({
  item,
  is_first = false,
  is_last = false,
  show_divider = true,
  testID,
  accessible = true,
  accessibilityLabel,
  ...props
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    badge: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borders.radii.full,
      height: theme.spacing.lg,
      justifyContent: 'center',
      minWidth: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xxs,
    },
    badgeText: {
      color: theme.colors.text_inverse,
      fontSize: theme.typography.caption.font_size - 2,
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderBottomLeftRadius: is_last ? theme.borders.radii.lg : 0,
      borderBottomRightRadius: is_last ? theme.borders.radii.lg : 0,
      borderTopLeftRadius: is_first ? theme.borders.radii.lg : 0,
      borderTopRightRadius: is_first ? theme.borders.radii.lg : 0,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    divider: {
      backgroundColor: theme.colors.border,
      height: theme.borders.widths.hairline,
      marginLeft: item.icon
        ? theme.sizes.icons.lg + theme.spacing.lg + theme.spacing.md
        : theme.spacing.lg,
    },
    iconContainer: {
      alignItems: 'center',
      marginRight: theme.spacing.md,
      width: theme.sizes.icons.lg + theme.spacing.xs,
    },
    pressable: {
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: theme.sizes.touchTargets.medium,
      opacity: item.disabled ? 0.5 : 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    subtitle: {
      color: theme.colors.text_secondary,
    },
    title: {
      color: item.destructive ? theme.colors.error : theme.colors.text_primary,
      marginBottom: item.subtitle ? theme.spacing.xxs : 0,
    },
    valueContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    valueText: {
      color: theme.colors.text_secondary,
    },
  });

  const renderIcon = () => {
    if (!item.icon) {
      return null;
    }

    return (
      <View style={styles.iconContainer}>
        <Icon
          name={item.icon}
          size={theme.sizes.icons.md}
          color={item.destructive ? theme.colors.error : theme.colors.text_secondary}
        />
      </View>
    );
  };

  const renderValue = () => {
    switch (item.type) {
      case 'toggle':
        return (
          <Switch
            value={Boolean(item.value)}
            onValueChange={item.on_toggle}
            disabled={item.disabled}
            trackColor={{
              false: theme.colors.surface,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.text_inverse}
            testID={`${testID}-switch`}
          />
        );

      case 'display':
        return (
          <View style={styles.valueContainer}>
            {item.badge !== undefined && item.badge !== 0 && (
              <View style={styles.badge}>
                <TextBase variant="caption" style={styles.badgeText}>
                  {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                </TextBase>
              </View>
            )}
            {item.value && (
              <TextBase variant="body_medium" style={styles.valueText}>
                {String(item.value)}
              </TextBase>
            )}
          </View>
        );

      case 'action':
      case 'navigation':
        return (
          <View style={styles.valueContainer}>
            {item.badge !== undefined && item.badge !== 0 && (
              <View style={styles.badge}>
                <TextBase variant="caption" style={styles.badgeText}>
                  {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                </TextBase>
              </View>
            )}
            {item.value && (
              <TextBase variant="body_medium" style={styles.valueText}>
                {String(item.value)}
              </TextBase>
            )}
            {item.chevron !== false && item.type === 'navigation' && (
              <Icon
                name="chevron-forward"
                size={theme.sizes.icons.sm}
                color={theme.colors.text_tertiary}
              />
            )}
          </View>
        );

      default:
        return null;
    }
  };

  const handlePress = () => {
    if (item.disabled) {
      return;
    }

    if (item.type === 'toggle' && item.on_toggle) {
      item.on_toggle(!item.value);
    } else if (item.on_press) {
      item.on_press();
    }
  };

  const isPressable =
    !item.disabled &&
    ((item.type === 'toggle' && item.on_toggle) || (item.type !== 'toggle' && item.on_press));

  const accessibilityProps = {
    accessible,
    accessibilityLabel:
      accessibilityLabel || `${item.title}${item.subtitle ? `, ${item.subtitle}` : ''}`,
    accessibilityRole: item.type === 'toggle' ? ('switch' as const) : ('button' as const),
    accessibilityState: {
      disabled: item.disabled,
      checked: item.type === 'toggle' ? Boolean(item.value) : undefined,
    },
    testID,
  };

  const content = (
    <View style={styles.pressable}>
      {renderIcon()}
      <View style={styles.contentContainer}>
        <TextBase variant="body_medium" style={styles.title}>
          {item.title}
        </TextBase>
        {item.subtitle && (
          <TextBase variant="body_small" style={styles.subtitle}>
            {item.subtitle}
          </TextBase>
        )}
      </View>
      {renderValue()}
    </View>
  );

  return (
    <View style={styles.container} {...props}>
      {isPressable ? (
        <TouchableOpacity onPress={handlePress} {...accessibilityProps}>
          {content}
        </TouchableOpacity>
      ) : (
        <View {...accessibilityProps}>{content}</View>
      )}
      {!is_last && show_divider && <View style={styles.divider} />}
    </View>
  );
};

export default SettingsRow;
