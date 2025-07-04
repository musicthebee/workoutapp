// src/hooks/ui/animations.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Platform, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks';

/**
 * Press Animation Hook
 * Provides scale and opacity animations for pressable elements
 */
interface PressAnimationOptions {
  scale?: number;
  opacity?: number;
  duration?: number;
}

export const usePressAnimation = (options: PressAnimationOptions = {}) => {
  const theme = useTheme();
  const {
    scale = 0.96,
    opacity = 0.8,
    duration = theme.animation.durations.fast.duration,
  } = options;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: scale,
        useNativeDriver: true,
        ...theme.animation.springs.responsive,
      }),
      Animated.timing(opacityValue, {
        toValue: opacity,
        duration: duration / 2,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, opacity, duration, scaleValue, opacityValue, theme]);

  const handlePressOut = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        ...theme.animation.springs.responsive,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: duration / 2,
        useNativeDriver: true,
      }),
    ]).start();
  }, [duration, scaleValue, opacityValue, theme]);

  const animatedStyle: Animated.AnimatedProps<ViewStyle> = {
    transform: [{ scale: scaleValue }],
    opacity: opacityValue,
  };

  return {
    handlePressIn,
    handlePressOut,
    animatedStyle,
    AnimatedView: Animated.View,
  };
};

/**
 * Entrance Animation Hook
 * Provides fade, scale, and slide entrance animations
 */
interface EntranceAnimationOptions {
  type?: 'fade' | 'scale' | 'slideUp' | 'slideIn' | 'combined';
  delay?: number;
  duration?: number;
  from?: {
    opacity?: number;
    scale?: number;
    translateY?: number;
    translateX?: number;
  };
}

export const useEntranceAnimation = (options: EntranceAnimationOptions = {}) => {
  const theme = useTheme();
  const {
    type = 'fade',
    delay = 0,
    duration = theme.animation.durations.normal,
    from = {},
  } = options;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const isReducedMotion = useRef(false);

  useEffect(() => {
    // Check accessibility settings
    AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      isReducedMotion.current = enabled;
    });

    // Start animation
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: isReducedMotion.current ? 0 : typeof duration === 'number' ? duration : 300,
      delay: isReducedMotion.current ? 0 : delay,
      useNativeDriver: true,
    }).start();
  }, []);

  // Define animation styles based on type
  const getAnimatedStyle = (): Animated.AnimatedProps<ViewStyle> => {
    switch (type) {
      case 'fade':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [from.opacity ?? 0, 1],
          }),
        };

      case 'scale':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [from.opacity ?? 0, 1],
          }),
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [from.scale ?? 0.9, 1],
              }),
            },
          ],
        };

      case 'slideUp':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [from.opacity ?? 0, 1],
          }),
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [from.translateY ?? 50, 0],
              }),
            },
          ],
        };

      case 'slideIn':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [from.opacity ?? 0, 1],
          }),
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [from.translateX ?? 50, 0],
              }),
            },
          ],
        };

      case 'combined':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [from.opacity ?? 0, 1],
          }),
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [from.scale ?? 0.8, 1.05, 1],
              }),
            },
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [from.translateY ?? 20, 0],
              }),
            },
          ],
        };

      default:
        return {};
    }
  };

  return {
    animatedStyle: getAnimatedStyle(),
    AnimatedView: Animated.View,
  };
};

/**
 * Stagger Animation Hook
 * For animating lists of items with staggered delays
 */
interface StaggerAnimationOptions {
  itemCount: number;
  staggerDelay?: number;
  maxDelay?: number;
  type?: 'fade' | 'slideIn' | 'scale';
  duration?: number;
}

export const useStaggerAnimation = (options: StaggerAnimationOptions) => {
  const theme = useTheme();
  const {
    itemCount,
    staggerDelay = 50,
    maxDelay = 300,
    type = 'fade',
    duration = theme.animation.durations.normal,
  } = options;

  const animatedValues = useRef(
    Array.from({ length: itemCount }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((value, index) => {
      const delay = Math.min(index * staggerDelay, maxDelay);

      return Animated.timing(value, {
        toValue: 1,
        duration: typeof duration === 'number' ? duration : 300,
        delay,
        useNativeDriver: true,
      });
    });

    Animated.parallel(animations).start();
  }, [itemCount]);

  const getItemStyle = (index: number): Animated.AnimatedProps<ViewStyle> => {
    if (index >= animatedValues.length) {
      return {};
    }

    const animatedValue = animatedValues[index];

    switch (type) {
      case 'fade':
        return {
          opacity: animatedValue,
        };

      case 'slideIn':
        return {
          opacity: animatedValue,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        };

      case 'scale':
        return {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        };

      default:
        return {};
    }
  };

  return {
    getItemStyle,
    AnimatedView: Animated.View,
  };
};

/**
 * Transition Animation Hook
 * For animating between states
 */
interface TransitionAnimationOptions {
  duration?: number;
  type?: 'fade' | 'crossFade' | 'slide';
}

export const useTransitionAnimation = (state: any, options: TransitionAnimationOptions = {}) => {
  const theme = useTheme();
  const { duration = theme.animation.durations.normal.duration, type = 'fade' } = options;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const previousState = useRef(state);

  useEffect(() => {
    if (state !== previousState.current) {
      // Animate out then in
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ]).start();

      previousState.current = state;
    } else {
      // Initial state
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [state]);

  const getAnimatedStyle = (): Animated.AnimatedProps<ViewStyle> => {
    switch (type) {
      case 'fade':
        return {
          opacity: animatedValue,
        };

      case 'crossFade':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.2, 1],
          }),
        };

      case 'slide':
        return {
          opacity: animatedValue,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        };

      default:
        return {};
    }
  };

  return {
    animatedStyle: getAnimatedStyle(),
    AnimatedView: Animated.View,
  };
};

/**
 * Value Change Animation Hook
 * For animating numeric value changes
 */
export const useValueChangeAnimation = (value: number, duration: number = 300) => {
  const animatedValue = useRef(new Animated.Value(value)).current;
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.round(value));
    });

    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: Platform.OS === 'ios', // Android has issues with native driver for listeners
    }).start();

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [value]);

  return displayValue;
};

/**
 * Shake Animation Hook
 * For error states or attention-getting
 */
export const useShakeAnimation = () => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shakeStyle = {
    transform: [{ translateX: shakeAnimation }],
  };

  return {
    shake,
    shakeStyle,
    AnimatedView: Animated.View,
  };
};
