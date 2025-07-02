// src/components/molecules/display/PerformanceHint.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/hooks';
import { GlassBase, TextBase, Spacer } from '@/components/atoms';
import { useEntranceAnimation } from '@/hooks/ui/animations';
import type { BaseComponentProps } from '@/types';

interface PerformanceData {
  reps?: number;
  weight?: number;
  duration_seconds?: number;
  distance_meters?: number;
  date?: string;
  is_pr?: boolean;
}

interface PerformanceHintProps extends BaseComponentProps {
  label: string;
  performance: PerformanceData;
  variant?: 'inline' | 'card' | 'compact';
  show_date?: boolean;
  style?: ViewStyle;
}

/**
 * Performance Hint Component
 * Displays previous performance data or personal records
 * Used during workouts to show last/best performance
 */
export const PerformanceHint: React.FC<PerformanceHintProps> = ({
  label,
  performance,
  variant = 'inline',
  show_date = true,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  
  // Format performance text
  const format_performance = (): string => {
    const parts: string[] = [];
    
    if (performance.reps !== undefined) {
      parts.push(`${performance.reps} reps`);
    }
    
    if (performance.weight !== undefined) {
      parts.push(`${performance.weight} lbs`);
    }
    
    if (performance.duration_seconds !== undefined) {
      const minutes = Math.floor(performance.duration_seconds / 60);
      const seconds = performance.duration_seconds % 60;
      if (minutes > 0) {
        parts.push(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        parts.push(`${seconds}s`);
      }
    }
    
    if (performance.distance_meters !== undefined) {
      const km = (performance.distance_meters / 1000).toFixed(2);
      parts.push(`${km} km`);
    }
    
    return parts.join(' × ');
  };
  
  // Format date if provided
  const format_date = (date: string): string => {
    const performance_date = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (performance_date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (performance_date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      const days_ago = Math.floor((today.getTime() - performance_date.getTime()) / (1000 * 60 * 60 * 24));
      if (days_ago < 7) {
        return `${days_ago} days ago`;
      } else {
        return performance_date.toLocaleDateString();
      }
    }
  };
  
  const styles = StyleSheet.create({
    // Inline variant styles
    inlineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    inlineLabel: {
      color: theme.colors.text_secondary,
    },
    inlineValue: {
      fontWeight: theme.typography.body_medium.font_weight,
    },
    
    // Card variant styles
    cardContainer: {
      padding: theme.spacing.md,
      borderRadius: theme.borders.radii.md,
      gap: theme.spacing.xs,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardLabel: {
      color: theme.colors.text_secondary,
    },
    cardValue: {
      fontSize: theme.typography.body_large.font_size,
      fontWeight: theme.typography.body_large.font_weight,
    },
    
    // Compact variant styles
    compactContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      padding: theme.spacing.sm,
      borderRadius: theme.borders.radii.sm,
      backgroundColor: theme.colors.surface,
    },
    compactContent: {
      flex: 1,
    },
    compactLabel: {
      fontSize: theme.typography.caption.font_size,
      color: theme.colors.text_secondary,
    },
    compactValue: {
      fontSize: theme.typography.body_small.font_size,
    },
    
    // Common styles
    prBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xxs,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xxs,
      borderRadius: theme.borders.radii.full,
      backgroundColor: theme.colors.warning,
    },
    prText: {
      color: theme.colors.background,
      fontSize: theme.typography.caption.font_size,
      fontWeight: theme.typography.body_medium.font_weight,
    },
    dateText: {
      color: theme.colors.text_tertiary,
      fontSize: theme.typography.caption.font_size,
    },
  });

  const performance_text = format_performance();
  const accessible_label = accessibilityLabel || 
    `${label}: ${performance_text}${performance.is_pr ? ', Personal Record' : ''}`;

  // Inline variant (simple text display)
  if (variant === 'inline') {
    return (
      <View 
        style={[styles.inlineContainer, style]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessible_label}
      >
        <TextBase variant="body_small" style={styles.inlineLabel}>
          {label}:
        </TextBase>
        <TextBase variant="body_medium" style={styles.inlineValue}>
          {performance_text}
        </TextBase>
        {performance.is_pr && (
          <View style={styles.prBadge}>
            <Ionicons 
              name="trophy" 
              size={theme.sizes.icons.xxs} 
              color={theme.colors.background}
            />
            <TextBase variant="caption" style={styles.prText}>PR</TextBase>
          </View>
        )}
      </View>
    );
  }
  
  // Card variant (full glass card)
  if (variant === 'card') {
    return (
      <GlassBase
        variant="light"
        style={[styles.cardContainer, style]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessible_label}
      >
        <View style={styles.cardHeader}>
          <TextBase variant="body_small" style={styles.cardLabel}>
            {label}
          </TextBase>
          {performance.is_pr && (
            <View style={styles.prBadge}>
              <Ionicons 
                name="trophy" 
                size={theme.sizes.icons.xs} 
                color={theme.colors.background}
              />
              <TextBase variant="caption" style={styles.prText}>PR</TextBase>
            </View>
          )}
        </View>
        
        <TextBase variant="heading_3" style={styles.cardValue}>
          {performance_text}
        </TextBase>
        
        {show_date && performance.date && (
          <TextBase variant="caption" style={styles.dateText}>
            {format_date(performance.date)}
          </TextBase>
        )}
      </GlassBase>
    );
  }
  
  // Compact variant (small inline card)
  return (
    <View 
      style={[styles.compactContainer, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessible_label}
    >
      <View style={styles.compactContent}>
        <TextBase variant="caption" style={styles.compactLabel}>
          {label}
        </TextBase>
        <TextBase variant="body_medium" style={styles.compactValue}>
          {performance_text}
        </TextBase>
      </View>
      
      {performance.is_pr && (
        <Ionicons 
          name="trophy" 
          size={theme.sizes.icons.sm} 
          color={theme.colors.warning}
        />
      )}
    </View>
  );
};

/**
 * Performance Comparison Component
 * Shows current vs previous/target performance
 */
interface PerformanceComparisonProps extends BaseComponentProps {
  current_label?: string;
  current: PerformanceData;
  previous_label?: string;
  previous: PerformanceData;
  style?: ViewStyle;
}

export const PerformanceComparison: React.FC<PerformanceComparisonProps> = ({
  current_label = 'Current',
  current,
  previous_label = 'Previous',
  previous,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    section: {
      flex: 1,
    },
    divider: {
      width: theme.borders.widths.thin,
      backgroundColor: theme.colors.divider,
      marginVertical: theme.spacing.xs,
    },
  });

  return (
    <View 
      style={[styles.container, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
    >
      <View style={styles.section}>
        <PerformanceHint
          label={current_label}
          performance={current}
          variant="compact"
          show_date={false}
        />
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.section}>
        <PerformanceHint
          label={previous_label}
          performance={previous}
          variant="compact"
          show_date={false}
        />
      </View>
    </View>
  );
};

/**
 * Badge Component
 * Small visual indicator for achievements
 */
interface BadgeProps extends BaseComponentProps {
  label: string;
  variant?: 'pr' | 'new' | 'improved' | 'custom';
  color?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'custom',
  color,
  icon,
  size = 'small',
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const { animatedStyle, AnimatedView } = useEntranceAnimation({
    type: 'scale',
    from: { scale: 0, opacity: 0 },
    duration: theme.animation.durations.normal,
  });
  
  const variant_config = {
    pr: {
      bg_color: theme.colors.warning,
      text_color: theme.colors.background,
      icon: 'trophy' as const,
    },
    new: {
      bg_color: theme.colors.info,
      text_color: theme.colors.text_inverse,
      icon: 'sparkles' as const,
    },
    improved: {
      bg_color: theme.colors.success,
      text_color: theme.colors.text_inverse,
      icon: 'trending-up' as const,
    },
    custom: {
      bg_color: color || theme.colors.primary,
      text_color: theme.colors.text_inverse,
      icon: icon,
    },
  };
  
  const config = variant_config[variant];
  const display_icon = icon || config.icon;
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xxs,
      paddingHorizontal: size === 'small' ? theme.spacing.sm : theme.spacing.md,
      paddingVertical: size === 'small' ? theme.spacing.xxs : theme.spacing.xs,
      borderRadius: theme.borders.radii.full,
      backgroundColor: config.bg_color,
    },
    text: {
      color: config.text_color,
      fontSize: size === 'small' 
        ? theme.typography.caption.font_size 
        : theme.typography.body_small.font_size,
      fontWeight: theme.typography.body_medium.font_weight,
    },
  });

  return (
    <AnimatedView style={animatedStyle}>
      <View 
        style={[styles.container, style]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel || label}
        accessibilityRole="text"
      >
        {display_icon && (
          <Ionicons 
            name={display_icon} 
            size={size === 'small' ? theme.sizes.icons.xxs : theme.sizes.icons.xs} 
            color={config.text_color}
          />
        )}
        <TextBase variant="caption" style={styles.text}>
          {label}
        </TextBase>
      </View>
    </AnimatedView>
  );
};

// Export all components
export default PerformanceHint;
