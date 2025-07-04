// src/components/brand/NexAILogo.tsx
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  G,
  Path,
  Polygon,
  Stop,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme/hooks/useTheme';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

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
  const textOpacity = useSharedValue(variant === 'splash' ? 0 : 1);
  const textScale = useSharedValue(variant === 'splash' ? 0.8 : 1);
  const particleProgress = useSharedValue(0);

  useEffect(() => {
    if (!animated) {
      textOpacity.value = 1;
      textScale.value = 1;
      return;
    }

    // Initial animations for splash variant
    if (variant === 'splash') {
      scale.value = withDelay(
        200,
        withSpring(1, {
          damping: 12,
          stiffness: 100,
          mass: 1,
        }),
      );

      opacity.value = withDelay(
        200,
        withTiming(1, {
          duration: 800,
          easing: Easing.out(Easing.cubic),
        }),
      );

      textOpacity.value = withDelay(
        800,
        withTiming(1, {
          duration: 1000,
          easing: Easing.out(Easing.cubic),
        }),
      );

      textScale.value = withDelay(
        800,
        withSpring(1, {
          damping: 15,
          stiffness: 100,
        }),
      );
    }

    // 3D rotation animations
    rotationY.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 3000 }),
        withTiming(180, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(180, { duration: 500 }),
        withTiming(360, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    rotationX.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-15, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    rotationZ.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    // Pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.in(Easing.ease) }),
      ),
      -1,
      true,
    );

    // Glow animation
    if (showGlow) {
      glowOpacity.value = withDelay(
        variant === 'splash' ? 1000 : 0,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }),
            withTiming(0.3, { duration: 2000, easing: Easing.in(Easing.ease) }),
          ),
          -1,
          true,
        ),
      );
    }

    // Particle animation
    particleProgress.value = withRepeat(
      withTiming(1, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    if (onAnimationComplete && variant === 'splash') {
      setTimeout(onAnimationComplete, 1500);
    }

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
    };
  }, [animated, variant, showGlow]);

  // Calculate 3D transformation for hexagon faces
  const transform3D = useDerivedValue(() => {
    const rx = (rotationX.value * Math.PI) / 180;
    const ry = (rotationY.value * Math.PI) / 180;
    const rz = (rotationZ.value * Math.PI) / 180;

    // Calculate which faces are visible based on rotation
    const normalizedY = ((rotationY.value % 360) + 360) % 360;
    const isFrontFacing = normalizedY <= 90 || normalizedY >= 270;
    const isBackFacing = normalizedY > 90 && normalizedY < 270;

    return {
      rx,
      ry,
      rz,
      isFrontFacing,
      isBackFacing,
      normalizedY,
    };
  });

  // Container animation
  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value * pulseScale.value }],
  }));

  // Glow animation
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: interpolate(glowOpacity.value, [0.3, 1], [1, 1.2]) }],
  }));

  // SVG rotation style
  const svgRotationStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateX: `${rotationX.value}deg` },
      { rotateY: `${rotationY.value}deg` },
      { rotateZ: `${rotationZ.value}deg` },
    ],
  }));

  // Calculate hexagon points
  const calculateHexagonPoints = (
    centerX: number,
    centerY: number,
    radius: number,
    depth: number = 0,
  ) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle) + depth;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const hexSize = actualSize * 0.4;
  const center = actualSize / 2;
  const depth = 10; // 3D depth offset

  // Front face style
  const frontFaceStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      transform3D.value.normalizedY,
      [0, 90, 270, 360],
      [1, 0, 0, 1],
      Extrapolate.CLAMP,
    );
    return { opacity };
  });

  // Back face style
  const backFaceStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      transform3D.value.normalizedY,
      [0, 90, 270, 360],
      [0, 1, 1, 0],
      Extrapolate.CLAMP,
    );
    return { opacity };
  });

  // Side faces animated props for more compelling animations
  const createSideFaceProps = (faceIndex: number) => {
    return useAnimatedProps(() => {
      const baseOpacity = 0.7;
      const rotY = transform3D.value.normalizedY;

      // Calculate visibility based on rotation and face position
      let opacity = baseOpacity;

      // Adjust opacity based on which face should be visible
      if (faceIndex === 0 || faceIndex === 1) {
        // Top faces
        opacity = interpolate(rotY, [0, 90, 180, 270, 360], [0.7, 0.9, 0.5, 0.2, 0.7]);
      } else if (faceIndex === 2 || faceIndex === 3) {
        // Side faces
        opacity = interpolate(rotY, [0, 90, 180, 270, 360], [0.3, 0.7, 0.9, 0.7, 0.3]);
      } else {
        // Bottom faces
        opacity = interpolate(rotY, [0, 90, 180, 270, 360], [0.2, 0.5, 0.7, 0.9, 0.2]);
      }

      // Add subtle animation to strokeWidth for depth effect
      const strokeWidth = interpolate(opacity, [0.2, 0.9], [0.5, 1.5]);

      return {
        opacity,
        strokeWidth,
      };
    });
  };

  // Text style - keep visible on front, hide on back
  const textStyle = useAnimatedStyle(() => {
    const opacity =
      interpolate(
        transform3D.value.normalizedY,
        [0, 90, 270, 360],
        [1, 0, 0, 1],
        Extrapolate.CLAMP,
      ) * textOpacity.value;

    return {
      opacity,
      transform: [{ scale: textScale.value }],
    };
  });

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

  // Create side face paths for 3D effect
  const createSideFacePath = (startIndex: number) => {
    const angle1 = (Math.PI / 3) * startIndex - Math.PI / 2;
    const angle2 = (Math.PI / 3) * ((startIndex + 1) % 6) - Math.PI / 2;

    const x1 = center + hexSize * Math.cos(angle1);
    const y1 = center + hexSize * Math.sin(angle1);
    const x2 = center + hexSize * Math.cos(angle2);
    const y2 = center + hexSize * Math.sin(angle2);

    return `
      M ${x1} ${y1}
      L ${x2} ${y2}
      L ${x2} ${y2 + depth}
      L ${x1} ${y1 + depth}
      Z
    `;
  };

  return (
    <Animated.View
      style={[styles.container, { width: actualSize, height: actualSize }, containerStyle]}
    >
      {/* Glow effect - not rotated */}
      {showGlow && (
        <Animated.View style={[styles.glowContainer, glowStyle]}>
          <LinearGradient
            colors={[
              'rgba(99, 102, 241, 0.4)',
              'rgba(139, 92, 246, 0.3)',
              'rgba(249, 115, 22, 0.2)',
              'transparent',
            ]}
            style={styles.glow}
          />
        </Animated.View>
      )}

      <Animated.View style={[StyleSheet.absoluteFillObject, svgRotationStyle]}>
        <Svg width={actualSize} height={actualSize} style={StyleSheet.absoluteFillObject}>
          <Defs>
            {/* Gradient definitions */}
            <SvgLinearGradient id="frontGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity="1" />
              <Stop offset="100%" stopColor={theme.colors.secondary} stopOpacity="1" />
            </SvgLinearGradient>

            <SvgLinearGradient id="backGradient" x1="100%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={theme.colors.secondary} stopOpacity="0.9" />
              <Stop offset="100%" stopColor={theme.colors.primary} stopOpacity="0.9" />
            </SvgLinearGradient>

            <SvgLinearGradient id="sideGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={theme.colors.secondary} stopOpacity="0.6" />
            </SvgLinearGradient>

            <SvgLinearGradient id="sideGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={theme.colors.secondary} stopOpacity="0.7" />
              <Stop offset="100%" stopColor={theme.colors.primary} stopOpacity="0.5" />
            </SvgLinearGradient>

            <SvgLinearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <Stop offset="100%" stopColor="#E0E0E0" stopOpacity="1" />
            </SvgLinearGradient>
          </Defs>

          {/* Back face (drawn first, behind everything) */}
          <AnimatedG
            animatedProps={useAnimatedProps(
              () => ({ opacity: backFaceStyle.opacity }),
              [backFaceStyle],
            )}
          >
            <AnimatedPolygon
              points={calculateHexagonPoints(center, center + depth, hexSize)}
              fill="url(#backGradient)"
              strokeWidth="2"
              stroke={theme.colors.glass_border}
            />
          </AnimatedG>

          {/* Side faces for 3D effect */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <AnimatedPath
              key={`side-${i}`}
              d={createSideFacePath(i)}
              fill={i % 2 === 0 ? 'url(#sideGradient1)' : 'url(#sideGradient2)'}
              animatedProps={createSideFaceProps(i)}
              strokeWidth="1"
              stroke={theme.colors.glass_border}
              opacity={0.8}
            />
          ))}

          {/* Front face */}
          <AnimatedG
            animatedProps={useAnimatedProps(
              () => ({ opacity: frontFaceStyle.opacity }),
              [frontFaceStyle],
            )}
          >
            <AnimatedPolygon
              points={calculateHexagonPoints(center, center, hexSize)}
              fill="url(#frontGradient)"
              strokeWidth="3"
              stroke={theme.colors.primary}
            />
          </AnimatedG>

          {/* Text - only on front face */}
          <AnimatedG
            animatedProps={useAnimatedProps(() => ({ opacity: textStyle.opacity }), [textStyle])}
          >
            <AnimatedSvgText
              x={center}
              y={center - actualSize * 0.05}
              fontSize={actualSize * 0.35}
              fontWeight="900"
              fill="url(#textGradient)"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              N
            </AnimatedSvgText>

            <AnimatedSvgText
              x={center}
              y={center + actualSize * 0.18}
              fontSize={actualSize * 0.12}
              fontWeight="700"
              fill="url(#textGradient)"
              textAnchor="middle"
              alignmentBaseline="middle"
              letterSpacing="2"
            >
              AI
            </AnimatedSvgText>
          </AnimatedG>

          {/* Orbital rings */}
          {animated && (
            <AnimatedG animatedProps={useAnimatedProps(() => ({ opacity: 0.3 * opacity.value }))}>
              <AnimatedCircle
                cx={center}
                cy={center}
                r={actualSize * 0.45}
                fill="none"
                stroke={theme.colors.glass_border}
                strokeWidth="1"
                strokeDasharray="5 10"
                animatedProps={useAnimatedProps(() => ({
                  strokeDashoffset: interpolate(particleProgress.value, [0, 1], [0, -15]),
                }))}
              />
            </AnimatedG>
          )}
        </Svg>
      </Animated.View>

      {/* Floating particles - not rotated */}
      {variant === 'splash' && animated && (
        <View style={styles.particleContainer}>
          {[0, 1, 2, 3].map(i => (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                { backgroundColor: i % 2 === 0 ? theme.colors.primary : theme.colors.secondary },
                createParticleStyle(i),
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    borderRadius: 999,
    height: '150%',
    width: '150%',
  },
  glowContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    borderRadius: 3,
    height: 6,
    position: 'absolute',
    width: 6,
  },
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
