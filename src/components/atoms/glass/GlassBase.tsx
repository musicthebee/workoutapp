import React, { useEffect } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Canvas,
  Blur,
  BackdropFilter,
  Fill,
  LinearGradient,
  Box,
  BoxShadow,
  vec,
  Paint,
  ColorMatrix,
  Turbulence,
  DisplacementMap,
  Skia,
} from '@shopify/react-native-skia';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps } from '@/types';

/**
 * Glass Base Props
 */
export interface GlassBaseProps extends BaseComponentProps {
  variant: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  shimmer?: boolean;
  gradient?: boolean;
  noise?: boolean;
}

/**
 * Glass Base Component
 * Premium glassmorphism with rich visual effects
 */
export const GlassBase: React.FC<GlassBaseProps> = ({
  variant,
  children,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
  shimmer = false,
  gradient = true,
  noise = false,
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const glassConfig = theme.glass[variant];
  const skiaConfig = theme.skiaBlur[variant];
  
  // Animation for shimmer effect
  const shimmerProgress = useSharedValue(0);
  
  useEffect(() => {
    if (shimmer) {
      shimmerProgress.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        ),
        -1,
        false
      );
    }
  }, [shimmer, shimmerProgress]);
  
  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: shimmer ? 0.3 + shimmerProgress.value * 0.2 : 1,
  }));
  
  // Flatten style to get dimensions
  const flatStyle = StyleSheet.flatten([
    {
      borderRadius: theme.borders.radii.md,
      overflow: 'hidden',
    },
    style,
  ]);
  
  const borderRadius = (flatStyle.borderRadius as number) || theme.borders.radii.md;
  
  // Enhanced color matrix based on color scheme
  const colorMatrix = colorScheme === 'dark' ? [
    0.9, 0, 0, 0, 0,
    0, 0.9, 0, 0, 0,
    0, 0, 1.1, 0, 0,
    0, 0, 0, 1, 0,
  ] : [
    1.1, 0, 0, 0, 0,
    0, 1.1, 0, 0, 0,
    0, 0, 1.2, 0, 0,
    0, 0, 0, 1, 0,
  ];
  
  // Create paint for shadow effects
  const shadowPaint = Skia.Paint();
  shadowPaint.setColorFilter(
    Skia.ColorFilter.MakeBlend(
      Skia.Color(theme.isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.2)'),
      5 // BlendMode.Multiply
    )
  );
  
  return (
    <View
      style={[
        styles.container,
        flatStyle,
        {
          // Add shadow for depth
          shadowColor: theme.isDark ? '#000' : '#000',
          shadowOffset: {
            width: 0,
            height: variant === 'heavy' ? 8 : variant === 'medium' ? 4 : 2,
          },
          shadowOpacity: variant === 'heavy' ? 0.3 : variant === 'medium' ? 0.2 : 0.1,
          shadowRadius: variant === 'heavy' ? 16 : variant === 'medium' ? 8 : 4,
          elevation: variant === 'heavy' ? 12 : variant === 'medium' ? 6 : 3,
        }
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {/* Backdrop blur layer with effects */}
      <View style={StyleSheet.absoluteFillObject}>
        <Canvas style={StyleSheet.absoluteFillObject}>
          <BackdropFilter
            filter={
              <Blur blur={skiaConfig.blur} />
            }
          >
            <Fill />
            <ColorMatrix matrix={colorMatrix} />
          </BackdropFilter>
          
          {/* Noise texture for glass texture */}
          {noise && (
            <>
              <Turbulence 
                freqX={0.01} 
                freqY={0.01} 
                octaves={2} 
                seed={5}
              />
              <DisplacementMap channelX="g" channelY="a" scale={2}>
                <Turbulence 
                  freqX={0.01} 
                  freqY={0.01} 
                  octaves={2} 
                  seed={5}
                />
              </DisplacementMap>
            </>
          )}
          
          {/* Inner shadow using Box and BoxShadow */}
          <Box
            box={Skia.RRectXY(
              Skia.XYWHRect(0, 0, 300, 300), // Will be clipped by container
              borderRadius,
              borderRadius
            )}
          >
            <BoxShadow
              dx={0}
              dy={-2}
              blur={4}
              color={theme.isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)'}
              inner
            />
            <BoxShadow
              dx={0}
              dy={2}
              blur={4}
              color={theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
              inner
            />
            <Paint paint={shadowPaint} />
          </Box>
        </Canvas>
      </View>
      
      {/* Gradient overlay for depth */}
      {gradient && (
        <View style={StyleSheet.absoluteFillObject}>
          <Canvas style={StyleSheet.absoluteFillObject}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, 100)}
              colors={
                theme.isDark
                  ? ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']
                  : ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)']
              }
            />
          </Canvas>
        </View>
      )}
      
      {/* Tint layer */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: theme.isDark 
              ? `rgba(0, 0, 0, ${glassConfig.tint_opacity * 0.8})`
              : `rgba(255, 255, 255, ${glassConfig.tint_opacity})`,
          },
        ]}
      />
      
      {/* Shimmer effect */}
      {shimmer && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            shimmerStyle,
            {
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.3)',
            },
          ]}
          pointerEvents="none"
        />
      )}
      
      {/* Border with glow effect */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius,
            borderWidth: theme.borders.widths.thin,
            borderColor: theme.isDark
              ? `rgba(255, 255, 255, ${glassConfig.border_opacity * 1.5})`
              : `rgba(255, 255, 255, ${glassConfig.border_opacity * 2})`,
          },
        ]}
        pointerEvents="none"
      />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
