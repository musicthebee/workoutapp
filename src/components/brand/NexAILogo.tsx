// src/components/brand/NexAILogo.tsx
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
  withSpring,
  interpolate,
  Extrapolate,
  withSequence,
  withDelay,
  Easing,
  cancelAnimation,
  interpolateColor,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme/hooks/useTheme';

interface NexAILogoProps {
  size?: number;
  animated?: boolean;
  variant?: 'splash' | 'default' | 'minimal';
  showGlow?: boolean;
  onAnimationComplete?: () => void;
}

export const NexAILogo: React.FC<NexAILogoProps> = ({
  size = 120,
  animated = true,
  variant = 'default',
  showGlow = true,
  onAnimationComplete,
}) => {
  const theme = useTheme();
  const actualSize = size ?? Dimensions.get('window').width * 0.3;
  
  // Animation values
  const rotation = useSharedValue(0);
  const scale = useSharedValue(variant === 'splash' ? 0 : 1);
  const opacity = useSharedValue(variant === 'splash' ? 0 : 1);
  const pulseScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const hexagonRotation = useSharedValue(0);
  const particleProgress = useSharedValue(0);
  const letterSpacing = useSharedValue(variant === 'splash' ? 50 : 0);
  const aiGlow = useSharedValue(0);
  
  useEffect(() => {
    if (!animated) return;
    
    // Initial animations for splash variant
    if (variant === 'splash') {
      scale.value = withDelay(200,
        withSpring(1, {
          damping: 12,
          stiffness: 100,
          mass: 1,
        })
      );
      
      opacity.value = withDelay(200,
        withTiming(1, {
          duration: 800,
          easing: Easing.out(Easing.cubic),
        })
      );
      
      letterSpacing.value = withDelay(600,
        withSpring(0, {
          damping: 15,
          stiffness: 80,
        })
      );
    }
    
    // Continuous rotation
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    
    // Hexagon rotation
    hexagonRotation.value = withRepeat(
      withSequence(
        withTiming(60, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1500, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.in(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Glow animation
    if (showGlow) {
      glowOpacity.value = withDelay(variant === 'splash' ? 1000 : 0,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }),
            withTiming(0.3, { duration: 2000, easing: Easing.in(Easing.ease) })
          ),
          -1,
          true
        )
      );
    }
    
    // AI glow animation
    aiGlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.in(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Particle animation
    particleProgress.value = withRepeat(
      withTiming(1, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    
    // Call completion callback
    if (onAnimationComplete && variant === 'splash') {
      setTimeout(onAnimationComplete, 1500);
    }
    
    // Cleanup
    return () => {
      cancelAnimation(rotation);
      cancelAnimation(scale);
      cancelAnimation(opacity);
      cancelAnimation(pulseScale);
      cancelAnimation(glowOpacity);
      cancelAnimation(hexagonRotation);
      cancelAnimation(particleProgress);
      cancelAnimation(letterSpacing);
      cancelAnimation(aiGlow);
    };
  }, [animated, variant, showGlow]);
  
  // Container animation
  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
  
  // Outer ring animation
  const outerRingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  
  // Hexagon animation
  const hexagonStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${hexagonRotation.value}deg` },
      { scale: pulseScale.value },
    ],
  }));
  
  // Glow animation
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: interpolate(glowOpacity.value, [0.3, 1], [1, 1.2]) }],
  }));
  
  // Letter animations
  const letterNStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -letterSpacing.value }],
  }));
  
  const letterAStyle = useAnimatedStyle(() => ({
    opacity: aiGlow.value,
  }));
  
  const letterIStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: letterSpacing.value }],
  }));
  
  // Particle styles
  const createParticleStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const progress = (particleProgress.value + index * 0.2) % 1;
      const angle = (index / 4) * Math.PI * 2;
      const radius = interpolate(progress, [0, 1], [30, actualSize * 0.6]);
      
      return {
        transform: [
          { translateX: Math.cos(angle) * radius },
          { translateY: Math.sin(angle) * radius },
        ],
        opacity: interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
      };
    });
  };
  
  return (
    <Animated.View style={[styles.container, { width: actualSize, height: actualSize }, containerStyle]}>
      {/* Glow effect */}
      {showGlow && (
        <Animated.View style={[styles.glowContainer, glowStyle]}>
          <LinearGradient
            colors={['rgba(99, 102, 241, 0.3)', 'rgba(139, 92, 246, 0.2)', 'rgba(249, 115, 22, 0.1)', 'transparent']}
            style={styles.glow}
          />
        </Animated.View>
      )}
      
      {/* Outer rotating ring */}
      <Animated.View style={[styles.outerRing, outerRingStyle]}>
        <View style={[styles.ring, { borderColor: theme.colors.glass_border }]}>
          {Array.from({ length: 12 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.ringDot,
                {
                  backgroundColor: i % 3 === 0 ? theme.colors.primary : theme.colors.glass_border,
                  transform: [
                    { rotate: `${i * 30}deg` },
                    { translateY: -actualSize * 0.45 },
                  ],
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>
      
      {/* Hexagon container */}
      <Animated.View style={[styles.hexagonContainer, hexagonStyle]}>
        <View style={styles.hexagon}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hexagonGradient}
          />
          
          {/* Center content - NexAI text */}
          <View style={styles.textContainer}>
            <Animated.Text style={[styles.letterN, letterNStyle]}>N</Animated.Text>
            <View style={styles.aiContainer}>
              <Animated.View style={letterAStyle}>
                <LinearGradient
                  colors={[theme.colors.secondary, theme.colors.primary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.aiGradient}
                >
                  <Animated.Text style={styles.letterA}>A</Animated.Text>
                </LinearGradient>
              </Animated.View>
              <Animated.Text style={[styles.letterI, letterIStyle]}>I</Animated.Text>
            </View>
          </View>
        </View>
      </Animated.View>
      
      {/* Floating particles */}
      {variant === 'splash' && animated && (
        <View style={styles.particleContainer}>
          {[0, 1, 2, 3].map((i) => (
            <Animated.View
              key={i}
              style={[styles.particle, createParticleStyle(i)]}
            />
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: '150%',
    height: '150%',
    borderRadius: 999,
  },
  outerRing: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    width: '90%',
    height: '90%',
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  hexagonContainer: {
    width: '60%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hexagon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hexagonGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    transform: [{ rotate: '45deg' }],
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    zIndex: 1,
  },
  letterN: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginRight: -2,
  },
  aiContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  aiGradient: {
    paddingHorizontal: 2,
  },
  letterA: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  letterI: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: -2,
  },
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(99, 102, 241, 0.8)',
  },
});
