// src/styles/common.ts
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Theme } from '@/theme';

/**
 * Common style patterns used across multiple components
 * Reduces duplication and ensures consistency
 */
export const createCommonStyles = (theme: Theme) => {
  return StyleSheet.create({
    // Container styles
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,

    flexContainer: {
      flex: 1,
    } as ViewStyle,

    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,

    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as ViewStyle,

    // Spacing patterns
    gapSm: {
      gap: theme.spacing.sm,
    } as ViewStyle,

    gapMd: {
      gap: theme.spacing.md,
    } as ViewStyle,

    gapLg: {
      gap: theme.spacing.lg,
    } as ViewStyle,

    // Padding patterns
    paddingSm: {
      padding: theme.spacing.sm,
    } as ViewStyle,

    paddingMd: {
      padding: theme.spacing.md,
    } as ViewStyle,

    paddingLg: {
      padding: theme.spacing.lg,
    } as ViewStyle,

    paddingHorizontalMd: {
      paddingHorizontal: theme.spacing.md,
    } as ViewStyle,

    paddingHorizontalLg: {
      paddingHorizontal: theme.spacing.lg,
    } as ViewStyle,

    // Text styles
    textCenter: {
      textAlign: 'center',
    } as TextStyle,

    textSecondary: {
      color: theme.colors.text_secondary,
    } as TextStyle,

    textTertiary: {
      color: theme.colors.text_tertiary,
    } as TextStyle,

    // Common component patterns
    pill: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borders.radii.full,
    } as ViewStyle,

    card: {
      padding: theme.spacing.lg,
      borderRadius: theme.borders.radii.lg,
    } as ViewStyle,

    button: {
      height: theme.sizes.touchTargets.medium,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borders.radii.md,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,

    buttonLarge: {
      height: theme.sizes.touchTargets.large,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.borders.radii.md,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,

    // State styles
    disabled: {
      opacity: 0.5,
    } as ViewStyle,

    selected: {
      backgroundColor: theme.colors.primary,
    } as ViewStyle,

    // Layout helpers
    absoluteFill: {
      ...StyleSheet.absoluteFillObject,
    } as ViewStyle,

    shadow: {
      ...theme.shadows.md,
    } as ViewStyle,
  });
};

/**
 * Hook to use common styles
 */
export const useCommonStyles = (theme: Theme) => {
  return createCommonStyles(theme);
};

/**
 * Common style combinations
 */
export const commonCombinations = {
  centerPadded: (theme: Theme): ViewStyle => ({
    ...createCommonStyles(theme).centeredContainer,
    ...createCommonStyles(theme).paddingLg,
  }),

  rowGap: (theme: Theme): ViewStyle => ({
    ...createCommonStyles(theme).rowContainer,
    ...createCommonStyles(theme).gapMd,
  }),

  cardPadded: (theme: Theme): ViewStyle => ({
    ...createCommonStyles(theme).card,
    ...createCommonStyles(theme).paddingLg,
  }),
};
