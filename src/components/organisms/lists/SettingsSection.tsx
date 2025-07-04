// src/components/organisms/lists/SettingsSection.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TextBase } from '@/components/atoms';
import { SettingsRow } from '@/components/molecules';
import { useTheme } from '@/hooks';
import type { SettingsSectionProps } from '@/types';

/**
 * Settings Section Component
 * Groups related settings items with optional section header
 * Handles first/last row styling and dividers
 */
export const SettingsSection: React.FC<SettingsSectionProps> = ({
  section,
  show_section_divider = true,
  testID,
  accessible = true,
  accessibilityLabel,
  ...props
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: show_section_divider ? theme.spacing.xl : 0,
    },
    header: {
      marginBottom: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
    },
    itemsContainer: {
      backgroundColor: 'transparent',
    },
    subtitle: {
      color: theme.colors.text_secondary,
    },
    title: {
      color: theme.colors.text_primary,
      marginBottom: section.subtitle ? theme.spacing.xxs : 0,
    },
  });

  if (section.items.length === 0) {
    return null;
  }

  const accessibilityProps = {
    accessible,
    accessibilityLabel: accessibilityLabel || `${section.title || 'Settings'} section`,
    testID,
  };

  return (
    <View style={styles.container} {...accessibilityProps} {...props}>
      {/* Section Header */}
      {(section.title || section.subtitle) && (
        <View style={styles.header}>
          {section.title && (
            <TextBase variant="heading_4" style={styles.title}>
              {section.title}
            </TextBase>
          )}
          {section.subtitle && (
            <TextBase variant="body_small" style={styles.subtitle}>
              {section.subtitle}
            </TextBase>
          )}
        </View>
      )}

      {/* Settings Items */}
      <View style={styles.itemsContainer}>
        {section.items.map((item, index) => (
          <SettingsRow
            key={item.id}
            item={item}
            is_first={index === 0}
            is_last={index === section.items.length - 1}
            show_divider={index < section.items.length - 1}
            testID={`${testID}-item-${item.id}`}
          />
        ))}
      </View>
    </View>
  );
};

export default SettingsSection;
