// src/components/molecules/input/NumberStepper.tsx
import React, { useCallback } from 'react';
import { View, StyleSheet, Pressable, ViewStyle, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/hooks';
import { TextBase, GlassBase, Spacer } from '@/components/atoms';
import { PressableGlass } from '@/components/atoms/glass/PressableGlass';
import { usePressAnimation, useValueChangeAnimation, useStaggerAnimation } from '@/hooks/ui/animations';
import type { BaseComponentProps } from '@/types';

interface NumberStepperProps extends BaseComponentProps {
  value: number;
  on_value_change: (value: number) => void;
  increment?: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  variant?: 'default' | 'large' | 'compact';
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * Number Stepper Component
 * Core input for numeric values with increment/decrement
 * Used for sets, reps, weight, duration, etc.
 */
export const NumberStepper: React.FC<NumberStepperProps> = ({
  value,
  on_value_change,
  increment = 1,
  min,
  max,
  label,
  unit,
  variant = 'default',
  disabled = false,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const decreaseAnimation = usePressAnimation({ scale: 0.9 });
  const increaseAnimation = usePressAnimation({ scale: 0.9 });
  const animatedValue = useValueChangeAnimation(value, theme.animation.durations.fast);
  
  // Handle decrease
  const decrease = useCallback((): void => {
    const new_value = value - increment;
    if (min !== undefined && new_value < min) return;
    on_value_change(new_value);
  }, [value, increment, min, on_value_change]);
  
  // Handle increase
  const increase = useCallback((): void => {
    const new_value = value + increment;
    if (max !== undefined && new_value > max) return;
    on_value_change(new_value);
  }, [value, increment, max, on_value_change]);
  
  // Check if buttons should be disabled
  const can_decrease = !disabled && (min === undefined || value > min);
  const can_increase = !disabled && (max === undefined || value < max);
  
  // Size configurations
  const size_config = {
    default: {
      button_size: theme.sizes.touchTargets.large, // 80pt
      icon_size: theme.sizes.icons.lg,
      value_font_size: 48,
      gap: theme.spacing.xl,
    },
    large: {
      button_size: theme.sizes.touchTargets.huge, // 100pt
      icon_size: theme.sizes.icons.xl,
      value_font_size: 56,
      gap: theme.spacing.xxl,
    },
    compact: {
      button_size: theme.sizes.touchTargets.medium, // 60pt
      icon_size: theme.sizes.icons.md,
      value_font_size: 32,
      gap: theme.spacing.md,
    },
  };
  
  const config = size_config[variant];
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    label: {
      textAlign: 'center',
      color: theme.colors.text_secondary,
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: config.gap,
    },
    button: {
      width: config.button_size,
      height: config.button_size,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.borders.radii.lg,
    },
    buttonDisabled: {
      opacity: 0.3,
    },
    valueContainer: {
      minWidth: config.button_size,
      alignItems: 'center',
    },
    value: {
      fontSize: config.value_font_size,
      lineHeight: config.value_font_size * 1.1,
      fontWeight: theme.typography.heading_1.font_weight,
      color: theme.colors.text_primary,
      textAlign: 'center',
    },
    unit: {
      fontSize: theme.typography.body_small.font_size,
      color: theme.colors.text_secondary,
      marginTop: -theme.spacing.xs,
    },
  });

  return (
    <View 
      style={[styles.container, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || `${label || 'Value'}: ${value} ${unit || ''}`}
    >
      {label && (
        <>
          <TextBase variant="body_medium" style={styles.label}>
            {label}
          </TextBase>
          <Spacer size="md" />
        </>
      )}
      
      <View style={styles.controls}>
        <Pressable 
          onPress={decrease}
          onPressIn={decreaseAnimation.handlePressIn}
          onPressOut={decreaseAnimation.handlePressOut}
          disabled={!can_decrease}
          testID={`${testID}-decrease`}
          accessible={true}
          accessibilityLabel="Decrease value"
          accessibilityRole="button"
          accessibilityState={{ disabled: !can_decrease }}
        >
          <Animated.View style={decreaseAnimation.animatedStyle}>
            <GlassBase
              variant="light"
              style={[
                styles.button,
                !can_decrease && styles.buttonDisabled,
              ]}
            >
              <Ionicons 
                name="remove" 
                size={config.icon_size} 
                color={theme.colors.text_primary}
              />
            </GlassBase>
          </Animated.View>
        </Pressable>
        
        <View style={styles.valueContainer}>
          <TextBase style={styles.value}>
            {animatedValue}
          </TextBase>
          {unit && (
            <TextBase variant="caption" style={styles.unit}>
              {unit}
            </TextBase>
          )}
        </View>
        
        <Pressable 
          onPress={increase}
          onPressIn={increaseAnimation.handlePressIn}
          onPressOut={increaseAnimation.handlePressOut}
          disabled={!can_increase}
          testID={`${testID}-increase`}
          accessible={true}
          accessibilityLabel="Increase value"
          accessibilityRole="button"
          accessibilityState={{ disabled: !can_increase }}
        >
          <Animated.View style={increaseAnimation.animatedStyle}>
            <GlassBase
              variant="light"
              style={[
                styles.button,
                !can_increase && styles.buttonDisabled,
              ]}
            >
              <Ionicons 
                name="add" 
                size={config.icon_size} 
                color={theme.colors.text_primary}
              />
            </GlassBase>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};

/**
 * Quick Select Row Component
 * Displays common values for quick selection
 * Often used with NumberStepper
 */
interface QuickSelectRowProps extends BaseComponentProps {
  values: number[];
  selected_value?: number;
  on_select: (value: number) => void;
  label?: string;
  variant?: 'pills' | 'buttons';
  style?: ViewStyle;
}

export const QuickSelectRow: React.FC<QuickSelectRowProps> = ({
  values,
  selected_value,
  on_select,
  label,
  variant = 'pills',
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const { getItemStyle, AnimatedView } = useStaggerAnimation({
    itemCount: values.length,
    staggerDelay: 30,
    type: 'scale',
    duration: theme.animation.durations.fast,
  });
  
  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.sm,
    },
    label: {
      color: theme.colors.text_secondary,
      marginBottom: theme.spacing.xs,
    },
    row: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    button: {
      minWidth: theme.sizes.touchTargets.medium,
      height: theme.sizes.touchTargets.small,
      paddingHorizontal: theme.spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: variant === 'pills' ? theme.borders.radii.full : theme.borders.radii.md,
    },
    buttonSelected: {
      backgroundColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.text_primary,
    },
    textSelected: {
      color: theme.colors.background,
    },
  });

  return (
    <View 
      style={[styles.container, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {label && (
        <TextBase variant="body_small" style={styles.label}>
          {label}
        </TextBase>
      )}
      <View style={styles.row}>
        {values.map((value, index) => {
          const is_selected = value === selected_value;
          
          return (
            <AnimatedView key={value} style={getItemStyle(index)}>
              <PressableGlass
                variant={is_selected ? 'medium' : 'light'}
                onPress={() => on_select(value)}
                press_scale={0.95}
                glass_style={[
                  styles.button,
                  is_selected && styles.buttonSelected,
                ]}
                testID={`${testID}-value-${value}`}
                accessible={true}
                accessibilityLabel={`Select ${value}`}
                accessibilityRole="button"
                accessibilityState={{ selected: is_selected }}
              >
                <TextBase 
                  variant="body_medium" 
                  style={[
                    styles.text,
                    is_selected && styles.textSelected,
                  ]}
                >
                  {value}
                </TextBase>
              </PressableGlass>
            </AnimatedView>
          );
        })}
      </View>
    </View>
  );
};

// Export both components
export default NumberStepper;
