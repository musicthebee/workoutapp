// src/components/atoms/glass/GradientOrb.tsx
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme/hooks/useTheme';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export interface GradientOrbProps {
  size?: number;
  colors?: string[];
  position?: { x: number; y: number };
  animationType?: 'float' | 'pulse' | 'rotate' | 'none';
  duration?: number;
  delay?: number;
}

export const GradientOrb: React.FC<GradientOrbProps> = ({
  size = 300,
  colors,
  position = { x: 0, y: 0 },
  animationType = 'float',
  duration = 6000,
  delay = 0,
}) => {
  const theme = useTheme();
  const isDark = theme.isDark;
  
  // Default colors based on theme
  const defaultColors = isDark
    ? ['rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 0.1)', 'transparent']
    : ['rgba(99, 102, 241, 0.2)', 'rgba(99, 102, 241, 0.05)', 'transparent'];
  
  const orbColors = colors || defaultColors;
  
  // Animation values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0.8);
  
  useEffect(() => {
    // Start animations based on type
    if (animationType === 'float') {
      translateX.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(20, { duration: duration / 2 }),
            withTiming(-20, { duration: duration / 2 })
          ),
          -1,
          true
        )
      );
      
      translateY.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(-30, { duration: duration / 2 }),
            withTiming(30, { duration: duration / 2 })
          ),
          -1,
          true
        )
      );
      
      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1.1, { duration: duration / 2 }),
            withTiming(1, { duration: duration / 2 })
          ),
          -1,
          true
        )
      );
    } else if (animationType === 'pulse') {
      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1.2, { duration: duration / 2 }),
            withTiming(0.8, { duration: duration / 2 })
          ),
          -1,
          true
        )
      );
      
      opacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: duration / 2 }),
            withTiming(0.5, { duration: duration / 2 })
          ),
          -1,
          true
        )
      );
    } else if (animationType === 'rotate') {
      rotation.value = withDelay(
        delay,
        withRepeat(
          withTiming(360, { duration }),
          -1,
          false
        )
      );
    }
  }, [animationType, duration, delay, translateX, translateY, scale, rotation, opacity]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));
  
  return (
    <AnimatedLinearGradient
      colors={orbColors}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.orb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left: position.x,
          top: position.y,
        },
        animatedStyle,
      ]}
      pointerEvents="none"
    />
  );
};

// Background container with multiple orbs
export interface GradientBackgroundProps {
  children: React.ReactNode;
  orbs?: Array<{
    size?: number;
    colors?: string[];
    position?: { x: number; y: number };
    animationType?: 'float' | 'pulse' | 'rotate' | 'none';
    duration?: number;
    delay?: number;
  }>;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  orbs = [
    { position: { x: -100, y: -100 }, animationType: 'float' },
    { position: { x: 200, y: 100 }, animationType: 'pulse', colors: ['rgba(249, 115, 22, 0.3)', 'rgba(249, 115, 22, 0.1)', 'transparent'] },
    { position: { x: -50, y: 400 }, animationType: 'rotate', colors: ['rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.1)', 'transparent'] },
  ],
}) => {
  const theme = useTheme();
  
  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View style={styles.orbContainer} pointerEvents="none">
        {orbs.map((orb, index) => (
          <GradientOrb key={index} {...orb} />
        ))}
      </Animated.View>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  orbContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
  },
});
