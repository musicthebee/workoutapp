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
  withSequence,
  withDelay,
  Easing,
  cancelAnimation,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Polygon,
  G,
  Text as SvgText,
  Circle,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme/hooks/useTheme';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedG = Animated.createAnimatedComponent(G);

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
  
  // 3D rotation values
  const rotationX = useSharedValue(0);
  const rotationY = useSharedValue(0);
  const rotationZ = useSharedValue(0);
  
  // Animation values
  const scale = useSharedValue(variant === 'splash' ? 0 : 1);
  const opacity = useSharedValue(variant === 'splash' ? 0 : 1);
  const pulseScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(variant === 'splash' ? 0 : 1); // Show text immediately for static
  const textScale = useSharedValue(variant === 'splash' ? 0.8 : 1);
  const particleProgress = useSharedValue(0);
  
  // Hexagon face animations for 3D effect
  const face1Opacity = useSharedValue(1);
  const face2Opacity = useSharedValue(0.8);
  const face3Opacity = useSharedValue(0.6);
  
  useEffect(() => {
    if (!animated) {
      // For static version, ensure text is visible
      textOpacity.value = 1;
      textScale.value = 1;
      return;
    }
    
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
      
      // Text animations for splash
      textOpacity.value = withDelay(800,
        withTiming(1, {
          duration: 1000,
          easing: Easing.out(Easing.cubic),
        })
      );
      
      textScale.value = withDelay(800,
        withSpring(1, {
          damping: 15,
          stiffness: 100,
        })
      );
    }
    
    // 3D rotation animations - spend more time facing forward
    rotationY.value = withRepeat(
      withSequence(
        // Face forward for 3 seconds
        withTiming(0, { duration: 3000 }),
        // Rotate to back in 1 second
        withTiming(180, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        // Stay at back for 0.5 seconds
        withTiming(180, { duration: 500 }),
        // Rotate back to front in 1 second
        withTiming(360, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false
    );
    
    // Subtle X rotation
    rotationX.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-10, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Very subtle Z rotation
    rotationZ.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Face opacity animations for 3D depth
    face1Opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0.7, { duration: 2000 })
      ),
      -1,
      true
    );
    
    face2Opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000 }),
        withTiming(0.9, { duration: 2000 })
      ),
      -1,
      true
    );
    
    face3Opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 2000 }),
        withTiming(0.7, { duration: 2000 })
      ),
      -1,
      true
    );
    
    // Pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.in(Easing.ease) })
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
      cancelAnimation(rotationX);
      cancelAnimation(rotationY);
      cancelAnimation(rotationZ);
      cancelAnimation(scale);
      cancelAnimation(opacity);
      cancelAnimation(pulseScale);
      cancelAnimation(glowOpacity);
      cancelAnimation(textOpacity);
      cancelAnimation(textScale);
      cancelAnimation(particleProgress);
      cancelAnimation(face1Opacity);
      cancelAnimation(face2Opacity);
      cancelAnimation(face3Opacity);
    };
  }, [animated, variant, showGlow]);
  
  // Calculate if logo is facing backward (to hide text when rotated)
  const isBackFacing = useDerivedValue(() => {
    const normalizedRotation = rotationY.value % 360;
    return normalizedRotation > 90 && normalizedRotation < 270;
  });
  
  // Container animation
  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value * pulseScale.value },
      { perspective: 800 },
      { rotateX: `${rotationX.value}deg` },
      { rotateY: `${rotationY.value}deg` },
      { rotateZ: `${rotationZ.value}deg` },
    ],
  }));
  
  // Glow animation
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: interpolate(glowOpacity.value, [0.3, 1], [1, 1.2]) }],
  }));
  
  // Text container animation - hide when back facing
  const textContainerStyle = useAnimatedStyle(() => ({
    opacity: isBackFacing.value ? 0 : textOpacity.value,
    transform: [{ scale: textScale.value }],
  }));
  
  // Particle styles
  const createParticleStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const progress = (particleProgress.value + index * 0.25) % 1;
      const angle = (index / 4) * Math.PI * 2;
      const radius = interpolate(progress, [0, 1], [actualSize * 0.3, actualSize * 0.7]);
      
      return {
        transform: [
          { translateX: Math.cos(angle) * radius },
          { translateY: Math.sin(angle) * radius },
        ],
        opacity: interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
      };
    });
  };
  
  // Calculate hexagon points
  const hexagonPoints = (sizeMultiplier: number = 1) => {
    const points = [];
    const hexSize = actualSize * 0.4 * sizeMultiplier;
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = actualSize / 2 + hexSize * Math.cos(angle);
      const y = actualSize / 2 + hexSize * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };
  
  return (
    <Animated.View style={[styles.container, { width: actualSize, height: actualSize }, containerStyle]}>
      {/* Glow effect */}
      {showGlow && (
        <Animated.View style={[styles.glowContainer, glowStyle]}>
          <LinearGradient
            colors={['rgba(99, 102, 241, 0.4)', 'rgba(139, 92, 246, 0.3)', 'rgba(249, 115, 22, 0.2)', 'transparent']}
            style={styles.glow}
          />
        </Animated.View>
      )}
      
      <Svg width={actualSize} height={actualSize} style={StyleSheet.absoluteFillObject}>
        <Defs>
          {/* Gradient definitions */}
          <SvgLinearGradient id="hexGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity="1" />
            <Stop offset="100%" stopColor={theme.colors.secondary} stopOpacity="1" />
          </SvgLinearGradient>
          
          <SvgLinearGradient id="hexGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={theme.colors.secondary} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={theme.colors.primary} stopOpacity="0.8" />
          </SvgLinearGradient>
          
          <SvgLinearGradient id="hexGradient3" x1="50%" y1="0%" x2="50%" y2="100%">
            <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={theme.colors.secondary} stopOpacity="0.6" />
          </SvgLinearGradient>
          
          <SvgLinearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <Stop offset="100%" stopColor="#E0E0E0" stopOpacity="1" />
          </SvgLinearGradient>
        </Defs>
        
        {/* 3D Hexagon layers */}
        <AnimatedG>
          {/* Back face */}
          <AnimatedPolygon
            points={hexagonPoints(0.95)}
            fill="url(#hexGradient3)"
            opacity={face3Opacity.value}
            strokeWidth="2"
            stroke={theme.colors.glass_border}
          />
          
          {/* Middle face */}
          <AnimatedPolygon
            points={hexagonPoints(0.97)}
            fill="url(#hexGradient2)"
            opacity={face2Opacity.value}
            strokeWidth="2"
            stroke={theme.colors.glass_border}
          />
          
          {/* Front face */}
          <AnimatedPolygon
            points={hexagonPoints(1)}
            fill="url(#hexGradient1)"
            opacity={face1Opacity.value}
            strokeWidth="3"
            stroke={theme.colors.primary}
          />
        </AnimatedG>
        
        {/* Text container - Always visible for static, hidden when back-facing for animated */}
        <G style={animated ? textContainerStyle : undefined} opacity={animated ? undefined : 1}>
          {/* Large N */}
          <SvgText
            x={actualSize / 2}
            y={actualSize / 2 - actualSize * 0.05}
            fontSize={actualSize * 0.35}
            fontWeight="900"
            fill="url(#textGradient)"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            N
          </SvgText>
          
          {/* Small AI */}
          <SvgText
            x={actualSize / 2}
            y={actualSize / 2 + actualSize * 0.18}
            fontSize={actualSize * 0.12}
            fontWeight="700"
            fill="url(#textGradient)"
            textAnchor="middle"
            alignmentBaseline="middle"
            letterSpacing="2"
          >
            AI
          </SvgText>
        </G>
        
        {/* Orbital rings */}
        {animated && (
          <AnimatedG opacity={0.3}>
            <Circle
              cx={actualSize / 2}
              cy={actualSize / 2}
              r={actualSize * 0.45}
              fill="none"
              stroke={theme.colors.glass_border}
              strokeWidth="1"
              strokeDasharray="5 10"
            />
          </AnimatedG>
        )}
      </Svg>
      
      {/* Floating particles */}
      {variant === 'splash' && animated && (
        <View style={styles.particleContainer}>
          {[0, 1, 2, 3].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                { backgroundColor: i % 2 === 0 ? theme.colors.primary : theme.colors.secondary },
                createParticleStyle(i)
              ]}
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
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
