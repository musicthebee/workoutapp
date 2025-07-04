// src/components/molecules/modal/ModalTemplate.tsx
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useTheme } from '@/hooks';
import { GlassBase } from '@/components/atoms';
import type { BaseComponentProps } from '@/types';

interface ModalTemplateProps extends BaseComponentProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  scrollable?: boolean;
  keyboard_avoiding?: boolean;
  content_style?: ViewStyle;
  footer_style?: ViewStyle;
  glass_variant?: 'light' | 'medium' | 'heavy';
}

/**
 * Modal Template Component
 * Base template for ALL modal screens in the app
 * Provides consistent structure: header, scrollable content, footer
 */
export const ModalTemplate: React.FC<ModalTemplateProps> = ({
  children,
  header,
  footer,
  scrollable = true,
  keyboard_avoiding = true,
  content_style,
  footer_style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    content: {
      flex: 1,
    },
    footer: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.border,
      borderTopWidth: theme.borders.widths.hairline,
      paddingBottom: Platform.OS === 'ios' ? theme.spacing.lg : theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      zIndex: theme.zIndices.sticky,
    },
    footerGlass: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    header: {
      height: theme.sizes.touchTargets.medium, // 60pt standard modal header
      zIndex: theme.zIndices.sticky,
    },
    nonScrollContent: {
      flex: 1,
      padding: theme.spacing.lg,
    },
    scrollContent: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
  });

  // Content component based on scrollable prop
  const content = scrollable ? (
    <ScrollView
      style={styles.content}
      contentContainerStyle={[styles.scrollContent, content_style]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      testID={`${testID}-scroll`}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.nonScrollContent, content_style]}>{children}</View>
  );

  // Wrapped content with keyboard avoiding if needed
  const wrapped_content = keyboard_avoiding ? (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={header ? theme.sizes.touchTargets.medium : 0}
    >
      {header && <View style={styles.header}>{header}</View>}
      {content}
      {footer && <View style={[styles.footer, footer_style]}>{footer}</View>}
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.container}>
      {header && <View style={styles.header}>{header}</View>}
      {content}
      {footer && <View style={[styles.footer, footer_style]}>{footer}</View>}
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {wrapped_content}
    </SafeAreaView>
  );
};

/**
 * Modal Template with Glass Footer
 * Variant with glass morphism footer that floats above content
 */
export const ModalTemplateWithGlassFooter: React.FC<ModalTemplateProps> = ({
  footer,
  footer_style,
  glass_variant = 'medium',
  ...props
}) => {
  const theme = useTheme();

  const glass_footer_style = StyleSheet.create({
    footer: {
      paddingBottom: Platform.OS === 'ios' ? theme.spacing.xl : theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
  });

  const footer_component = footer ? (
    <GlassBase
      variant={glass_variant}
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: theme.borders.radii.xl,
          borderTopRightRadius: theme.borders.radii.xl,
        },
        footer_style,
      ]}
    >
      <View style={glass_footer_style.footer}>{footer}</View>
    </GlassBase>
  ) : null;

  return (
    <ModalTemplate
      {...props}
      footer={footer_component}
      content_style={{
        ...props.content_style,
        paddingBottom: footer ? theme.spacing.xxxxxl : undefined,
      }}
    />
  );
};

// Export both variants
export default ModalTemplate;
