// src/components/atoms/glass/PressableGlass.tsx
import React from 'react';
import { Pressable, Animated, ViewStyle, PressableProps } from 'react-native';

import { GlassBase, type GlassBaseProps } from './GlassBase';
import { usePressAnimation } from '@/hooks/ui/animations';

interface PressableGlassProps extends Omit<GlassBaseProps, 'style'>, Omit<PressableProps, 'style' | 'children'> {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  glass_style?: ViewStyle | ViewStyle[];
  press_scale?: number;
  press_opacity?: number;
  disable_press_animation?: boolean;
}

/**
 * Pressable Glass Component
 * Combines GlassBase with press animations
 * Reduces redundancy of wrapping GlassBase in Animated.View + Pressable
 */
export const PressableGlass: React.FC<PressableGlassProps> = ({
  // Glass props
  variant = 'light',
  glow = false,
  shimmer = false,
  glass_style,
  
  // Pressable props
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  disabled,
  hitSlop,
  
  // Animation props
  press_scale,
  press_opacity,
  disable_press_animation = false,
  
  // Common props
  children,
  style,
  testID,
  accessible,
  accessibilityLabel,
  accessibilityRole = 'button',
  accessibilityState,
  
  // Rest of pressable props
  ...pressableProps
}) => {
  const pressAnimation = usePressAnimation({
    scale: press_scale,
    opacity: press_opacity,
  });

  if (!onPress && !onLongPress) {
    // Not pressable, just return GlassBase
    return (
      <GlassBase
        variant={variant}
        glow={glow}
        shimmer={shimmer}
        style={[style, glass_style]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </GlassBase>
    );
  }

  const handlePressIn = (event: any) => {
    if (!disable_press_animation) {
      pressAnimation.handlePressIn();
    }
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    if (!disable_press_animation) {
      pressAnimation.handlePressOut();
    }
    onPressOut?.(event);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={onLongPress}
      disabled={disabled}
      hitSlop={hitSlop}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ ...accessibilityState, disabled: disabled || false }}
      style={style}
      {...pressableProps}
    >
      <Animated.View style={disable_press_animation ? undefined : pressAnimation.animatedStyle}>
        <GlassBase
          variant={variant}
          glow={glow}
          shimmer={shimmer}
          style={glass_style}
        >
          {children}
        </GlassBase>
      </Animated.View>
    </Pressable>
  );
};

export default PressableGlass;
