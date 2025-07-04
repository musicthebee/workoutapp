// src/components/molecules/display/StatCard.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/hooks';
import { TextBase, AnimatedValue } from '@/components/atoms';
import { PressableGlass } from '@/components/atoms/glass/PressableGlass';
import { useEntranceAnimation, useStaggerAnimation } from '@/hooks/ui/animations';
import type { BaseComponentProps } from '@/types';

interface StatCardProps extends BaseComponentProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trend_value?: string;
  variant?: 'default' | 'compact' | 'prominent';
  on_press?: () => void;
  animated?: boolean;
  style?: ViewStyle;
}

/**
 * Stat Card Component
 * Displays metrics and statistics in a card format
 * Used for dashboard stats, performance metrics, etc.
 */
export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  icon,
  trend,
  trend_value,
  variant = 'default',
  on_press,
  animated = false,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const entranceAnimation = useEntranceAnimation({ type: 'scale', duration: theme.animation.durations.normal.duration });
  
  // Trend configuration
  const trend_config = {
    up: {
      icon: 'trending-up' as const,
      color: theme.colors.success,
    },
    down: {
      icon: 'trending-down' as const,
      color: theme.colors.error,
    },
    neutral: {
      icon: 'remove' as const,
      color: theme.colors.text_secondary,
    },
  };
  
  // Size configuration
  const size_config = {
    default: {
      padding: theme.spacing.lg,
      icon_size: theme.sizes.icons.md,
      value_size: theme.typography.heading_2.font_size,
      label_variant: 'body_medium' as const,
      gap: theme.spacing.sm,
    },
    compact: {
      padding: theme.spacing.md,
      icon_size: theme.sizes.icons.sm,
      value_size: theme.typography.heading_3.font_size,
      label_variant: 'body_small' as const,
      gap: theme.spacing.xs,
    },
    prominent: {
      padding: theme.spacing.xl,
      icon_size: theme.sizes.icons.lg,
      value_size: theme.typography.heading_1.font_size,
      label_variant: 'body_large' as const,
      gap: theme.spacing.md,
    },
  };
  
  const config = size_config[variant];
  
  const styles = StyleSheet.create({
    container: {
      padding: config.padding,
      borderRadius: theme.borders.radii.lg,
    },
    content: {
      gap: config.gap,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      flex: 1,
    },
    label: {
      color: theme.colors.text_secondary,
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    value: {
      fontSize: config.value_size,
      lineHeight: config.value_size * 1.1,
      fontWeight: theme.typography.heading_1.font_weight,
      color: theme.colors.text_primary,
    },
    unit: {
      fontSize: config.label_variant === 'body_small' 
        ? theme.typography.caption.font_size 
        : theme.typography.body_small.font_size,
      color: theme.colors.text_secondary,
      marginBottom: variant === 'prominent' ? theme.spacing.xs : 0,
    },
    trendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xxs,
    },
    trendValue: {
      fontSize: theme.typography.caption.font_size,
    },
  });

  const content = (
    <View style={styles.content}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          {icon && (
            <Ionicons 
              name={icon as any} 
              size={config.icon_size} 
              color={theme.colors.text_secondary}
            />
          )}
          <TextBase variant={config.label_variant} style={styles.label}>
            {label}
          </TextBase>
        </View>
      </View>
      
      <View style={styles.bottomRow}>
        <View style={styles.valueContainer}>
          {animated && typeof value === 'number' ? (
            <AnimatedValue 
              value={value}
              style={styles.value}
              duration={theme.animation.durations.slow.duration}
            />
          ) : (
            <TextBase variant="heading_2" style={styles.value}>
              {value}
            </TextBase>
          )}
          {unit && (
            <TextBase variant="caption" style={styles.unit}>
              {unit}
            </TextBase>
          )}
        </View>
        
        {trend && (
          <View style={styles.trendContainer}>
            <Ionicons 
              name={trend_config[trend].icon} 
              size={theme.sizes.icons.xs} 
              color={trend_config[trend].color}
            />
            {trend_value && (
              <TextBase 
                variant="caption" 
                style={[
                  styles.trendValue,
                  { color: trend_config[trend].color }
                ]}
              >
                {trend_value}
              </TextBase>
            )}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <entranceAnimation.AnimatedView style={entranceAnimation.animatedStyle}>
      <PressableGlass
        variant="light"
        onPress={on_press}
        glass_style={[styles.container, style] as any}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel || `${label}: ${value} ${unit || ''}`}
      >
        {content}
      </PressableGlass>
    </entranceAnimation.AnimatedView>
  );
};

/**
 * Stat Card Grid Component
 * Displays multiple stat cards in a grid layout
 */
interface StatCardGridProps extends BaseComponentProps {
  stats: Array<{
    id: string;
    label: string;
    value: string | number;
    unit?: string;
    icon?: string;
    trend?: 'up' | 'down' | 'neutral';
    trend_value?: string;
    on_press?: () => void;
  }>;
  columns?: 2 | 3;
  variant?: 'default' | 'compact' | 'prominent';
  animated?: boolean;
  style?: ViewStyle;
}

export const StatCardGrid: React.FC<StatCardGridProps> = ({
  stats,
  columns = 2,
  variant = 'default',
  animated = false,
  style,
  testID,
  accessible = true,
  accessibilityLabel = 'Statistics',
}) => {
  const theme = useTheme();
  const { getItemStyle, AnimatedView } = useStaggerAnimation({
    itemCount: stats.length,
    staggerDelay: 50,
    type: 'scale',
  });
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    card: {
      flex: 1,
      minWidth: columns === 2 ? '45%' : '30%',
      maxWidth: columns === 2 ? '48%' : '32%',
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
      {stats.map((stat, index) => (
        <AnimatedView key={stat.id} style={[styles.card, getItemStyle(index)]}>
          <StatCard
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            icon={stat.icon}
            trend={stat.trend}
            trend_value={stat.trend_value}
            variant={variant}
            on_press={stat.on_press}
            animated={animated}
            testID={`${testID}-stat-${stat.id}`}
          />
        </AnimatedView>
      ))}
    </View>
  );
};

/**
 * Mini Stat Component
 * Compact inline stat display
 */
interface MiniStatProps extends BaseComponentProps {
  label: string;
  value: string | number;
  icon?: string;
  style?: ViewStyle;
}

export const MiniStat: React.FC<MiniStatProps> = ({
  label,
  value,
  icon,
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
      gap: theme.spacing.xs,
    },
    iconContainer: {
      width: theme.sizes.touchTargets.small * 0.8,
      height: theme.sizes.touchTargets.small * 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.borders.radii.sm,
      backgroundColor: theme.colors.surface,
    },
    textContainer: {
      gap: theme.spacing.xxxs,
    },
    label: {
      color: theme.colors.text_secondary,
    },
    value: {
      fontWeight: theme.typography.body_medium.font_weight,
    },
  });

  return (
    <View 
      style={[styles.container, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || `${label}: ${value}`}
    >
      {icon && (
        <View style={styles.iconContainer}>
          <Ionicons 
            name={icon} 
            size={theme.sizes.icons.sm} 
            color={theme.colors.text_secondary}
          />
        </View>
      )}
      
      <View style={styles.textContainer}>
        <TextBase variant="body_small" style={styles.label}>
          {label}
        </TextBase>
        <TextBase variant="body_small" style={styles.value}>
          {value}
        </TextBase>
      </View>
    </View>
  );
};

// Export all components
export default StatCard;
