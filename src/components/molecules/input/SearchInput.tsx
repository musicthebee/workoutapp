// src/components/molecules/input/SearchInput.tsx
import React, { useCallback, useRef, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable, 
  TextInput,
  ViewStyle,
  ActivityIndicator,
  Platform,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/hooks';
import { InputBase, GlassBase, TextBase } from '@/components/atoms';
import { useTransitionAnimation, usePressAnimation } from '@/hooks/ui/animations';
import type { BaseComponentProps } from '@/types';

interface SearchInputProps extends BaseComponentProps {
  value: string;
  on_change_text: (text: string) => void;
  placeholder?: string;
  on_submit?: () => void;
  on_clear?: () => void;
  on_focus?: () => void;
  on_blur?: () => void;
  is_loading?: boolean;
  auto_focus?: boolean;
  variant?: 'default' | 'prominent' | 'minimal';
  style?: ViewStyle;
}

/**
 * Search Input Component
 * Specialized input for search functionality
 * Includes search icon, clear button, and loading state
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  on_change_text,
  placeholder = 'Search...',
  on_submit,
  on_clear,
  on_focus,
  on_blur,
  is_loading = false,
  auto_focus = false,
  variant = 'default',
  style,
  testID,
  accessible = true,
  accessibilityLabel = 'Search input',
}) => {
  const theme = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const clearButtonAnimation = usePressAnimation({ scale: 0.8 });
  const focusAnimation = useTransitionAnimation(isFocused, { type: 'fade', duration: theme.animation.durations.fast });
  
  const handle_clear = useCallback(() => {
    on_change_text('');
    on_clear?.();
    inputRef.current?.focus();
  }, [on_change_text, on_clear]);
  
  const handle_focus = useCallback(() => {
    setIsFocused(true);
    on_focus?.();
  }, [on_focus]);

  const handle_blur = useCallback(() => {
    setIsFocused(false);
    on_blur?.();
  }, [on_blur]);
  
  const size_config = {
    default: {
      height: theme.sizes.inputs.md,
      icon_size: theme.sizes.icons.sm,
      font_size: theme.typography.body_medium.font_size,
    },
    prominent: {
      height: theme.sizes.inputs.lg,
      icon_size: theme.sizes.icons.md,
      font_size: theme.typography.body_large.font_size,
    },
    minimal: {
      height: theme.sizes.inputs.sm,
      icon_size: theme.sizes.icons.xs,
      font_size: theme.typography.body_small.font_size,
    },
  };
  
  const config = size_config[variant];
  
  const styles = StyleSheet.create({
    container: {
      height: config.height,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borders.radii.md,
      borderWidth: variant === 'minimal' ? 0 : theme.borders.widths.thin,
      borderColor: theme.colors.glass_border,
      backgroundColor: variant === 'minimal' ? 'transparent' : undefined,
    },
    searchIcon: {
      marginRight: theme.spacing.sm,
    },
    input: {
      flex: 1,
      fontSize: config.font_size,
      color: theme.colors.text_primary,
      padding: 0,
      ...Platform.select({
        ios: {
          paddingVertical: theme.spacing.xs,
        },
        android: {
          paddingVertical: 0,
        },
      }),
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: theme.spacing.sm,
    },
    clearButton: {
      padding: theme.spacing.xs,
      marginLeft: theme.spacing.xs,
    },
    loadingContainer: {
      marginLeft: theme.spacing.sm,
    },
  });

  const glass_props = variant !== 'minimal' ? {
    variant: 'light' as const,
    style: [styles.container, style],
  } : undefined;

  const content = (
    <>
      <Ionicons 
        name="search" 
        size={config.icon_size} 
        color={theme.colors.text_tertiary}
        style={styles.searchIcon}
      />
      
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={on_change_text}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text_tertiary}
        onSubmitEditing={on_submit}
        onFocus={handle_focus}
        onBlur={handle_blur}
        autoFocus={auto_focus}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        testID={`${testID}-input`}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
      />
      
      <View style={styles.actionContainer}>
        {is_loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size="small" 
              color={theme.colors.text_tertiary}
              testID={`${testID}-loading`}
            />
          </View>
        )}
        
        {value.length > 0 && !is_loading && (
          <Pressable
            onPress={handle_clear}
            onPressIn={clearButtonAnimation.handlePressIn}
            onPressOut={clearButtonAnimation.handlePressOut}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            testID={`${testID}-clear`}
            accessible={true}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <Animated.View style={clearButtonAnimation.animatedStyle}>
              <Ionicons 
                name="close-circle" 
                size={config.icon_size} 
                color={theme.colors.text_tertiary}
              />
            </Animated.View>
          </Pressable>
        )}
      </View>
    </>
  );

  if (variant === 'minimal') {
    return (
      <View style={[styles.container, style]}>
        {content}
      </View>
    );
  }

  return (
    <GlassBase {...glass_props}>
      {content}
    </GlassBase>
  );
};

/**
 * Search Bar Component
 * Search input with filter button
 */
interface SearchBarProps extends SearchInputProps {
  on_filter_press?: () => void;
  filter_count?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  on_filter_press,
  filter_count = 0,
  style,
  ...searchProps
}) => {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    searchContainer: {
      flex: 1,
    },
    filterButton: {
      width: theme.sizes.touchTargets.medium,
      height: theme.sizes.touchTargets.medium,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.borders.radii.md,
      position: 'relative',
    },
    filterBadge: {
      position: 'absolute',
      top: theme.spacing.xs,
      right: theme.spacing.xs,
      minWidth: theme.spacing.md,
      height: theme.spacing.md,
      borderRadius: theme.borders.radii.full,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xxs,
    },
    filterBadgeText: {
      color: theme.colors.text_inverse,
      fontSize: 10,
      fontWeight: theme.typography.body_medium.font_weight,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <SearchInput {...searchProps} />
      </View>
      
      {on_filter_press && (
        <Pressable
          onPress={on_filter_press}
          testID={`${searchProps.testID}-filter`}
          accessible={true}
          accessibilityLabel={`Filter${filter_count > 0 ? `, ${filter_count} active` : ''}`}
          accessibilityRole="button"
        >
          <GlassBase variant="light" style={styles.filterButton}>
            <Ionicons 
              name="filter" 
              size={theme.sizes.icons.md} 
              color={filter_count > 0 ? theme.colors.primary : theme.colors.text_primary}
            />
            {filter_count > 0 && (
              <View style={styles.filterBadge}>
                <TextBase variant="caption" style={styles.filterBadgeText}>
                  {filter_count}
                </TextBase>
              </View>
            )}
          </GlassBase>
        </Pressable>
      )}
    </View>
  );
};

// Export both components
export default SearchInput;
