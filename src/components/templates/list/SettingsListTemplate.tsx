// src/components/templates/list/SettingsListTemplate.tsx
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextBase } from '@/components/atoms';
import { EmptyState } from '@/components/molecules';
import { SettingsSection } from '@/components/organisms';
import { useTheme } from '@/hooks';
import type { SettingsListTemplateProps } from '@/types';

/**
 * Settings List Template
 * Template for displaying grouped settings lists
 * Handles loading states, empty states, and scrollable content
 */
export const SettingsListTemplate: React.FC<SettingsListTemplateProps> = ({
  sections,
  header,
  footer,
  empty_state,
  loading = false,
  testID,
  accessible = true,
  accessibilityLabel = 'Settings list',
  ...props
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    emptyContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing.xl,
    },
    footer: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.border,
      borderTopWidth: theme.borders.widths.hairline,
      paddingBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.lg,
    },
    header: {
      paddingBottom: 0,
      paddingHorizontal: 0,
      paddingTop: 0,
    },
    loadingContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing.xl,
    },
    loadingText: {
      color: theme.colors.text_secondary,
      marginTop: theme.spacing.md,
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: theme.spacing.md,
      paddingHorizontal: 0,
    },
  });

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container} {...props}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <TextBase variant="body_medium" style={styles.loadingText}>
            Loading settings...
          </TextBase>
        </View>
      </SafeAreaView>
    );
  }

  // Empty state
  if (sections.length === 0) {
    return (
      <SafeAreaView style={styles.container} {...props}>
        {header && <View style={styles.header}>{header}</View>}
        <View style={styles.emptyContainer}>
          {empty_state || (
            <EmptyState
              icon="settings-outline"
              title="No Settings Available"
              message="Settings will appear here when available"
              testID={`${testID}-empty`}
            />
          )}
        </View>
        {footer && <View style={styles.footer}>{footer}</View>}
      </SafeAreaView>
    );
  }

  const accessibilityProps = {
    accessible,
    accessibilityLabel,
    testID,
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}
      {...accessibilityProps}
      {...props}
    >
      {/* Header */}
      {header && <View style={styles.header}>{header}</View>}

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        testID={`${testID}-scroll`}
      >
        {sections.map((section, index) => (
          <SettingsSection
            key={section.id}
            section={section}
            show_section_divider={index < sections.length - 1}
            testID={`${testID}-section-${section.id}`}
          />
        ))}
      </ScrollView>

      {/* Footer */}
      {footer && <View style={styles.footer}>{footer}</View>}
    </SafeAreaView>
  );
};

export default SettingsListTemplate;
