// src/components/auth/AuthBackground.tsx
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Canvas, Rect, LinearGradient as SkiaGradient, vec, Circle, Group } from '@shopify/react-native-skia';
import { useTheme } from '@/theme/hooks/useTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AuthBackgroundProps {
  variant?: 'splash' | 'default';
  animated?: boolean;
  children: React.ReactNode;
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({
  variant = 'default',
  animated = true,
  children,
}) => {
  const theme = useTheme();
  
  // Animation values
  const orb1X = useSharedValue(0);
  const orb1Y = useSharedValue(0);
  const orb2X = useSharedValue(0);
  const orb2Y = useSharedValue(0);
  const orb3X = useSharedValue(0);
  const orb3Y = useSharedValue(0);
  const gridOpacity = useSharedValue(0);
  const particleProgress = useSharedValue(0);
  
  useEffect(() => {
    if (!animated) return;
    
    // Grid fade in
    gridOpacity.value = withTiming(0.03, {
      duration: 2000,
      easing: Easing.out(Easing.cubic),
    });
    
    // Orb 1 - Top left, purple
    orb1X.value = withRepeat(
      withSequence(
        withTiming(50, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-50, { duration: 8000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    orb1Y.value = withRepeat(
      withSequence(
        withTiming(30, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-30, { duration: 6000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Orb 2 - Bottom right, blue
    orb2X.value = withRepeat(
      withSequence(
        withTiming(-40, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
        withTiming(40, { duration: 7000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    orb2Y.value = withRepeat(
      withSequence(
        withTiming(-50, { duration: 9000, easing: Easing.inOut(Easing.ease) }),
        withTiming(50, { duration: 9000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Orb 3 - Center, orange accent
    orb3X.value = withRepeat(
      withTiming(360, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    
    // Particle animation
    particleProgress.value = withRepeat(
      withTiming(1, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [animated]);
  
  // Animated styles
  const orb1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb1X.value },
      { translateY: orb1Y.value },
    ],
  }));
  
  const orb2Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb2X.value },
      { translateY: orb2Y.value },
    ],
  }));
  
  const orb3Style = useAnimatedStyle(() => {
    const angle = orb3X.value * (Math.PI / 180);
    return {
      transform: [
        { translateX: Math.cos(angle) * 100 },
        { translateY: Math.sin(angle) * 100 },
      ],
    };
  });
  
  const gridStyle = useAnimatedStyle(() => ({
    opacity: gridOpacity.value,
  }));
  
  // Particle styles
  const createParticleStyle = (index: number, total: number) => {
    return useAnimatedStyle(() => {
      const progress = (particleProgress.value + index / total) % 1;
      const y = interpolate(progress, [0, 1], [SCREEN_HEIGHT, -50]);
      const x = (SCREEN_WIDTH / total) * index + Math.sin(progress * Math.PI * 2) * 20;
      const opacity = interpolate(
        progress,
        [0, 0.1, 0.9, 1],
        [0, 0.6, 0.6, 0],
        Extrapolate.CLAMP
      );
      
      return {
        transform: [
          { translateX: x },
          { translateY: y },
        ],
        opacity,
      };
    });
  };
  
  return (
    <View style={styles.container}>
      {/* Base gradient */}
      <LinearGradient
        colors={theme.isDark
          ? ['#0A0A14', '#14141F', '#1A1A2E', '#0F0F1E']
          : ['#FAFBFF', '#F0F2FF', '#E8EBFF', '#F5F7FF']
        }
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Skia Canvas for advanced effects */}
      <Canvas style={StyleSheet.absoluteFillObject}>
        <Group>
          {/* Gradient mesh background */}
          <Rect x={0} y={0} width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
            <SkiaGradient
              start={vec(0, 0)}
              end={vec(SCREEN_WIDTH, SCREEN_HEIGHT)}
              colors={theme.isDark
                ? ['rgba(99, 102, 241, 0.05)', 'rgba(139, 92, 246, 0.05)']
                : ['rgba(99, 102, 241, 0.02)', 'rgba(139, 92, 246, 0.02)']
              }
            />
          </Rect>
        </Group>
      </Canvas>
      
      {/* Animated grid */}
      <Animated.View style={[styles.gridContainer, gridStyle]} pointerEvents="none">
        {[...Array(20)].map((_, i) => (
          <View key={`h-${i}`} style={[styles.gridLine, styles.gridLineHorizontal, { top: `${i * 5}%` }]} />
        ))}
        {[...Array(20)].map((_, i) => (
          <View key={`v-${i}`} style={[styles.gridLine, styles.gridLineVertical, { left: `${i * 5}%` }]} />
        ))}
      </Animated.View>
      
      {/* Animated gradient orbs */}
      <View style={styles.orbContainer} pointerEvents="none">
        {/* Purple orb - top left */}
        <Animated.View style={[styles.orb, styles.orb1, orb1Style]}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.4)', 'rgba(139, 92, 246, 0)']}
            style={styles.orbGradient}
          />
        </Animated.View>
        
        {/* Blue orb - bottom right */}
        <Animated.View style={[styles.orb, styles.orb2, orb2Style]}>
          <LinearGradient
            colors={['rgba(99, 102, 241, 0.4)', 'rgba(99, 102, 241, 0)']}
            style={styles.orbGradient}
          />
        </Animated.View>
        
        {/* Orange accent orb - center */}
        <Animated.View style={[styles.orb, styles.orb3, orb3Style]}>
          <LinearGradient
            colors={['rgba(249, 115, 22, 0.3)', 'rgba(249, 115, 22, 0)']}
            style={styles.orbGradient}
          />
        </Animated.View>
      </View>
      
      {/* Floating particles */}
      {animated && variant === 'default' && (
        <View style={styles.particleContainer} pointerEvents="none">
          {[...Array(8)].map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                {
                  backgroundColor: i % 3 === 0 
                    ? theme.colors.primary 
                    : i % 3 === 1 
                    ? theme.colors.secondary 
                    : '#F97316',
                },
                createParticleStyle(i, 8),
              ]}
            />
          ))}
        </View>
      )}
      
      {/* Content */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  gridLineHorizontal: {
    left: 0,
    right: 0,
    height: 1,
  },
  gridLineVertical: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  orbContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  orb: {
    position: 'absolute',
  },
  orb1: {
    top: -100,
    left: -100,
    width: 300,
    height: 300,
  },
  orb2: {
    bottom: -150,
    right: -100,
    width: 400,
    height: 400,
  },
  orb3: {
    top: '40%',
    left: '30%',
    width: 250,
    height: 250,
  },
  orbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    opacity: 0.6,
  },
});
