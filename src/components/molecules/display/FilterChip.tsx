// src/components/molecules/display/FilterChip.tsx
import React from 'react';
import { StyleSheet, Pressable, View, ViewStyle, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/hooks';
import { GlassBase, TextBase } from '@/components/atoms';
import { PressableGlass } from '@/components/atoms/glass/PressableGlass';
import { useEntranceAnimation, useStaggerAnimation } from '@/hooks/ui/animations';
import type { BaseComponentProps } from '@/types';

interface FilterChipProps extends BaseComponentProps {
  label: string;
  is_selected?: boolean;
  on_press?: () => void;
  on_remove?: () => void;
  variant?: 'default' | 'compact' | 'removable';
  icon?: keyof typeof Ionicons.glyphMap;
  count?: number;
  style?: ViewStyle;
}

/**
 * Filter Chip Component
 * Displays active filters or selectable filter options
 * Used in filter bars and filter modals
 */
export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  is_selected = false,
  on_press,
  on_remove,
  variant = 'default',
  icon,
  count,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  
  const size_config = {
    default: {
      height: theme.sizes.touchTargets.small,
      padding_horizontal: theme.spacing.md,
      icon_size: theme.sizes.icons.xs,
      font_variant: 'body_medium' as const,
    },
    compact: {
      height: 36,
      padding_horizontal: theme.spacing.sm,
      icon_size: theme.sizes.icons.xxs,
      font_variant: 'body_small' as const,
    },
    removable: {
      height: theme.sizes.touchTargets.small,
      padding_horizontal: theme.spacing.md,
      icon_size: theme.sizes.icons.xs,
      font_variant: 'body_medium' as const,
    },
  };
  
  const config = size_config[variant];
  
  const styles = StyleSheet.create({
    container: {
      height: config.height,
      paddingHorizontal: config.padding_horizontal,
      borderRadius: theme.borders.radii.full,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    selected: {
      backgroundColor: theme.colors.primary,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    label: {
      color: is_selected ? theme.colors.text_inverse : theme.colors.text_primary,
    },
    count: {
      marginLeft: theme.spacing.xxs,
      color: is_selected ? theme.colors.text_inverse : theme.colors.text_secondary,
    },
    removeButton: {
      marginLeft: theme.spacing.xs,
      marginRight: -theme.spacing.xs,
      padding: theme.spacing.xxs,
    },
  });

  const handle_press = () => {
    if (variant === 'removable' && on_remove) {
      on_remove();
    } else if (on_press) {
      on_press();
    }
  };

  const chip_content = (
    <View style={styles.content}>
      {icon && (
        <Ionicons 
          name={icon} 
          size={config.icon_size} 
          color={is_selected ? theme.colors.text_inverse : theme.colors.text_secondary}
        />
      )}
      
      <TextBase 
        variant={config.font_variant} 
        style={styles.label}
      >
        {label}
      </TextBase>
      
      {count !== undefined && count > 0 && (
        <TextBase 
          variant="caption" 
          style={styles.count}
        >
          ({count})
        </TextBase>
      )}
      
      {variant === 'removable' && (
        <Pressable
          onPress={on_remove}
          style={styles.removeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          testID={`${testID}-remove`}
          accessible={true}
          accessibilityLabel="Remove filter"
          accessibilityRole="button"
        >
          <Ionicons 
            name="close" 
            size={config.icon_size} 
            color={is_selected ? theme.colors.text_inverse : theme.colors.text_secondary}
          />
        </Pressable>
      )}
    </View>
  );

  if (on_press || on_remove) {
    return (
      <PressableGlass
        variant={is_selected ? 'medium' : 'light'}
        onPress={handle_press}
        glass_style={[
          styles.container,
          is_selected && styles.selected,
          style,
        ]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel || `${label} filter${is_selected ? ', selected' : ''}${count ? `, ${count} items` : ''}`}
        accessibilityRole="button"
        accessibilityState={{ selected: is_selected }}
      >
        {chip_content}
      </PressableGlass>
    );
  }

  return (
    <GlassBase
      variant={is_selected ? 'medium' : 'light'}
      style={[
        styles.container,
        is_selected && styles.selected,
        style,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {chip_content}
    </GlassBase>
  );
};

/**
 * Filter Chip Group Component
 * Manages a group of filter chips with consistent spacing
 */
interface FilterChipGroupProps extends BaseComponentProps {
  chips: Array<{
    id: string;
    label: string;
    is_selected?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    count?: number;
  }>;
  on_chip_press?: (id: string) => void;
  on_chip_remove?: (id: string) => void;
  variant?: 'default' | 'compact' | 'removable';
  wrap?: boolean;
  style?: ViewStyle;
}

export const FilterChipGroup: React.FC<FilterChipGroupProps> = ({
  chips,
  on_chip_press,
  on_chip_remove,
  variant = 'default',
  wrap = true,
  style,
  testID,
  accessible = true,
  accessibilityLabel = 'Filter options',
}) => {
  const theme = useTheme();
  const { getItemStyle, AnimatedView } = useStaggerAnimation({
    itemCount: chips.length,
    staggerDelay: 30,
    type: 'scale',
  });
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      flexWrap: wrap ? 'wrap' : 'nowrap',
    },
  });

  return (
    <View 
      style={[styles.container, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="group"
    >
      {chips.map((chip, index) => (
        <AnimatedView key={chip.id} style={getItemStyle(index)}>
          <FilterChip
            label={chip.label}
            is_selected={chip.is_selected}
            icon={chip.icon}
            count={chip.count}
            on_press={on_chip_press ? () => on_chip_press(chip.id) : undefined}
            on_remove={on_chip_remove ? () => on_chip_remove(chip.id) : undefined}
            variant={variant}
            testID={`${testID}-chip-${chip.id}`}
          />
        </AnimatedView>
      ))}
    </View>
  );
};

/**
 * Active Filters Display
 * Shows currently active filters with remove option
 */
interface ActiveFiltersProps extends BaseComponentProps {
  filters: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  on_remove: (id: string) => void;
  on_clear_all?: () => void;
  style?: ViewStyle;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  on_remove,
  on_clear_all,
  style,
  testID,
  accessible = true,
  accessibilityLabel = 'Active filters',
}) => {
  const theme = useTheme();
  
  if (filters.length === 0) return null;
  
  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.text_secondary,
    },
    clearButton: {
      padding: theme.spacing.xs,
    },
    clearText: {
      color: theme.colors.primary,
    },
    filters: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
  });

  return (
    <View 
      style={[styles.container, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={styles.header}>
        <TextBase variant="body_small" style={styles.title}>
          Active Filters ({filters.length})
        </TextBase>
        
        {on_clear_all && filters.length > 1 && (
          <Pressable
            onPress={on_clear_all}
            style={styles.clearButton}
            testID={`${testID}-clear-all`}
            accessible={true}
            accessibilityLabel="Clear all filters"
            accessibilityRole="button"
          >
            <TextBase variant="body_small" style={styles.clearText}>
              Clear All
            </TextBase>
          </Pressable>
        )}
      </View>
      
      <View style={styles.filters}>
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            label={`${filter.label}: ${filter.value}`}
            is_selected
            on_remove={() => on_remove(filter.id)}
            variant="removable"
            testID={`${testID}-filter-${filter.id}`}
          />
        ))}
      </View>
    </View>
  );
};

// Export all components
export default FilterChip;
