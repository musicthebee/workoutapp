workoutapp/
├── android
│   ├── build.gradle
│   ├── gradle.properties
│   └── settings.gradle
├── src
│   ├── components
│   │   ├── atoms
│   │   │   ├── base
│   │   │   │   ├── ButtonBase.tsx
│   │   │   │   └── index.ts
│   │   │   ├── feedback
│   │   │   │   ├── AnimatedValue.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── ProgressBase.tsx
│   │   │   ├── glass
│   │   │   │   ├── GlassBase.tsx
│   │   │   │   ├── GlassBaseFallback.tsx
│   │   │   │   └── index.ts
│   │   │   ├── input
│   │   │   │   ├── index.ts
│   │   │   │   └── InputBase.tsx
│   │   │   ├── layout
│   │   │   │   ├── Flex.tsx
│   │   │   │   ├── Grid.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── Spacer.tsx
│   │   │   ├── typography
│   │   │   │   ├── index.ts
│   │   │   │   └── TextBase.tsx
│   │   │   └── index.ts
│   │   ├── molecules
│   │   │   ├── button
│   │   │   │   └── index.ts
│   │   │   ├── display
│   │   │   │   └── index.ts
│   │   │   ├── input
│   │   │   │   └── index.ts
│   │   │   ├── list
│   │   │   │   └── index.ts
│   │   │   ├── modal
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── organisms
│   │   │   ├── forms
│   │   │   │   └── index.ts
│   │   │   ├── lists
│   │   │   │   └── index.ts
│   │   │   ├── navigation
│   │   │   │   └── index.ts
│   │   │   ├── workout
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── templates
│   │   │   ├── base
│   │   │   │   └── index.ts
│   │   │   ├── detail
│   │   │   │   └── index.ts
│   │   │   ├── form
│   │   │   │   └── index.ts
│   │   │   ├── list
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── contexts
│   │   ├── ApolloProvider.tsx
│   │   ├── AuthContext.tsx
│   │   ├── index.ts
│   │   └── ThemeContext.tsx
│   ├── hooks
│   │   ├── data
│   │   │   └── index.ts
│   │   ├── ui
│   │   │   ├── index.ts
│   │   │   └── usePressAnimation.ts
│   │   ├── utility
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── navigation
│   │   ├── index.ts
│   │   └── RootNavigator.tsx
│   ├── screens
│   │   ├── AtomsShowcaseScreen.tsx
│   │   ├── DiagnosticScreen.tsx
│   │   ├── index.ts
│   │   └── WorkoutExampleScreen.tsx
│   ├── services
│   │   ├── api
│   │   │   └── index.ts
│   │   ├── graphql
│   │   │   ├── queries
│   │   │   │   ├── exercises.graphql
│   │   │   │   └── workouts.graphql
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── mockApi.ts
│   ├── store
│   │   ├── exercise
│   │   │   └── index.ts
│   │   ├── performance
│   │   │   └── index.ts
│   │   ├── workout
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── theme
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useTheme.ts
│   │   ├── tokens
│   │   │   ├── colors.ts
│   │   │   ├── effects.ts
│   │   │   ├── index.ts
│   │   │   ├── spacing.ts
│   │   │   └── typography.ts
│   │   └── index.ts
│   ├── types
│   │   ├── business
│   │   │   ├── activeWorkout.ts
│   │   │   ├── filters.ts
│   │   │   ├── index.ts
│   │   │   └── mutations.ts
│   │   ├── database
│   │   │   ├── index.ts
│   │   │   └── models.ts
│   │   ├── ui
│   │   │   ├── components.ts
│   │   │   ├── index.ts
│   │   │   ├── navigation.ts
│   │   │   └── validation.ts
│   │   ├── utils
│   │   │   ├── api.ts
│   │   │   ├── index.ts
│   │   │   └── ordering.ts
│   │   ├── common.ts
│   │   └── index.ts
│   ├── utils
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── formatters
│   │   │   └── index.ts
│   │   ├── helpers
│   │   │   └── index.ts
│   │   ├── validators
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
├── .eslintrc.js
├── .prettierrc.js
├── .watchmanconfig
├── app.json
├── App.tsx
├── babel.config.js
├── codegen.yml
├── index.js
├── metro.config.js
├── package.json
└── tsconfig.json

<file path="android/build.gradle">
buildscript {
    ext {
        buildToolsVersion = "35.0.0"
        minSdkVersion = 24
        compileSdkVersion = 35
        targetSdkVersion = 35
        ndkVersion = "27.1.12297006"
        kotlinVersion = "2.1.20"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
    }
}

apply plugin: "com.facebook.react.rootproject"

</file>
<file path="android/gradle.properties">
# Project-wide Gradle settings.

# IDE (e.g. Android Studio) users:
# Gradle settings configured through the IDE *will override*
# any settings specified in this file.

# For more details on how to configure your build environment visit
# http://www.gradle.org/docs/current/userguide/build_environment.html

# Specifies the JVM arguments used for the daemon process.
# The setting is particularly useful for tweaking memory settings.
# Default value: -Xmx512m -XX:MaxMetaspaceSize=256m
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m

# When configured, Gradle will run in incubating parallel mode.
# This option should only be used with decoupled projects. More details, visit
# http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:decoupled_projects
# org.gradle.parallel=true

# AndroidX package structure to make it clearer which packages are bundled with the
# Android operating system, and which are packaged with your app's APK
# https://developer.android.com/topic/libraries/support-library/androidx-rn
android.useAndroidX=true

# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64

# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
newArchEnabled=true

# Use this property to enable or disable the Hermes JS engine.
# If set to false, you will be using JSC instead.
hermesEnabled=true

</file>
<file path="android/settings.gradle">
pluginManagement { includeBuild("../node_modules/@react-native/gradle-plugin") }
plugins { id("com.facebook.react.settings") }
extensions.configure(com.facebook.react.ReactSettingsExtension){ ex -> ex.autolinkLibrariesFromCommand() }
rootProject.name = 'FitTrack'
include ':app'
includeBuild('../node_modules/@react-native/gradle-plugin')

</file>
<file path="src/components/atoms/base/ButtonBase.tsx">
import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { GlassBase } from '@/components/atoms/glass/GlassBase';
import { usePressAnimation } from '@/hooks/ui/usePressAnimation';
import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps, ButtonSize, ButtonVariant } from '@/types';

/**
 * Button Base Props
 */
export interface ButtonBaseProps extends BaseComponentProps {
  variant: ButtonVariant;
  size: ButtonSize;
  onPress: PressableProps['onPress'];
  onLongPress?: PressableProps['onLongPress'];
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * Button Base Component
 * Pure button component with glass effect and press animation
 */
export const ButtonBase: React.FC<ButtonBaseProps> = ({
  variant,
  size,
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  style,
  children,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useTheme();
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();
  
  // Map button variant to glass variant
  const glassVariant = variant === 'ghost' ? 'light' : 'medium';
  
  // Get size from theme
  const height = theme.sizes.buttons[size];
  const paddingHorizontal = theme.spacing[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'];
  
  // Determine if button is interactive
  const isDisabled = disabled || loading;
  
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={isDisabled ? undefined : onPressIn}
      onPressOut={isDisabled ? undefined : onPressOut}
      disabled={isDisabled}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      <Animated.View style={animatedStyle}>
        <GlassBase
          variant={glassVariant}
          style={[
            {
              height,
              paddingHorizontal,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isDisabled ? 0.5 : 1,
              borderRadius: theme.borders.radii.md,
            },
            style,
          ]}
        >
          {children}
        </GlassBase>
      </Animated.View>
    </Pressable>
  );
};

</file>
<file path="src/components/atoms/base/index.ts">
// src/components/atoms/base/index.ts
export { ButtonBase } from './ButtonBase';
export type { ButtonBaseProps } from './ButtonBase';

</file>
<file path="src/components/atoms/feedback/AnimatedValue.tsx">
import React, { useEffect } from 'react';
import { TextInput, StyleProp, TextStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps } from '@/types';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

/**
 * Animated Value Props
 */
export interface AnimatedValueProps extends BaseComponentProps {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  style?: StyleProp<TextStyle>;
}

/**
 * Animated Value Component
 * Pure animated number display
 */
export const AnimatedValue: React.FC<AnimatedValueProps> = ({
  value,
  format = (v) => Math.round(v).toString(),
  duration,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const animatedValue = useSharedValue(0);
  
  useEffect(() => {
    animatedValue.value = withTiming(
      value,
      { duration: duration || theme.animation.durations.normal }
    );
  }, [value, duration, animatedValue, theme]);
  
  // Create a worklet-compatible format function
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    // For now, just use basic string conversion in the worklet
    const roundedValue = Math.round(animatedValue.value);
    return {
      text: roundedValue.toString(),
      defaultValue: roundedValue.toString(),
    };
  });
  
  return (
    <AnimatedTextInput
      editable={false}
      style={[
        {
          color: theme.colors.text_primary,
          fontSize: theme.typography.heading_1.font_size,
          fontWeight: theme.typography.heading_1.font_weight,
        },
        style,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      animatedProps={animatedProps}
    />
  );
};

</file>
<file path="src/components/atoms/feedback/index.ts">
// src/components/atoms/feedback/index.ts
export { ProgressBase } from './ProgressBase';
export { AnimatedValue } from './AnimatedValue';
export type { ProgressBaseProps } from './ProgressBase';
export type { AnimatedValueProps } from './AnimatedValue';

</file>
<file path="src/components/atoms/feedback/ProgressBase.tsx">
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps, ProgressVariant, ProgressSize } from '@/types';

/**
 * Progress Base Props
 */
export interface ProgressBaseProps extends BaseComponentProps {
  progress: number; // 0-1
  variant: ProgressVariant;
  size: ProgressSize;
  style?: StyleProp<ViewStyle>;
}

/**
 * Progress Base Component
 * Pure progress indicator with animated fill
 */
export const ProgressBase: React.FC<ProgressBaseProps> = ({
  progress,
  variant,
  size,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  
  // Size mapping
  const sizeMap = {
    sm: { height: 4, width: 100 },
    md: { height: 8, width: 200 },
    lg: { height: 12, width: 300 },
  };
  
  const dimensions = sizeMap[size];
  
  // Clamp progress between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(
      dimensions.width * clampedProgress,
      theme.animation.springs.normal
    ),
  }));
  
  // For now, only linear variant
  if (variant === 'linear') {
    return (
      <View
        style={[
          {
            height: dimensions.height,
            width: dimensions.width,
            backgroundColor: theme.colors.glass_border,
            borderRadius: dimensions.height / 2,
            overflow: 'hidden',
          },
          style,
        ]}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="progressbar"
        accessibilityValue={{
          now: clampedProgress * 100,
          min: 0,
          max: 100,
        }}
      >
        <Animated.View
          style={[
            {
              height: '100%',
              backgroundColor: theme.colors.primary,
              borderRadius: dimensions.height / 2,
            },
            animatedStyle,
          ]}
        />
      </View>
    );
  }
  
  // TODO: Implement circular variant
  return null;
};

</file>
<file path="src/components/atoms/glass/GlassBase.tsx">
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

</file>
<file path="src/components/atoms/glass/GlassBaseFallback.tsx">
import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  Platform,
  StyleSheet,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps } from '@/types';

/**
 * Glass Base Fallback Props
 */
export interface GlassBaseFallbackProps extends BaseComponentProps {
  variant: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Glass Base Fallback Component
 * Original implementation using platform-specific approach
 * Use this if Skia has issues or for comparison
 */
export const GlassBaseFallback: React.FC<GlassBaseFallbackProps> = ({
  variant,
  children,
  style,
  testID,
  accessible = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const glassConfig = theme.glass[variant];
  
  // Platform-specific implementation
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        style={[
          styles.container,
          {
            borderRadius: theme.borders.radii.md,
            borderWidth: theme.borders.widths.hairline,
            borderColor: theme.colors.glass_border,
            overflow: 'hidden',
          },
          style,
        ]}
        blurType={theme.isDark ? 'dark' : 'light'}
        blurAmount={glassConfig.blur_amount}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
      >
        <View
          style={[
            styles.tintLayer,
            {
              backgroundColor: theme.isDark 
                ? theme.colors.glass_heavy
                : theme.colors.glass_light,
              opacity: glassConfig.tint_opacity,
            },
          ]}
        />
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    );
  }
  
  // Android fallback - enhanced translucency
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.isDark
            ? `rgba(0, 0, 0, ${0.7 * glassConfig.tint_opacity})`
            : `rgba(255, 255, 255, ${0.9 * glassConfig.tint_opacity})`,
          borderRadius: theme.borders.radii.md,
          borderWidth: theme.borders.widths.hairline,
          borderColor: theme.colors.glass_border,
          // Enhanced Android styling
          elevation: variant === 'heavy' ? 8 : variant === 'medium' ? 4 : 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: glassConfig.shadow_opacity,
          shadowRadius: 8,
        },
        style,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  tintLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

</file>
<file path="src/components/atoms/glass/index.ts">
export { GlassBase } from './GlassBase';
export { GlassBaseFallback } from './GlassBaseFallback';
export type { GlassBaseProps } from './GlassBase';
export type { GlassBaseFallbackProps } from './GlassBaseFallback';

// Feature flag for easy switching
export const USE_SKIA_GLASS = true;

</file>
<file path="src/components/atoms/input/index.ts">
// src/components/atoms/input/index.ts
export { InputBase } from './InputBase';
export type { InputBaseProps } from './InputBase';

</file>
<file path="src/components/atoms/input/InputBase.tsx">
import React, { forwardRef } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { GlassBase } from '@/components/atoms/glass/GlassBase';
import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps, InputSize, InputVariant } from '@/types';

/**
 * Input Base Props
 */
export interface InputBaseProps extends BaseComponentProps, Omit<TextInputProps, 'style'> {
  variant: InputVariant;
  size: InputSize;
  hasError?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * Input Base Component
 * Pure text input with glass effect
 */
export const InputBase = forwardRef<TextInput, InputBaseProps>(({
  variant,
  size,
  hasError = false,
  containerStyle,
  inputStyle,
  testID,
  accessible = true,
  accessibilityLabel,
  placeholderTextColor,
  ...textInputProps
}, ref) => {
  const theme = useTheme();
  
  // Get size from theme
  const height = theme.sizes.inputs[size];
  const paddingHorizontal = theme.spacing[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'];
  
  // Typography based on size
  const typography = theme.typography[size === 'sm' ? 'body_small' : size === 'md' ? 'body_medium' : 'body_large'];
  
  // Keyboard type based on variant
  const keyboardType = variant === 'numeric' ? 'numeric' : 'default';
  
  return (
    <GlassBase
      variant="light"
      style={[
        {
          height,
          paddingHorizontal,
          borderWidth: theme.borders.widths.thin,
          borderColor: hasError 
            ? theme.colors.error 
            : theme.colors.glass_border,
          borderRadius: theme.borders.radii.md,
        },
        containerStyle,
      ]}
      testID={`${testID}-container`}
    >
      <TextInput
        ref={ref}
        style={[
          {
            flex: 1,
            fontSize: typography.font_size,
            color: theme.colors.text_primary,
            padding: 0, // Remove default padding
          },
          inputStyle,
        ]}
        placeholderTextColor={
          placeholderTextColor || theme.colors.text_tertiary
        }
        keyboardType={keyboardType}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        {...textInputProps}
      />
    </GlassBase>
  );
});

InputBase.displayName = 'InputBase';

</file>
<file path="src/components/atoms/layout/Flex.tsx">
import React from 'react';
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/theme/hooks/useTheme';
import type { SpacingValue } from '@/types';

/**
 * Flex Props
 */
export interface FlexProps extends ViewProps {
  direction?: 'row' | 'column';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  wrap?: boolean;
  gap?: SpacingValue;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
} as const;

const alignMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

/**
 * Flex Component
 * Pure flexbox container with theme-based spacing
 */
export const Flex: React.FC<FlexProps> = ({
  direction = 'column',
  justify = 'start',
  align = 'stretch',
  wrap = false,
  gap,
  flex,
  style,
  children,
  ...viewProps
}) => {
  const theme = useTheme();
  const gapValue = gap ? theme.spacing[gap] : undefined;
  
  return (
    <View
      style={[
        {
          flexDirection: direction,
          justifyContent: justifyMap[justify],
          alignItems: alignMap[align],
          flexWrap: wrap ? 'wrap' : 'nowrap',
          gap: gapValue,
          flex,
        },
        style,
      ]}
      {...viewProps}
    >
      {children}
    </View>
  );
};

</file>
<file path="src/components/atoms/layout/Grid.tsx">
import React from 'react';
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/theme/hooks/useTheme';
import type { SpacingValue } from '@/types';

/**
 * Grid Props
 */
export interface GridProps extends ViewProps {
  columns: number;
  gap?: SpacingValue;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * Grid Component
 * Pure grid layout using flexbox with wrap
 */
export const Grid: React.FC<GridProps> = ({
  columns,
  gap,
  style,
  children,
  ...viewProps
}) => {
  const theme = useTheme();
  const gapValue = gap ? theme.spacing[gap] : 0;
  
  // Calculate item width accounting for gaps
  const itemWidth = `${(100 - (gapValue * (columns - 1))) / columns}%`;
  
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -gapValue / 2,
        },
        style,
      ]}
      {...viewProps}
    >
      {React.Children.map(children, (child, index) => (
        <View
          key={index}
          style={{
            width: itemWidth,
            paddingHorizontal: gapValue / 2,
            marginBottom: gapValue,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};

</file>
<file path="src/components/atoms/layout/index.ts">
// src/components/atoms/layout/index.ts
export { Spacer } from './Spacer';
export { Flex } from './Flex';
export { Grid } from './Grid';
export type { SpacerProps } from './Spacer';
export type { FlexProps } from './Flex';
export type { GridProps } from './Grid';

</file>
<file path="src/components/atoms/layout/Spacer.tsx">
import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme/hooks/useTheme';
import type { SpacingValue } from '@/types';

/**
 * Spacer Props
 */
export interface SpacerProps {
  size: SpacingValue;
  horizontal?: boolean;
}

/**
 * Spacer Component
 * Pure spacing component using theme values
 */
export const Spacer: React.FC<SpacerProps> = ({ 
  size, 
  horizontal = false 
}) => {
  const theme = useTheme();
  const spacing = theme.spacing[size];
  
  return (
    <View
      style={{
        width: horizontal ? spacing : undefined,
        height: horizontal ? undefined : spacing,
      }}
    />
  );
};

</file>
<file path="src/components/atoms/typography/index.ts">
// src/components/atoms/typography/index.ts
export { TextBase } from './TextBase';
export type { TextBaseProps } from './TextBase';


</file>
<file path="src/components/atoms/typography/TextBase.tsx">
import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

import { useTheme } from '@/theme/hooks/useTheme';
import type { BaseComponentProps, TextVariant, TextColor } from '@/types';

/**
 * Text Base Props
 */
export interface TextBaseProps extends BaseComponentProps, Omit<TextProps, 'style'> {
  variant: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

/**
 * Text Base Component
 * Pure text component that applies theme typography
 */
export const TextBase: React.FC<TextBaseProps> = ({
  variant,
  color = 'primary',
  align = 'left',
  style,
  children,
  testID,
  accessible = true,
  accessibilityLabel,
  ...restProps
}) => {
  const theme = useTheme();
  const typography = theme.typography[variant];
  
  // Map color to theme color
  const textColor = {
    primary: theme.colors.text_primary,
    secondary: theme.colors.text_secondary,
    tertiary: theme.colors.text_tertiary,
    inverse: theme.colors.text_inverse,
    error: theme.colors.error,
    success: theme.colors.success,
    warning: theme.colors.warning,
    info: theme.colors.info,
  }[color];
  
  return (
    <Text
      style={[
        {
          fontSize: typography.font_size,
          lineHeight: typography.font_size * typography.line_height,
          fontWeight: typography.font_weight,
          letterSpacing: typography.letter_spacing,
          color: textColor,
          textAlign: align,
        },
        style,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      {...restProps}
    >
      {children}
    </Text>
  );
};

</file>
<file path="src/components/atoms/index.ts">
// src/components/atoms/index.ts
// Main atoms export file
export * from './glass';
export * from './base';
export * from './typography';
export * from './input';
export * from './layout';
export * from './feedback';

</file>
<file path="src/components/molecules/button/index.ts">

</file>
<file path="src/components/molecules/display/index.ts">

</file>
<file path="src/components/molecules/input/index.ts">

</file>
<file path="src/components/molecules/list/index.ts">

</file>
<file path="src/components/molecules/modal/index.ts">

</file>
<file path="src/components/molecules/index.ts">

</file>
<file path="src/components/organisms/forms/index.ts">

</file>
<file path="src/components/organisms/lists/index.ts">

</file>
<file path="src/components/organisms/navigation/index.ts">

</file>
<file path="src/components/organisms/workout/index.ts">

</file>
<file path="src/components/organisms/index.ts">

</file>
<file path="src/components/templates/base/index.ts">

</file>
<file path="src/components/templates/detail/index.ts">

</file>
<file path="src/components/templates/form/index.ts">

</file>
<file path="src/components/templates/list/index.ts">

</file>
<file path="src/components/templates/index.ts">

</file>
<file path="src/components/index.ts">

</file>
<file path="src/contexts/ApolloProvider.tsx">
import React, { ReactNode } from 'react';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client';

import { apolloClient } from '@/services/graphql/client';

/**
 * Apollo Provider Props
 */
interface ApolloProviderProps {
  children: ReactNode;
}

/**
 * Apollo Provider Component
 * Wraps the app with Apollo Client for GraphQL
 */
export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return (
    <BaseApolloProvider client={apolloClient}>
      {children}
    </BaseApolloProvider>
  );
};

</file>
<file path="src/contexts/AuthContext.tsx">
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Mock Auth Context
 * Matches Firebase Auth interface for easy migration later
 */

// User interface matching Firebase Auth
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

// Auth error interface
export interface AuthError {
  code: string;
  message: string;
}

// Auth context value
interface AuthContextValue {
  // State
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  
  // Auth methods (matching Firebase)
  signInWithEmailAndPassword: (email: string, password: string) => Promise<User>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  updateProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<void>;
  
  // Helper methods
  clearError: () => void;
}

// Storage keys
const AUTH_STORAGE_KEY = '@workout_tracker/auth';
const MOCK_DELAY = 800; // Simulate network delay

// Mock user database
const mockUsers: Record<string, { password: string; user: User }> = {
  'test@example.com': {
    password: 'password123',
    user: {
      uid: 'user_123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
      emailVerified: true,
    },
  },
};

// Helper to simulate async operations
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Create context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  // Load persisted auth state
  useEffect(() => {
    loadPersistedAuth();
  }, []);

  const loadPersistedAuth = async (): Promise<void> => {
    try {
      const authData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (authData) {
        const parsed = JSON.parse(authData) as User;
        setUser(parsed);
      }
    } catch (err) {
      console.error('Failed to load auth state:', err);
    } finally {
      setLoading(false);
    }
  };

  const persistAuth = async (userData: User | null): Promise<void> => {
    try {
      if (userData) {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Failed to persist auth state:', err);
    }
  };

  // Sign in with email and password
  const signInWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    setError(null);
    
    try {
      await delay(MOCK_DELAY);
      
      // Validate input
      if (!email || !password) {
        throw { code: 'auth/invalid-input', message: 'Email and password required' };
      }
      
      // Check mock database
      const mockUser = mockUsers[email.toLowerCase()];
      if (!mockUser) {
        throw { code: 'auth/user-not-found', message: 'User not found' };
      }
      
      if (mockUser.password !== password) {
        throw { code: 'auth/wrong-password', message: 'Invalid password' };
      }
      
      // Success
      const userData = { ...mockUser.user };
      setUser(userData);
      await persistAuth(userData);
      return userData;
      
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Create new user account
  const createUserWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    setError(null);
    
    try {
      await delay(MOCK_DELAY);
      
      // Validate input
      if (!email || !password) {
        throw { code: 'auth/invalid-input', message: 'Email and password required' };
      }
      
      if (password.length < 6) {
        throw { code: 'auth/weak-password', message: 'Password should be at least 6 characters' };
      }
      
      // Check if user exists
      if (mockUsers[email.toLowerCase()]) {
        throw { code: 'auth/email-already-in-use', message: 'Email already in use' };
      }
      
      // Create new user
      const newUser: User = {
        uid: `user_${Date.now()}`,
        email,
        displayName: null,
        photoURL: null,
        emailVerified: false,
      };
      
      // Add to mock database
      mockUsers[email.toLowerCase()] = {
        password,
        user: newUser,
      };
      
      // Set current user
      setUser(newUser);
      await persistAuth(newUser);
      return newUser;
      
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    setLoading(true);
    
    try {
      await delay(MOCK_DELAY / 2);
      setUser(null);
      await persistAuth(null);
      setError(null);
    } catch (err) {
      const authError = { code: 'auth/sign-out-error', message: 'Failed to sign out' };
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Send password reset email
  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await delay(MOCK_DELAY);
      
      if (!email) {
        throw { code: 'auth/invalid-email', message: 'Email required' };
      }
      
      // In mock, just check if user exists
      if (!mockUsers[email.toLowerCase()]) {
        throw { code: 'auth/user-not-found', message: 'User not found' };
      }
      
      // Mock success
      console.log(`[MOCK] Password reset email sent to ${email}`);
      
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates: { displayName?: string; photoURL?: string }): Promise<void> => {
    if (!user) {
      throw { code: 'auth/no-user', message: 'No user signed in' };
    }
    
    setLoading(true);
    
    try {
      await delay(MOCK_DELAY / 2);
      
      const updatedUser = {
        ...user,
        ...updates,
      };
      
      // Update mock database
      const userEmail = user.email?.toLowerCase();
      if (userEmail && mockUsers[userEmail]) {
        mockUsers[userEmail]!.user = updatedUser;
      }
      
      setUser(updatedUser);
      await persistAuth(updatedUser);
      
    } catch (err) {
      const authError = { code: 'auth/update-profile-error', message: 'Failed to update profile' };
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = (): void => {
    setError(null);
  };

  const value: AuthContextValue = {
    user,
    loading,
    error,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use auth context
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * Mock auth helpers for development
 */
export const mockAuth = {
  // Quick sign in for development
  signInAsTestUser: async (): Promise<User> => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('Must be used within AuthProvider');
    }
    return context.signInWithEmailAndPassword('test@example.com', 'password123');
  },
  
  // Add more mock users
  addMockUser: (email: string, password: string, displayName: string): void => {
    mockUsers[email.toLowerCase()] = {
      password,
      user: {
        uid: `user_${Date.now()}`,
        email,
        displayName,
        photoURL: null,
        emailVerified: true,
      },
    };
  },
  
  // Get current mock users (dev only)
  getMockUsers: (): string[] => {
    return Object.keys(mockUsers);
  },
};

</file>
<file path="src/contexts/index.ts">

</file>
<file path="src/contexts/ThemeContext.tsx">
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createTheme, type Theme } from '@/theme';

/**
 * Theme context value interface
 */
interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * Theme context
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme persistence key
 */
const THEME_STORAGE_KEY = '@workout_tracker/theme_preference';

/**
 * Theme provider props
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component
 * Manages theme state and persistence
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(systemColorScheme);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async (): Promise<void> => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setColorScheme(savedTheme);
        } else {
          // Use system preference if no saved preference
          setColorScheme(systemColorScheme);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
        setColorScheme(systemColorScheme);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, [systemColorScheme]);

  // Toggle theme
  const toggleTheme = async (): Promise<void> => {
    const newScheme: ColorSchemeName = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
    
    // Save preference
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newScheme || 'light');
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Create theme object
  const isDark = colorScheme === 'dark';
  const theme = createTheme(isDark);

  const value: ThemeContextValue = {
    theme,
    isDark,
    toggleTheme,
  };

  // Don't render until theme is loaded to prevent flash
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

</file>
<file path="src/hooks/data/index.ts">

</file>
<file path="src/hooks/ui/index.ts">
// src/hooks/ui/index.ts
export { usePressAnimation } from './usePressAnimation';

</file>
<file path="src/hooks/ui/usePressAnimation.ts">
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useTheme } from '@/theme/hooks/useTheme';

/**
 * Press Animation Hook
 * Provides consistent press animations for interactive components
 */
export const usePressAnimation = () => {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
  
  const onPressIn = (): void => {
    scale.value = withSpring(0.95, theme.animation.springs.fast);
    opacity.value = withSpring(0.8, theme.animation.springs.fast);
  };
  
  const onPressOut = (): void => {
    scale.value = withSpring(1, theme.animation.springs.normal);
    opacity.value = withSpring(1, theme.animation.springs.normal);
  };
  
  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
};

</file>
<file path="src/hooks/utility/index.ts">

</file>
<file path="src/hooks/index.ts">
// src/hooks/index.ts
// Main hooks export file
export * from './ui';
// export * from './data'; // Uncomment when data hooks are created
// export * from './utility'; // Uncomment when utility hooks are created

// Re-export theme hook for convenience
export { useTheme, useThemeControls, useThemeToken, useThemeValue } from '@/theme/hooks/useTheme';
</file>
<file path="src/navigation/index.ts">

</file>
<file path="src/navigation/RootNavigator.tsx">
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/theme/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import type { RootStackParamList, TabParamList } from '@/types';

import { View, Text } from 'react-native';

// Import the showcase screens
import { AtomsShowcaseScreen, WorkoutExampleScreen, DiagnosticScreen } from '@/screens';

// Placeholder screens - to be implemented
const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text_primary }}>{title}</Text>
    </View>
  );
};

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

/**
 * Tab Navigator
 */
const TabNavigator: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home';
          
          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'ExercisesTab':
              iconName = focused ? 'barbell' : 'barbell-outline';
              break;
            case 'WorkoutsTab':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'HistoryTab':
              iconName = focused ? 'time' : 'time-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text_tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: theme.borders.widths.hairline,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={AtomsShowcaseScreen}
        options={{ title: 'Components' }}
      />
      <Tab.Screen 
        name="ExercisesTab" 
        component={WorkoutExampleScreen}
        options={{ title: 'Example' }}
      />
      <Tab.Screen 
        name="WorkoutsTab" 
        component={() => <PlaceholderScreen title="Workouts" />}
        options={{ title: 'Workouts' }}
      />
      <Tab.Screen 
        name="HistoryTab" 
        component={() => <PlaceholderScreen title="History" />}
        options={{ title: 'History' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={DiagnosticScreen}
        options={{ title: 'Diagnostic' }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root Navigator
 */
export const RootNavigator: React.FC = () => {
  const theme = useTheme();
  const { user, loading, signInWithEmailAndPassword } = useAuth();
  
  // Auto-login for development
  React.useEffect(() => {
    if (!loading && !user) {
      // Automatically sign in with test user for development
      signInWithEmailAndPassword('test@example.com', 'password123')
        .catch(err => console.error('Auto-login failed:', err));
    }
  }, [loading, user, signInWithEmailAndPassword]);
  
  // Show loading screen while checking auth
  if (loading) {
    return <PlaceholderScreen title="Loading..." />;
  }
  
  // Show auth screen if not logged in (this should not happen with auto-login)
  if (!user) {
    return <PlaceholderScreen title="Logging in..." />;
  }
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: theme.borders.widths.hairline,
        },
        headerTintColor: theme.colors.text_primary,
        headerTitleStyle: {
          ...theme.typography.heading_4,
        },
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="Tabs" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      
      {/* Detail Screens */}
      <Stack.Screen 
        name="ExerciseDetail" 
        component={() => <PlaceholderScreen title="Exercise Detail" />}
        options={{ title: 'Exercise' }}
      />
      <Stack.Screen 
        name="WorkoutDetail" 
        component={() => <PlaceholderScreen title="Workout Detail" />}
        options={{ title: 'Workout' }}
      />
      <Stack.Screen 
        name="WorkoutBuilder" 
        component={() => <PlaceholderScreen title="Workout Builder" />}
        options={{ title: 'Build Workout' }}
      />
      <Stack.Screen 
        name="ActiveWorkout" 
        component={() => <PlaceholderScreen title="Active Workout" />}
        options={{ headerShown: false }}
      />
      
      {/* Modal Screens */}
      <Stack.Screen 
        name="ExerciseEditModal" 
        component={() => <PlaceholderScreen title="Edit Exercise" />}
        options={{ 
          presentation: 'modal',
          title: 'Edit Exercise',
        }}
      />
      <Stack.Screen 
        name="SetLoggerModal" 
        component={() => <PlaceholderScreen title="Log Set" />}
        options={{ 
          presentation: 'modal',
          title: 'Log Set',
        }}
      />
      <Stack.Screen 
        name="RestTimerModal" 
        component={() => <PlaceholderScreen title="Rest Timer" />}
        options={{ 
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="ExercisePickerModal" 
        component={() => <PlaceholderScreen title="Pick Exercise" />}
        options={{ 
          presentation: 'modal',
          title: 'Add Exercise',
        }}
      />
    </Stack.Navigator>
  );
};

</file>
<file path="src/screens/AtomsShowcaseScreen.tsx">
import React, { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  GlassBase,
  ButtonBase,
  TextBase,
  InputBase,
  Spacer,
  Flex,
  Grid,
  ProgressBase,
  AnimatedValue,
} from '@/components/atoms';
import { useTheme } from '@/hooks';

/**
 * Atoms Showcase Screen
 * Displays all atom components for testing and verification
 */
export const AtomsShowcaseScreen: React.FC = () => {
  const theme = useTheme();
  
  // State for interactive components
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('123');
  const [inputValue3, setInputValue3] = useState('');
  const [progress, setProgress] = useState(0.3);
  const [animatedNumber, setAnimatedNumber] = useState(0);
  
  // Handler for button presses
  const handlePress = (label: string) => {
    Alert.alert('Button Pressed', `You pressed: ${label}`);
  };
  
  // Update progress
  const updateProgress = () => {
    setProgress(prev => prev >= 1 ? 0 : prev + 0.1);
  };
  
  // Update animated number
  const updateNumber = () => {
    setAnimatedNumber(prev => prev + Math.floor(Math.random() * 100));
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TextBase variant="heading_1" align="center">
          Atoms Showcase
        </TextBase>
        <Spacer size="md" />
        <TextBase variant="body_medium" color="secondary" align="center">
          All base components in one place
        </TextBase>
        <Spacer size="xl" />
        
        {/* Typography Section */}
        <GlassBase variant="light" style={{ padding: theme.spacing.lg }}>
          <TextBase variant="heading_3">Typography</TextBase>
          <Spacer size="md" />
          
          <TextBase variant="heading_1">Heading 1</TextBase>
          <Spacer size="xs" />
          <TextBase variant="heading_2">Heading 2</TextBase>
          <Spacer size="xs" />
          <TextBase variant="heading_3">Heading 3</TextBase>
          <Spacer size="xs" />
          <TextBase variant="heading_4">Heading 4</TextBase>
          <Spacer size="md" />
          
          <TextBase variant="body_large">Body Large Text</TextBase>
          <Spacer size="xs" />
          <TextBase variant="body_medium">Body Medium Text</TextBase>
          <Spacer size="xs" />
          <TextBase variant="body_small">Body Small Text</TextBase>
          <Spacer size="xs" />
          <TextBase variant="caption">Caption Text</TextBase>
          <Spacer size="md" />
          
          <TextBase variant="body_medium" color="primary">Primary Color</TextBase>
          <TextBase variant="body_medium" color="secondary">Secondary Color</TextBase>
          <TextBase variant="body_medium" color="tertiary">Tertiary Color</TextBase>
          <TextBase variant="body_medium" color="error">Error Color</TextBase>
          <TextBase variant="body_medium" color="success">Success Color</TextBase>
          <TextBase variant="body_medium" color="warning">Warning Color</TextBase>
          <TextBase variant="body_medium" color="info">Info Color</TextBase>
        </GlassBase>
        
        <Spacer size="xl" />
        
        {/* Glass Effects Section */}
        <TextBase variant="heading_3">Glass Effects</TextBase>
        <Spacer size="md" />
        
        <GlassBase variant="light" style={{ padding: theme.spacing.lg, marginBottom: theme.spacing.md }}>
          <TextBase variant="body_medium">Light Glass Effect</TextBase>
          <TextBase variant="caption" color="secondary">Most subtle blur and tint</TextBase>
        </GlassBase>
        
        <GlassBase variant="medium" style={{ padding: theme.spacing.lg, marginBottom: theme.spacing.md }}>
          <TextBase variant="body_medium">Medium Glass Effect</TextBase>
          <TextBase variant="caption" color="secondary">Balanced blur and tint</TextBase>
        </GlassBase>
        
        <GlassBase variant="heavy" style={{ padding: theme.spacing.lg }}>
          <TextBase variant="body_medium">Heavy Glass Effect</TextBase>
          <TextBase variant="caption" color="secondary">Strong blur and tint</TextBase>
        </GlassBase>
        
        <Spacer size="xl" />
        
        {/* Buttons Section */}
        <TextBase variant="heading_3">Buttons</TextBase>
        <Spacer size="md" />
        
        <Flex gap="md">
          {/* Size Variations */}
          <TextBase variant="body_small" color="tertiary">Sizes:</TextBase>
          <Flex direction="row" gap="sm">
            <ButtonBase 
              variant="primary" 
              size="sm" 
              onPress={() => handlePress('Small')}
            >
              <TextBase variant="button_small" color="inverse">Small</TextBase>
            </ButtonBase>
            
            <ButtonBase 
              variant="primary" 
              size="md" 
              onPress={() => handlePress('Medium')}
            >
              <TextBase variant="button_medium" color="inverse">Medium</TextBase>
            </ButtonBase>
            
            <ButtonBase 
              variant="primary" 
              size="lg" 
              onPress={() => handlePress('Large')}
            >
              <TextBase variant="button_large" color="inverse">Large</TextBase>
            </ButtonBase>
          </Flex>
          
          {/* Variant Variations */}
          <TextBase variant="body_small" color="tertiary">Variants:</TextBase>
          <ButtonBase 
            variant="primary" 
            size="lg" 
            onPress={() => handlePress('Primary')}
          >
            <TextBase variant="button_large" color="inverse">Primary Button</TextBase>
          </ButtonBase>
          
          <ButtonBase 
            variant="secondary" 
            size="lg" 
            onPress={() => handlePress('Secondary')}
          >
            <TextBase variant="button_large" color="inverse">Secondary Button</TextBase>
          </ButtonBase>
          
          <ButtonBase 
            variant="ghost" 
            size="lg" 
            onPress={() => handlePress('Ghost')}
          >
            <TextBase variant="button_large" color="primary">Ghost Button</TextBase>
          </ButtonBase>
          
          <ButtonBase 
            variant="danger" 
            size="lg" 
            onPress={() => handlePress('Danger')}
          >
            <TextBase variant="button_large" color="inverse">Danger Button</TextBase>
          </ButtonBase>
          
          {/* States */}
          <TextBase variant="body_small" color="tertiary">States:</TextBase>
          <ButtonBase 
            variant="primary" 
            size="lg" 
            onPress={() => handlePress('Disabled')}
            disabled
          >
            <TextBase variant="button_large" color="inverse">Disabled Button</TextBase>
          </ButtonBase>
          
          <ButtonBase 
            variant="primary" 
            size="lg" 
            onPress={() => handlePress('Loading')}
            loading
          >
            <TextBase variant="button_large" color="inverse">Loading...</TextBase>
          </ButtonBase>
        </Flex>
        
        <Spacer size="xl" />
        
        {/* Inputs Section */}
        <TextBase variant="heading_3">Inputs</TextBase>
        <Spacer size="md" />
        
        <Flex gap="md">
          <Flex gap="xs">
            <TextBase variant="body_small" color="tertiary">Default Input (Size: md)</TextBase>
            <InputBase
              variant="default"
              size="md"
              placeholder="Enter text..."
              value={inputValue1}
              onChangeText={setInputValue1}
            />
          </Flex>
          
          <Flex gap="xs">
            <TextBase variant="body_small" color="tertiary">Numeric Input (Size: lg)</TextBase>
            <InputBase
              variant="numeric"
              size="lg"
              placeholder="0"
              value={inputValue2}
              onChangeText={setInputValue2}
            />
          </Flex>
          
          <Flex gap="xs">
            <TextBase variant="body_small" color="tertiary">Search Input (Size: sm)</TextBase>
            <InputBase
              variant="search"
              size="sm"
              placeholder="Search exercises..."
              value={inputValue3}
              onChangeText={setInputValue3}
            />
          </Flex>
          
          <Flex gap="xs">
            <TextBase variant="body_small" color="error">Input with Error</TextBase>
            <InputBase
              variant="default"
              size="md"
              placeholder="Required field"
              value=""
              onChangeText={() => {}}
              hasError
            />
          </Flex>
        </Flex>
        
        <Spacer size="xl" />
        
        {/* Progress & Animation Section */}
        <TextBase variant="heading_3">Progress & Animation</TextBase>
        <Spacer size="md" />
        
        <GlassBase variant="light" style={{ padding: theme.spacing.lg }}>
          <Flex gap="lg">
            <Flex gap="sm">
              <TextBase variant="body_small" color="tertiary">Linear Progress</TextBase>
              <ProgressBase progress={progress} variant="linear" size="sm" />
              <ProgressBase progress={progress} variant="linear" size="md" />
              <ProgressBase progress={progress} variant="linear" size="lg" />
              <ButtonBase variant="ghost" size="sm" onPress={updateProgress}>
                <TextBase variant="button_small">Update Progress</TextBase>
              </ButtonBase>
            </Flex>
            
            <Flex gap="sm" align="center">
              <TextBase variant="body_small" color="tertiary">Animated Value</TextBase>
              <AnimatedValue 
                value={animatedNumber}
                format={(v) => `${Math.round(v)} reps`}
              />
              <ButtonBase variant="ghost" size="sm" onPress={updateNumber}>
                <TextBase variant="button_small">Animate Number</TextBase>
              </ButtonBase>
            </Flex>
          </Flex>
        </GlassBase>
        
        <Spacer size="xl" />
        
        {/* Layout Section */}
        <TextBase variant="heading_3">Layout Components</TextBase>
        <Spacer size="md" />
        
        <GlassBase variant="light" style={{ padding: theme.spacing.lg }}>
          <TextBase variant="body_medium">Flex Layout (Row)</TextBase>
          <Spacer size="sm" />
          <Flex direction="row" justify="between" align="center" gap="md">
            <View style={{ width: 60, height: 60, backgroundColor: theme.colors.primary }} />
            <View style={{ width: 60, height: 60, backgroundColor: theme.colors.secondary }} />
            <View style={{ width: 60, height: 60, backgroundColor: theme.colors.success }} />
          </Flex>
          
          <Spacer size="lg" />
          
          <TextBase variant="body_medium">Grid Layout (2 columns)</TextBase>
          <Spacer size="sm" />
          <Grid columns={2} gap="md">
            <GlassBase variant="medium" style={{ padding: theme.spacing.md, height: 80 }}>
              <TextBase variant="caption">Grid Item 1</TextBase>
            </GlassBase>
            <GlassBase variant="medium" style={{ padding: theme.spacing.md, height: 80 }}>
              <TextBase variant="caption">Grid Item 2</TextBase>
            </GlassBase>
            <GlassBase variant="medium" style={{ padding: theme.spacing.md, height: 80 }}>
              <TextBase variant="caption">Grid Item 3</TextBase>
            </GlassBase>
            <GlassBase variant="medium" style={{ padding: theme.spacing.md, height: 80 }}>
              <TextBase variant="caption">Grid Item 4</TextBase>
            </GlassBase>
          </Grid>
        </GlassBase>
        
        <Spacer size="xl" />
        
        {/* Spacing Demonstration */}
        <TextBase variant="heading_3">Spacing Scale</TextBase>
        <Spacer size="md" />
        
        <GlassBase variant="light" style={{ padding: theme.spacing.lg }}>
          {(['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const).map((size) => (
            <Flex key={size} direction="row" align="center" gap="md">
              <TextBase variant="caption" style={{ width: 40 }}>{size}:</TextBase>
              <View 
                style={{ 
                  height: theme.spacing[size], 
                  flex: 1, 
                  backgroundColor: theme.colors.primary,
                  opacity: 0.5,
                }}
              />
              <TextBase variant="caption" color="tertiary">{theme.spacing[size]}px</TextBase>
            </Flex>
          ))}
        </GlassBase>
        
        <Spacer size="xxxl" />
      </ScrollView>
    </SafeAreaView>
  );
};

</file>
<file path="src/screens/DiagnosticScreen.tsx">
import React, { useState } from 'react';
import { ScrollView, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

import {
  GlassBase,
  GlassBaseFallback,
  ButtonBase,
  TextBase,
  Spacer,
  Flex,
} from '@/components/atoms';
import { useTheme } from '@/hooks';

/**
 * Diagnostic Screen
 * Helps verify Skia and Reanimated are working correctly
 */
export const DiagnosticScreen: React.FC = () => {
  const theme = useTheme();
  const [useSkia, setUseSkia] = useState(true);
  const scale = useSharedValue(1);
  
  // Test Reanimated
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const testAnimation = () => {
    scale.value = withSpring(scale.value === 1 ? 1.2 : 1);
  };
  
  // Component to use
  const GlassComponent = useSkia ? GlassBase : GlassBaseFallback;
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing.lg,
        }}
      >
        <TextBase variant="heading_2" align="center">
          Setup Diagnostic
        </TextBase>
        <Spacer size="md" />
        <TextBase variant="body_medium" color="secondary" align="center">
          Platform: {Platform.OS} {Platform.Version}
        </TextBase>
        <Spacer size="xl" />
        
        {/* Skia Glass Test */}
        <TextBase variant="heading_4">1. Glass Effect Test</TextBase>
        <Spacer size="sm" />
        <TextBase variant="caption" color="secondary">
          Currently using: {useSkia ? 'Skia' : 'Fallback'}
        </TextBase>
        <Spacer size="md" />
        
        <Flex gap="md">
          <GlassComponent variant="light" style={{ padding: theme.spacing.md }}>
            <TextBase variant="body_medium">Light Glass</TextBase>
            <TextBase variant="caption" color="secondary">
              {useSkia ? 'Should blur on both platforms' : 'iOS blur, Android translucent'}
            </TextBase>
          </GlassComponent>
          
          <GlassComponent variant="medium" style={{ padding: theme.spacing.md }}>
            <TextBase variant="body_medium">Medium Glass</TextBase>
            <TextBase variant="caption" color="secondary">
              Blur amount: {useSkia ? theme.skiaBlur.medium.blur : theme.glass.medium.blur_amount}
            </TextBase>
          </GlassComponent>
          
          <GlassComponent variant="heavy" style={{ padding: theme.spacing.md }}>
            <TextBase variant="body_medium">Heavy Glass</TextBase>
            <TextBase variant="caption" color="secondary">
              Most blur effect
            </TextBase>
          </GlassComponent>
          
          <ButtonBase
            variant="primary"
            size="md"
            onPress={() => setUseSkia(!useSkia)}
          >
            <TextBase variant="button_medium" color="inverse">
              Switch to {useSkia ? 'Fallback' : 'Skia'}
            </TextBase>
          </ButtonBase>
        </Flex>
        
        <Spacer size="xl" />
        
        {/* Reanimated Test */}
        <TextBase variant="heading_4">2. Animation Test</TextBase>
        <Spacer size="sm" />
        <TextBase variant="caption" color="secondary">
          Tests if Reanimated is working
        </TextBase>
        <Spacer size="md" />
        
        <Flex align="center" gap="md">
          <Animated.View style={animatedStyle}>
            <GlassBase variant="medium" style={{ padding: theme.spacing.xl }}>
              <TextBase variant="body_large" align="center">
                Tap to Animate
              </TextBase>
            </GlassBase>
          </Animated.View>
          
          <ButtonBase
            variant="primary"
            size="lg"
            onPress={testAnimation}
          >
            <TextBase variant="button_large" color="inverse">
              Test Animation
            </TextBase>
          </ButtonBase>
        </Flex>
        
        <Spacer size="xl" />
        
        {/* Status Check */}
        <TextBase variant="heading_4">3. Status Check</TextBase>
        <Spacer size="md" />
        
        <GlassBase variant="light" style={{ padding: theme.spacing.md }}>
          <Flex gap="sm">
            <CheckItem 
              label="Skia Installed" 
              check={() => {
                try {
                  require('@shopify/react-native-skia');
                  return true;
                } catch {
                  return false;
                }
              }}
            />
            <CheckItem 
              label="Reanimated Installed" 
              check={() => {
                try {
                  require('react-native-reanimated');
                  return true;
                } catch {
                  return false;
                }
              }}
            />
            <CheckItem 
              label="Glass Effects Visible" 
              check={() => true} // User must verify visually
              manual
            />
            <CheckItem 
              label="Animations Working" 
              check={() => true} // User must verify visually
              manual
            />
            <CheckItem 
              label="Platform" 
              check={() => Platform.OS}
              info
            />
          </Flex>
        </GlassBase>
        
        <Spacer size="xl" />
        
        {/* Instructions */}
        <GlassBase variant="light" style={{ padding: theme.spacing.md }}>
          <TextBase variant="body_small">
            If glass blur or animations aren't working:{'\n\n'}
            1. Clean build: cd android && ./gradlew clean{'\n'}
            2. Reset cache: npx react-native start --reset-cache{'\n'}
            3. Rebuild app: yarn android{'\n\n'}
            Glass blur should work on BOTH platforms with Skia.
          </TextBase>
        </GlassBase>
        
        <Spacer size="xxxl" />
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper component
const CheckItem: React.FC<{ 
  label: string; 
  check: () => boolean | string;
  manual?: boolean;
  info?: boolean;
}> = ({ label, check, manual, info }) => {
  const result = check();
  const theme = useTheme();
  
  return (
    <Flex direction="row" justify="between">
      <TextBase variant="body_small">{label}</TextBase>
      {manual ? (
        <TextBase variant="body_small" color="warning">Manual Check</TextBase>
      ) : info ? (
        <TextBase variant="body_small" color="info">{result}</TextBase>
      ) : (
        <TextBase 
          variant="body_small" 
          color={result ? 'success' : 'error'}
        >
          {result ? '✓' : '✗'}
        </TextBase>
      )}
    </Flex>
  );
};

</file>
<file path="src/screens/index.ts">
// Export all screens
export { AtomsShowcaseScreen } from './AtomsShowcaseScreen';
export { WorkoutExampleScreen } from './WorkoutExampleScreen';
export { DiagnosticScreen } from './DiagnosticScreen';

</file>
<file path="src/screens/WorkoutExampleScreen.tsx">
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  GlassBase,
  ButtonBase,
  TextBase,
  InputBase,
  Spacer,
  Flex,
  Grid,
  ProgressBase,
  AnimatedValue,
} from '@/components/atoms';
import { useTheme } from '@/hooks';

/**
 * Workout Example Screen
 * Shows how atoms compose into real workout UI
 */
export const WorkoutExampleScreen: React.FC = () => {
  const theme = useTheme();
  
  // Mock data
  const [currentSet, setCurrentSet] = useState(2);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [repsInput, setRepsInput] = useState('');
  const [weightInput, setWeightInput] = useState('135');
  
  const exercises = [
    { id: '1', name: 'Bench Press', sets: '3x10', muscle: 'Chest', completed: true },
    { id: '2', name: 'Incline Press', sets: '3x8', muscle: 'Chest', completed: false },
    { id: '3', name: 'Cable Flyes', sets: '3x12', muscle: 'Chest', completed: false },
    { id: '4', name: 'Tricep Dips', sets: '3x10', muscle: 'Triceps', completed: false },
  ];
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Flex direction="row" justify="between" align="center">
          <TextBase variant="heading_2">Push Day</TextBase>
          <TextBase variant="body_medium" color="secondary">
            {exercises.filter(e => e.completed).length}/{exercises.length} exercises
          </TextBase>
        </Flex>
        
        <Spacer size="lg" />
        
        {/* Progress */}
        <ProgressBase 
          progress={exercises.filter(e => e.completed).length / exercises.length} 
          variant="linear" 
          size="md" 
        />
        
        <Spacer size="xl" />
        
        {/* Current Exercise Display */}
        <GlassBase variant="heavy" style={{ padding: theme.spacing.xl }}>
          <Flex align="center" gap="md">
            <TextBase variant="body_small" color="secondary">CURRENT EXERCISE</TextBase>
            <TextBase variant="heading_1">Bench Press</TextBase>
            <TextBase variant="heading_3" color="primary">Set {currentSet} of 3</TextBase>
            
            <Spacer size="md" />
            
            <Flex direction="row" gap="xl" justify="center">
              <Flex align="center">
                <TextBase variant="caption" color="tertiary">PREVIOUS</TextBase>
                <TextBase variant="body_large">10 × 135 lbs</TextBase>
              </Flex>
              
              <View style={{ width: 1, backgroundColor: theme.colors.divider }} />
              
              <Flex align="center">
                <TextBase variant="caption" color="tertiary">TARGET</TextBase>
                <TextBase variant="body_large" color="primary">10 reps</TextBase>
              </Flex>
            </Flex>
          </Flex>
        </GlassBase>
        
        <Spacer size="xl" />
        
        {/* Rest Timer */}
        <GlassBase variant="medium" style={{ padding: theme.spacing.lg }}>
          <Flex direction="row" justify="between" align="center">
            <Flex>
              <TextBase variant="caption" color="tertiary">REST TIME</TextBase>
              <AnimatedValue 
                value={timeRemaining}
                format={(v) => `${Math.floor(v)}s`}
                style={{ fontSize: theme.typography.heading_2.font_size }}
              />
            </Flex>
            
            <ButtonBase variant="ghost" size="sm" onPress={() => setTimeRemaining(0)}>
              <TextBase variant="button_small">Skip Rest</TextBase>
            </ButtonBase>
          </Flex>
        </GlassBase>
        
        <Spacer size="xl" />
        
        {/* Log Set Form */}
        <TextBase variant="heading_4">Log This Set</TextBase>
        <Spacer size="md" />
        
        <Flex gap="md">
          <Flex direction="row" gap="md">
            <Flex flex={1} gap="xs">
              <TextBase variant="body_small" color="tertiary">REPS</TextBase>
              <InputBase
                variant="numeric"
                size="lg"
                placeholder="10"
                value={repsInput}
                onChangeText={setRepsInput}
              />
            </Flex>
            
            <Flex flex={1} gap="xs">
              <TextBase variant="body_small" color="tertiary">WEIGHT (LBS)</TextBase>
              <InputBase
                variant="numeric"
                size="lg"
                placeholder="135"
                value={weightInput}
                onChangeText={setWeightInput}
              />
            </Flex>
          </Flex>
          
          <ButtonBase 
            variant="primary" 
            size="lg" 
            onPress={() => console.log('Complete set')}
          >
            <TextBase variant="button_large" color="inverse">
              Complete Set
            </TextBase>
          </ButtonBase>
        </Flex>
        
        <Spacer size="xl" />
        
        {/* Exercise List */}
        <TextBase variant="heading_4">Today's Exercises</TextBase>
        <Spacer size="md" />
        
        <Flex gap="sm">
          {exercises.map((exercise, index) => (
            <GlassBase 
              key={exercise.id} 
              variant="light" 
              style={{ 
                padding: theme.spacing.md,
                opacity: exercise.completed ? 0.7 : 1,
              }}
            >
              <Flex direction="row" justify="between" align="center">
                <Flex direction="row" gap="md" align="center" flex={1}>
                  <TextBase variant="body_large" color="tertiary">
                    {index + 1}
                  </TextBase>
                  
                  <Flex flex={1}>
                    <TextBase 
                      variant="body_medium" 
                      style={{ 
                        textDecorationLine: exercise.completed ? 'line-through' : 'none' 
                      }}
                    >
                      {exercise.name}
                    </TextBase>
                    <TextBase variant="caption" color="secondary">
                      {exercise.sets} • {exercise.muscle}
                    </TextBase>
                  </Flex>
                </Flex>
                
                {exercise.completed && (
                  <TextBase variant="body_medium" color="success">✓</TextBase>
                )}
              </Flex>
            </GlassBase>
          ))}
        </Flex>
        
        <Spacer size="xl" />
        
        {/* Action Buttons */}
        <Grid columns={2} gap="md">
          <ButtonBase variant="ghost" size="md" onPress={() => {}}>
            <TextBase variant="button_medium">Add Exercise</TextBase>
          </ButtonBase>
          
          <ButtonBase variant="danger" size="md" onPress={() => {}}>
            <TextBase variant="button_medium" color="inverse">End Workout</TextBase>
          </ButtonBase>
        </Grid>
        
        <Spacer size="xxxl" />
      </ScrollView>
    </SafeAreaView>
  );
};

</file>
<file path="src/services/api/index.ts">

</file>
<file path="src/services/graphql/queries/exercises.graphql">
# Get user's exercises (owned + library visible to them)
query GetExercises($user_id: uuid!) {
  exercise(
    where: {
      _or: [
        { user_id: { _eq: $user_id } }
        { user_id: { _is_null: true } }
      ]
      is_archived: { _eq: false }
    }
    order_by: { name: asc }
  ) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration_seconds
    default_rest_seconds
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    notes
    created_at
    updated_at
  }
}

# Get single exercise by ID
query GetExerciseById($id: uuid!) {
  exercise_by_pk(id: $id) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration_seconds
    default_rest_seconds
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    notes
    created_at
    updated_at
  }
}

# Create new exercise
mutation CreateExercise($object: exercise_insert_input!) {
  insert_exercise_one(object: $object) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration_seconds
    default_rest_seconds
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    notes
    created_at
    updated_at
  }
}

# Update existing exercise
mutation UpdateExercise($id: uuid!, $set: exercise_set_input!) {
  update_exercise_by_pk(pk_columns: { id: $id }, _set: $set) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration_seconds
    default_rest_seconds
    is_favorite
    is_archived
    notes
    updated_at
  }
}

# Copy exercise from library
mutation CopyExerciseFromLibrary($user_id: uuid!, $source_id: uuid!) {
  insert_exercise_one(
    object: {
      user_id: $user_id
      source_id: $source_id
      # Copy all fields from source via trigger
    }
  ) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration_seconds
    default_rest_seconds
    created_at
    updated_at
  }
}

# Toggle favorite status
mutation ToggleFavoriteExercise($id: uuid!, $is_favorite: Boolean!) {
  update_exercise_by_pk(
    pk_columns: { id: $id }
    _set: { is_favorite: $is_favorite }
  ) {
    id
    is_favorite
  }
}

# Archive exercise (soft delete)
mutation ArchiveExercise($id: uuid!) {
  update_exercise_by_pk(
    pk_columns: { id: $id }
    _set: { is_archived: true }
  ) {
    id
    is_archived
  }
}

</file>
<file path="src/services/graphql/queries/workouts.graphql">
# Get user's workouts
query GetWorkouts($user_id: uuid!) {
  workout(
    where: {
      _or: [
        { user_id: { _eq: $user_id } }
        { user_id: { _is_null: true } }
      ]
      is_archived: { _eq: false }
    }
    order_by: { updated_at: desc }
  ) {
    id
    user_id
    source_id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    created_at
    updated_at
    workout_exercises(order_by: { exercise_order: asc }) {
      exercise_id
      exercise_order
      sets
      reps
      duration_seconds
      rest_seconds
      exercise {
        id
        name
        muscle_groups
        equipment
        measurement_type
      }
    }
  }
}

# Get single workout by ID
query GetWorkoutById($id: uuid!) {
  workout_by_pk(id: $id) {
    id
    user_id
    source_id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    created_at
    updated_at
    workout_exercises(order_by: { exercise_order: asc }) {
      exercise_id
      exercise_order
      sets
      reps
      duration_seconds
      rest_seconds
      exercise {
        id
        name
        muscle_groups
        equipment
        instructions
        measurement_type
      }
    }
  }
}

# Create new workout
mutation CreateWorkout($object: workout_insert_input!) {
  insert_workout_one(object: $object) {
    id
    user_id
    source_id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    created_at
    updated_at
  }
}

# Update existing workout
mutation UpdateWorkout($id: uuid!, $set: workout_set_input!) {
  update_workout_by_pk(pk_columns: { id: $id }, _set: $set) {
    id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    is_favorite
    updated_at
  }
}

# Add exercise to workout (living workouts!)
mutation AddExerciseToWorkout(
  $workout_id: uuid!
  $exercise_id: uuid!
  $exercise_order: numeric!
  $sets: Int!
  $reps: Int
  $duration_seconds: Int
  $rest_seconds: Int!
) {
  insert_workout_exercise_one(
    object: {
      workout_id: $workout_id
      exercise_id: $exercise_id
      exercise_order: $exercise_order
      sets: $sets
      reps: $reps
      duration_seconds: $duration_seconds
      rest_seconds: $rest_seconds
    }
  ) {
    workout_id
    exercise_id
    exercise_order
    sets
    reps
    duration_seconds
    rest_seconds
  }
}

# Update exercise in workout
mutation UpdateWorkoutExercise(
  $workout_id: uuid!
  $exercise_id: uuid!
  $set: workout_exercise_set_input!
) {
  update_workout_exercise_by_pk(
    pk_columns: { workout_id: $workout_id, exercise_id: $exercise_id }
    _set: $set
  ) {
    workout_id
    exercise_id
    exercise_order
    sets
    reps
    duration_seconds
    rest_seconds
  }
}

# Remove exercise from workout
mutation RemoveExerciseFromWorkout($workout_id: uuid!, $exercise_id: uuid!) {
  delete_workout_exercise_by_pk(
    workout_id: $workout_id
    exercise_id: $exercise_id
  ) {
    workout_id
    exercise_id
  }
}

# Copy workout from library
mutation CopyWorkoutFromLibrary($user_id: uuid!, $source_id: uuid!) {
  insert_workout_one(
    object: {
      user_id: $user_id
      source_id: $source_id
      # Copy all fields from source via trigger
    }
  ) {
    id
    user_id
    source_id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    created_at
    updated_at
  }
}

# Toggle favorite status
mutation ToggleFavoriteWorkout($id: uuid!, $is_favorite: Boolean!) {
  update_workout_by_pk(
    pk_columns: { id: $id }
    _set: { is_favorite: $is_favorite }
  ) {
    id
    is_favorite
  }
}

# Archive workout (soft delete)
mutation ArchiveWorkout($id: uuid!) {
  update_workout_by_pk(
    pk_columns: { id: $id }
    _set: { is_archived: true }
  ) {
    id
    is_archived
  }
}

# Start workout performance
mutation StartWorkoutPerformance($user_id: uuid!, $workout_id: uuid!) {
  insert_workout_performance_one(
    object: {
      user_id: $user_id
      workout_id: $workout_id
      started_at: "now()"
    }
  ) {
    id
    user_id
    workout_id
    started_at
  }
}

</file>
<file path="src/services/graphql/client.ts">
import { 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink, 
  ApolloLink,
  NormalizedCacheObject 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import environment variables
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT || 'http://localhost:8080/v1/graphql';

/**
 * HTTP Link - Connection to GraphQL endpoint
 */
const httpLink = createHttpLink({
  uri: HASURA_ENDPOINT,
});

/**
 * Auth Link - Adds authentication headers
 */
const authLink = setContext(async (_, { headers }) => {
  // Get auth token from storage
  const token = await AsyncStorage.getItem('auth_token');
  const userId = await AsyncStorage.getItem('user_id');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'x-hasura-user-id': userId || '',
      'x-hasura-role': 'user',
    },
  };
});

/**
 * Error Link - Handles GraphQL and network errors
 */
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    
    // Handle auth errors
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      // Clear auth and redirect to login
      AsyncStorage.multiRemove(['auth_token', 'user_id']);
      // Navigation will be handled by auth context
    }
  }
});

/**
 * Cache configuration
 */
const cache = new InMemoryCache({
  typePolicies: {
    // Workout exercises merge properly
    workout: {
      fields: {
        workout_exercises: {
          merge(existing = [], incoming: unknown[]) {
            return incoming;
          },
        },
      },
    },
    
    // Exercise uses composite key (id + user_id)
    exercise: {
      keyFields: ['id', 'user_id'],
    },
    
    // Query type policies
    Query: {
      fields: {
        // Merge paginated lists properly
        exercises: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming: unknown[]) {
            return incoming;
          },
        },
        workouts: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming: unknown[]) {
            return incoming;
          },
        },
      },
    },
  },
});

/**
 * Apollo Client instance
 */
export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

/**
 * Helper to reset Apollo cache
 */
export const resetApolloCache = async (): Promise<void> => {
  await apolloClient.clearStore();
};

/**
 * Helper to refetch all active queries
 */
export const refetchQueries = async (): Promise<void> => {
  await apolloClient.refetchQueries({
    include: 'active',
  });
};

</file>
<file path="src/services/graphql/index.ts">

</file>
<file path="src/services/index.ts">

</file>
<file path="src/services/mockApi.ts">
import type { 
  UUID, 
  CreateExerciseInput,
  UpdateExerciseInput,
  CreateWorkoutInput,
  UpdateWorkoutInput,
  AddExerciseToWorkoutInput,
  AIGenerationRequest,
  CompleteWorkoutInput,
} from '@/types';

import type {
  Exercise,
  Workout,
  WorkoutExercise,
  WorkoutPerformance,
  ExercisePerformance,
  SetPerformance,
  User,
} from '@/types/database/models';

/**
 * Mock API Service
 * Provides mock data and operations for development
 * All methods are properly typed with no `any` types
 */

// Mock database
interface MockDatabase {
  currentUser: Pick<User, 'id' | 'name' | 'email'>;
  exercises: Exercise[];
  workouts: Workout[];
  performances: WorkoutPerformance[];
}

// Error class
export class MockApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'MockApiError';
  }
}

// Helper functions
const delay = (ms: number = 300): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock database instance
const mockDatabase: MockDatabase = {
  currentUser: {
    id: 'user_123',
    name: 'Test User',
    email: 'test@example.com',
  },
  
  exercises: [
    // Library exercises (user_id = null)
    {
      id: 'lib_ex_1',
      user_id: null,
      source_id: null,
      name: 'Barbell Bench Press',
      muscle_groups: ['chest', 'triceps', 'shoulders'],
      category: 'strength',
      equipment: 'barbell',
      instructions: 'Lie on bench, lower bar to chest with control, press up powerfully.',
      measurement_type: 'reps',
      default_sets: 3,
      default_reps: 10,
      default_duration_seconds: null,
      default_rest_seconds: 90,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: false,
      ai_prompt: null,
      notes: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 'lib_ex_2',
      user_id: null,
      source_id: null,
      name: 'Pull-ups',
      muscle_groups: ['back', 'biceps'],
      category: 'strength',
      equipment: 'bodyweight',
      instructions: 'Hang from bar, pull up until chin over bar.',
      measurement_type: 'reps',
      default_sets: 3,
      default_reps: 8,
      default_duration_seconds: null,
      default_rest_seconds: 90,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: false,
      ai_prompt: null,
      notes: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  ],
  
  workouts: [
    {
      id: 'lib_w_1',
      user_id: null,
      source_id: null,
      name: 'Push Day - Beginner',
      description: 'Chest, shoulders, and triceps workout',
      category: 'strength',
      difficulty: 'beginner',
      estimated_duration_minutes: 45,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: false,
      ai_prompt: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      workout_exercises: [
        {
          workout_id: 'lib_w_1',
          exercise_id: 'lib_ex_1',
          exercise_order: 1.0,
          sets: 3,
          reps: 10,
          duration_seconds: null,
          rest_seconds: 90,
        },
      ],
    },
  ],
  
  performances: [],
};

// Mock API implementation
export const mockApi = {
  // Auth
  async getCurrentUser(): Promise<{ id: UUID; name: string; email: string }> {
    await delay();
    return mockDatabase.currentUser;
  },

  // Exercises
  async getExercises(userId: UUID): Promise<Exercise[]> {
    await delay();
    return mockDatabase.exercises.filter(ex => 
      !ex.is_archived && (ex.user_id === userId || ex.user_id === null)
    );
  },

  async getExerciseById(id: UUID): Promise<Exercise> {
    await delay(100);
    const exercise = mockDatabase.exercises.find(ex => ex.id === id);
    if (!exercise) {
      throw new MockApiError('Exercise not found', 'NOT_FOUND', 404);
    }
    return exercise;
  },

  async createExercise(input: CreateExerciseInput): Promise<Exercise> {
    await delay();
    
    const newExercise: Exercise = {
      ...input,
      id: `ex_${Date.now()}`,
      source_id: input.source_id || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_favorite: false,
      is_archived: false,
      is_ai_generated: input.is_ai_generated || false,
      ai_prompt: input.ai_prompt || null,
      notes: null,
      default_reps: input.default_reps ?? null,
      default_duration_seconds: input.default_duration_seconds ?? null,
    };
    
    mockDatabase.exercises.push(newExercise);
    return newExercise;
  },

  async updateExercise(id: UUID, updates: UpdateExerciseInput): Promise<Exercise> {
    await delay();
    
    const index = mockDatabase.exercises.findIndex(ex => ex.id === id);
    if (index === -1) {
      throw new MockApiError('Exercise not found', 'NOT_FOUND', 404);
    }
    
    const exercise = mockDatabase.exercises[index]!;
    if (!exercise.user_id) {
      throw new MockApiError('Cannot modify library exercises', 'FORBIDDEN', 403);
    }
    
    mockDatabase.exercises[index] = {
      ...exercise,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    return mockDatabase.exercises[index]!;
  },

  async copyExerciseFromLibrary(libraryExerciseId: UUID, userId: UUID): Promise<Exercise> {
    await delay();
    
    const libraryExercise = mockDatabase.exercises.find(
      ex => ex.id === libraryExerciseId && !ex.user_id
    );
    
    if (!libraryExercise) {
      throw new MockApiError('Library exercise not found', 'NOT_FOUND', 404);
    }
    
    const existing = mockDatabase.exercises.find(
      ex => ex.source_id === libraryExerciseId && ex.user_id === userId
    );
    if (existing) return existing;
    
    const copiedExercise: Exercise = {
      ...libraryExercise,
      id: `ex_${Date.now()}`,
      user_id: userId,
      source_id: libraryExerciseId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockDatabase.exercises.push(copiedExercise);
    return copiedExercise;
  },

  // Workouts
  async getWorkouts(userId: UUID): Promise<Workout[]> {
    await delay();
    
    const workouts = mockDatabase.workouts.filter(w => 
      !w.is_archived && (w.user_id === userId || w.user_id === null)
    );
    
    return workouts.map(workout => ({
      ...workout,
      workout_exercises: workout.workout_exercises.map(we => ({
        ...we,
        exercise: mockDatabase.exercises.find(ex => ex.id === we.exercise_id),
      })),
    }));
  },

  async getWorkoutById(id: UUID): Promise<Workout> {
    await delay(100);
    const workout = mockDatabase.workouts.find(w => w.id === id);
    if (!workout) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }
    
    return {
      ...workout,
      workout_exercises: workout.workout_exercises.map(we => ({
        ...we,
        exercise: mockDatabase.exercises.find(ex => ex.id === we.exercise_id),
      })),
    };
  },

  async createWorkout(input: CreateWorkoutInput): Promise<Workout> {
    await delay();
    
    const newWorkout: Workout = {
      ...input,
      id: `w_${Date.now()}`,
      source_id: input.source_id || null,
      description: input.description || null,
      estimated_duration_minutes: input.estimated_duration_minutes || null,
      workout_exercises: input.exercises || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_favorite: false,
      is_archived: false,
      is_ai_generated: input.is_ai_generated || false,
      ai_prompt: input.ai_prompt || null,
    };
    
    mockDatabase.workouts.push(newWorkout);
    return newWorkout;
  },

  async updateWorkout(id: UUID, updates: UpdateWorkoutInput): Promise<Workout> {
    await delay();
    
    const index = mockDatabase.workouts.findIndex(w => w.id === id);
    if (index === -1) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }
    
    const workout = mockDatabase.workouts[index]!;
    if (!workout.user_id) {
      throw new MockApiError('Cannot modify library workouts', 'FORBIDDEN', 403);
    }
    
    mockDatabase.workouts[index] = {
      ...workout,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    return mockDatabase.workouts[index]!;
  },

  async addExerciseToWorkout(
    workoutId: UUID, 
    exerciseId: UUID, 
    order: number, 
    config: Omit<AddExerciseToWorkoutInput, 'workout_id' | 'exercise_id' | 'exercise_order'>
  ): Promise<Workout> {
    await delay();
    
    const workoutIndex = mockDatabase.workouts.findIndex(w => w.id === workoutId);
    if (workoutIndex === -1) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }
    
    const newExercise: WorkoutExercise = {
      exercise_id: exerciseId,
      exercise_order: order,
      sets: config.sets,
      reps: config.reps ?? null,
      duration_seconds: config.duration_seconds ?? null,
      rest_seconds: config.rest_seconds,
    };
    
    mockDatabase.workouts[workoutIndex]!.workout_exercises.push(newExercise);
    mockDatabase.workouts[workoutIndex]!.updated_at = new Date().toISOString();
    
    return mockDatabase.workouts[workoutIndex]!;
  },

  // Performance
  async getPerformanceHistory(userId: UUID, limit: number = 50): Promise<WorkoutPerformance[]> {
    await delay();
    
    return mockDatabase.performances
      .filter(p => p.user_id === userId)
      .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
      .slice(0, limit);
  },

  async startWorkoutPerformance(userId: UUID, workoutId: UUID): Promise<WorkoutPerformance> {
    await delay();
    
    const performance: WorkoutPerformance = {
      id: `perf_${Date.now()}`,
      user_id: userId,
      workout_id: workoutId,
      started_at: new Date().toISOString(),
      completed_at: null,
      notes: null,
      exercise_performances: [],
    };
    
    mockDatabase.performances.push(performance);
    return performance;
  },

  async completeWorkoutPerformance(
    performanceId: UUID, 
    data: Omit<CompleteWorkoutInput, 'workout_performance_id'>
  ): Promise<WorkoutPerformance> {
    await delay();
    
    const index = mockDatabase.performances.findIndex(p => p.id === performanceId);
    if (index === -1) {
      throw new MockApiError('Performance not found', 'NOT_FOUND', 404);
    }
    
    mockDatabase.performances[index] = {
      ...mockDatabase.performances[index]!,
      ...data,
      completed_at: data.completed_at,
    };
    
    return mockDatabase.performances[index]!;
  },

  // AI Generation
  async generateExerciseWithAI(
    request: AIGenerationRequest
  ): Promise<Omit<Exercise, 'id' | 'created_at' | 'updated_at'>> {
    await delay(1000);
    
    return {
      user_id: request.user_id,
      source_id: null,
      name: `AI Exercise: ${request.prompt?.slice(0, 20) || 'Generated'}...`,
      muscle_groups: request.constraints?.muscle_groups || ['full_body'],
      category: 'strength',
      equipment: request.constraints?.equipment?.[0] || 'bodyweight',
      instructions: `AI Generated: Based on your request "${request.prompt || 'custom exercise'}"...`,
      measurement_type: 'reps',
      default_sets: 3,
      default_reps: 12,
      default_duration_seconds: null,
      default_rest_seconds: 60,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: true,
      ai_prompt: request.prompt || null,
      notes: null,
    };
  },

  async generateWorkoutWithAI(
    request: AIGenerationRequest
  ): Promise<Omit<Workout, 'id' | 'created_at' | 'updated_at'>> {
    await delay(1500);
    
    return {
      user_id: request.user_id,
      source_id: null,
      name: `AI Workout: ${request.constraints?.duration_minutes || 30}min`,
      description: `AI Generated workout based on: ${request.prompt || 'your preferences'}`,
      category: request.constraints?.workout_type || 'general',
      difficulty: request.constraints?.fitness_level || 'intermediate',
      estimated_duration_minutes: request.constraints?.duration_minutes || 30,
      workout_exercises: [],
      is_favorite: false,
      is_archived: false,
      is_ai_generated: true,
      ai_prompt: request.prompt || null,
    };
  },
};

// Helper for seeding more test data
export const seedMockData = {
  addMoreExercises: (count: number = 10): void => {
    const categories = ['strength', 'cardio', 'flexibility', 'balance'];
    const equipment = ['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'];
    const muscleGroups = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];
    
    for (let i = 0; i < count; i++) {
      const exercise: Exercise = {
        id: `seed_ex_${i}`,
        user_id: null,
        source_id: null,
        name: `Exercise ${i + 1}`,
        muscle_groups: [muscleGroups[i % muscleGroups.length]!],
        category: categories[i % categories.length]!,
        equipment: equipment[i % equipment.length]!,
        instructions: `Instructions for exercise ${i + 1}`,
        measurement_type: i % 3 === 0 ? 'duration' : 'reps',
        default_sets: 3,
        default_reps: i % 3 === 0 ? null : 10,
        default_duration_seconds: i % 3 === 0 ? 30 : null,
        default_rest_seconds: 60,
        is_favorite: false,
        is_archived: false,
        is_ai_generated: false,
        ai_prompt: null,
        notes: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockDatabase.exercises.push(exercise);
    }
  },
  
  clearUserData: (): void => {
    mockDatabase.exercises = mockDatabase.exercises.filter(ex => !ex.user_id);
    mockDatabase.workouts = mockDatabase.workouts.filter(w => !w.user_id);
    mockDatabase.performances = [];
  },
};

</file>
<file path="src/store/exercise/index.ts">

</file>
<file path="src/store/performance/index.ts">

</file>
<file path="src/store/workout/index.ts">

</file>
<file path="src/store/index.ts">

</file>
<file path="src/theme/hooks/index.ts">

</file>
<file path="src/theme/hooks/useTheme.ts">
import { useContext } from 'react';

import { ThemeContext } from '@/contexts/ThemeContext';
import type { Theme } from '../index';

/**
 * Hook to access the current theme
 * Must be used within ThemeProvider
 */
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context.theme;
};

/**
 * Hook to access theme controls
 * Includes theme toggle functionality
 */
export const useThemeControls = (): {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
} => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeControls must be used within ThemeProvider');
  }
  
  return context;
};

/**
 * Helper hook to get specific theme tokens
 */
export const useThemeToken = <K extends keyof Theme>(key: K): Theme[K] => {
  const theme = useTheme();
  return theme[key];
};

/**
 * Helper hook for responsive values based on theme
 */
export const useThemeValue = <T>(lightValue: T, darkValue: T): T => {
  const { isDark } = useThemeControls();
  return isDark ? darkValue : lightValue;
};

</file>
<file path="src/theme/tokens/colors.ts">
/**
 * Color design tokens
 * ALL colors in the app MUST come from this file
 */

// Base color palette
export const baseColors = {
  // Primary Palette (Blue)
  primary_50: '#E3F2FD',
  primary_100: '#BBDEFB',
  primary_200: '#90CAF9',
  primary_300: '#64B5F6',
  primary_400: '#42A5F5',
  primary_500: '#2196F3',
  primary_600: '#1E88E5',
  primary_700: '#1976D2',
  primary_800: '#1565C0',
  primary_900: '#0D47A1',

  // Secondary Palette (Purple)
  secondary_50: '#F3E5F5',
  secondary_100: '#E1BEE7',
  secondary_200: '#CE93D8',
  secondary_300: '#BA68C8',
  secondary_400: '#AB47BC',
  secondary_500: '#9C27B0',
  secondary_600: '#8E24AA',
  secondary_700: '#7B1FA2',
  secondary_800: '#6A1B9A',
  secondary_900: '#4A148C',

  // Neutral Palette
  neutral_0: '#FFFFFF',
  neutral_50: '#FAFAFA',
  neutral_100: '#F5F5F5',
  neutral_200: '#EEEEEE',
  neutral_300: '#E0E0E0',
  neutral_400: '#BDBDBD',
  neutral_500: '#9E9E9E',
  neutral_600: '#757575',
  neutral_700: '#616161',
  neutral_800: '#424242',
  neutral_900: '#212121',
  neutral_1000: '#000000',

  // Semantic Colors
  success_light: '#81C784',
  success_main: '#4CAF50',
  success_dark: '#388E3C',

  warning_light: '#FFD54F',
  warning_main: '#FFC107',
  warning_dark: '#F57C00',

  error_light: '#E57373',
  error_main: '#F44336',
  error_dark: '#D32F2F',

  info_light: '#64B5F6',
  info_main: '#2196F3',
  info_dark: '#1976D2',
} as const;

// Light theme colors
export const lightThemeColors = {
  // Primary brand colors
  primary: baseColors.primary_500,
  secondary: baseColors.secondary_500,
  
  // Semantic colors
  success: baseColors.success_main,
  warning: baseColors.warning_main,
  error: baseColors.error_main,
  info: baseColors.info_main,
  
  // Backgrounds
  background: baseColors.neutral_50,
  surface: baseColors.neutral_0,
  elevated: baseColors.neutral_0,
  
  // Borders
  border: baseColors.neutral_200,
  divider: baseColors.neutral_100,
  
  // Text colors
  text_primary: baseColors.neutral_900,
  text_secondary: baseColors.neutral_700,
  text_tertiary: baseColors.neutral_500,
  text_disabled: baseColors.neutral_400,
  text_inverse: baseColors.neutral_0,
  
  // Glass effects
  glass_light: 'rgba(255, 255, 255, 0.7)',
  glass_medium: 'rgba(255, 255, 255, 0.5)',
  glass_heavy: 'rgba(255, 255, 255, 0.3)',
  glass_border: 'rgba(255, 255, 255, 0.2)',
  
  // Shadows
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Special states
  overlay: 'rgba(0, 0, 0, 0.5)',
  scrim: 'rgba(0, 0, 0, 0.32)',
  
  // Semantic extended
  success_light: baseColors.success_light,
  success_dark: baseColors.success_dark,
  warning_light: baseColors.warning_light,
  warning_dark: baseColors.warning_dark,
  error_light: baseColors.error_light,
  error_dark: baseColors.error_dark,
  info_light: baseColors.info_light,
  info_dark: baseColors.info_dark,
} as const;

// Dark theme colors
export const darkThemeColors = {
  // Primary brand colors
  primary: baseColors.primary_400,
  secondary: baseColors.secondary_400,
  
  // Semantic colors
  success: baseColors.success_main,
  warning: baseColors.warning_main,
  error: baseColors.error_main,
  info: baseColors.info_main,
  
  // Backgrounds
  background: baseColors.neutral_900,
  surface: baseColors.neutral_800,
  elevated: baseColors.neutral_800,
  
  // Borders
  border: baseColors.neutral_700,
  divider: baseColors.neutral_800,
  
  // Text colors
  text_primary: baseColors.neutral_0,
  text_secondary: baseColors.neutral_200,
  text_tertiary: baseColors.neutral_400,
  text_disabled: baseColors.neutral_600,
  text_inverse: baseColors.neutral_900,
  
  // Glass effects
  glass_light: 'rgba(0, 0, 0, 0.7)',
  glass_medium: 'rgba(0, 0, 0, 0.5)',
  glass_heavy: 'rgba(0, 0, 0, 0.3)',
  glass_border: 'rgba(255, 255, 255, 0.1)',
  
  // Shadows
  shadow: 'rgba(0, 0, 0, 0.3)',
  
  // Special states
  overlay: 'rgba(0, 0, 0, 0.7)',
  scrim: 'rgba(0, 0, 0, 0.5)',
  
  // Semantic extended
  success_light: baseColors.success_light,
  success_dark: baseColors.success_dark,
  warning_light: baseColors.warning_light,
  warning_dark: baseColors.warning_dark,
  error_light: baseColors.error_light,
  error_dark: baseColors.error_dark,
  info_light: baseColors.info_light,
  info_dark: baseColors.info_dark,
} as const;

// Type exports
export type ThemeColors = typeof lightThemeColors;
export type ColorName = keyof ThemeColors;

</file>
<file path="src/theme/tokens/effects.ts">
/**
 * Visual effects tokens
 * Glass effects, animations, borders, shadows
 */

// Glass morphism effects
export const glassEffects = {
  light: {
    blur_amount: 20,
    tint_opacity: 0.7,
    border_opacity: 0.2,
    shadow_opacity: 0.1,
  },
  medium: {
    blur_amount: 30,
    tint_opacity: 0.5,
    border_opacity: 0.15,
    shadow_opacity: 0.15,
  },
  heavy: {
    blur_amount: 40,
    tint_opacity: 0.3,
    border_opacity: 0.1,
    shadow_opacity: 0.2,
  },
} as const;

// Skia-specific blur effects
export const skiaBlurEffects = {
  light: {
    blur: 8,              // Skia blur is more efficient, lower values
    blurType: 'normal' as const,  // Changed from 'gaussian' to 'normal'
    tileMode: 'clamp' as const,
    backdropScale: 0.5,   // Downsample for performance
    colorBoost: 1.1,      // Color enhancement
    gradientOpacity: 0.8, // Gradient overlay strength
  },
  medium: {
    blur: 12,
    blurType: 'normal' as const,
    tileMode: 'clamp' as const,
    backdropScale: 0.5,
    colorBoost: 1.15,
    gradientOpacity: 0.6,
  },
  heavy: {
    blur: 16,
    blurType: 'normal' as const,
    tileMode: 'clamp' as const,
    backdropScale: 0.4,   // More aggressive downsampling
    colorBoost: 1.2,
    gradientOpacity: 0.4,
  },
} as const;

// Animation durations (ms)
export const animationDurations = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  crawl: 1000,
} as const;

// Spring animations (react-native-reanimated)
export const animationSprings = {
  // Snappy UI responses
  fast: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  // Balanced feel
  normal: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  // Smooth, deliberate
  slow: {
    damping: 20,
    stiffness: 90,
    mass: 1.2,
  },
  // Bouncy
  bouncy: {
    damping: 10,
    stiffness: 180,
    mass: 0.8,
  },
} as const;

// Easing curves (cubic-bezier)
export const animationEasings = {
  easeIn: [0.42, 0, 1, 1] as const,
  easeOut: [0, 0, 0.58, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
  linear: [0, 0, 1, 1] as const,
  easeInQuad: [0.55, 0.085, 0.68, 0.53] as const,
  easeOutQuad: [0.25, 0.46, 0.45, 0.94] as const,
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955] as const,
} as const;

// Border radii
export const borderRadii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const;

// Border widths
export const borderWidths = {
  none: 0,
  hairline: 0.5,
  thin: 1,
  medium: 2,
  thick: 4,
} as const;

// Shadow definitions
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.20,
    shadowRadius: 24,
    elevation: 12,
  },
  xxl: {
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
  },
} as const;

// Z-index layers
export const zIndices = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modalBackdrop: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  notification: 1600,
} as const;

// Type exports
export type GlassEffect = keyof typeof glassEffects;
export type SkiaBlurEffect = keyof typeof skiaBlurEffects;
export type AnimationDuration = keyof typeof animationDurations;
export type AnimationSpring = keyof typeof animationSprings;
export type AnimationEasing = keyof typeof animationEasings;
export type BorderRadius = keyof typeof borderRadii;
export type BorderWidth = keyof typeof borderWidths;
export type Shadow = keyof typeof shadows;
export type ZIndex = keyof typeof zIndices;

</file>
<file path="src/theme/tokens/index.ts">

</file>
<file path="src/theme/tokens/spacing.ts">
/**
 * Spacing design tokens
 * ALL spacing values MUST come from this file
 */

// Base spacing scale
export const spacing = {
  xxxs: 2,   // Hairline
  xxs: 4,    // Tiny
  xs: 8,     // Extra small
  sm: 12,    // Small
  md: 16,    // Medium (base)
  lg: 24,    // Large
  xl: 32,    // Extra large
  xxl: 48,   // Huge
  xxxl: 64,  // Massive
  xxxxl: 80, // Giant
  xxxxxl: 96, // Colossal
} as const;

// Component-specific spacing
export const componentSpacing = {
  // Screen padding
  screenPaddingHorizontal: spacing.md,
  screenPaddingVertical: spacing.lg,
  
  // Card spacing
  cardPadding: spacing.md,
  cardGap: spacing.sm,
  
  // List spacing
  listItemPadding: spacing.sm,
  listItemGap: spacing.xs,
  listSectionGap: spacing.xl,
  
  // Form spacing
  formFieldGap: spacing.lg,
  formSectionGap: spacing.xl,
  labelGap: spacing.xs,
  
  // Button spacing
  buttonPaddingHorizontal: spacing.lg,
  buttonPaddingVertical: spacing.sm,
  buttonGap: spacing.md,
  
  // Modal spacing
  modalPadding: spacing.lg,
  modalHeaderHeight: 60, // Fixed
  modalFooterPadding: spacing.md,
} as const;

// Touch target sizes (minimum)
export const touchTargets = {
  minimum: 44,   // iOS HIG minimum
  small: 48,     // Small controls
  medium: 56,    // Standard controls
  large: 64,     // Primary actions
  huge: 80,      // Active workout buttons
  massive: 100,  // Critical actions
} as const;

// Icon sizes
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
  xxxl: 56,
} as const;

// Type exports
export type SpacingScale = typeof spacing;
export type SpacingKey = keyof SpacingScale;
export type TouchTargetSize = keyof typeof touchTargets;
export type IconSize = keyof typeof iconSizes;

</file>
<file path="src/theme/tokens/typography.ts">
/**
 * Typography design tokens
 * ALL text styles MUST use these presets
 */

// Font families (using system fonts)
export const fontFamilies = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
} as const;

// Font sizes
export const fontSizes = {
  xxxs: 10,
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
  xxxxxl: 56,
} as const;

// Line heights (as multipliers)
export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

// Font weights
export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

// Letter spacing
export const letterSpacing = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
} as const;

// Typography presets
export const typographyPresets = {
  // Headings
  heading_1: {
    font_size: fontSizes.xxxxl,
    line_height: lineHeights.tight,
    font_weight: fontWeights.bold,
    letter_spacing: letterSpacing.tight,
  },
  heading_2: {
    font_size: fontSizes.xxxl,
    line_height: lineHeights.tight,
    font_weight: fontWeights.bold,
    letter_spacing: letterSpacing.tight,
  },
  heading_3: {
    font_size: fontSizes.xxl,
    line_height: lineHeights.normal,
    font_weight: fontWeights.semibold,
    letter_spacing: letterSpacing.normal,
  },
  heading_4: {
    font_size: fontSizes.xl,
    line_height: lineHeights.normal,
    font_weight: fontWeights.semibold,
    letter_spacing: letterSpacing.normal,
  },

  // Body text
  body_large: {
    font_size: fontSizes.lg,
    line_height: lineHeights.normal,
    font_weight: fontWeights.regular,
    letter_spacing: letterSpacing.normal,
  },
  body_medium: {
    font_size: fontSizes.md,
    line_height: lineHeights.normal,
    font_weight: fontWeights.regular,
    letter_spacing: letterSpacing.normal,
  },
  body_small: {
    font_size: fontSizes.sm,
    line_height: lineHeights.normal,
    font_weight: fontWeights.regular,
    letter_spacing: letterSpacing.normal,
  },

  // Button text
  button_large: {
    font_size: fontSizes.lg,
    line_height: lineHeights.tight,
    font_weight: fontWeights.semibold,
    letter_spacing: letterSpacing.wide,
  },
  button_medium: {
    font_size: fontSizes.md,
    line_height: lineHeights.tight,
    font_weight: fontWeights.semibold,
    letter_spacing: letterSpacing.wide,
  },
  button_small: {
    font_size: fontSizes.sm,
    line_height: lineHeights.tight,
    font_weight: fontWeights.medium,
    letter_spacing: letterSpacing.wide,
  },

  // Special text
  caption: {
    font_size: fontSizes.xs,
    line_height: lineHeights.normal,
    font_weight: fontWeights.regular,
    letter_spacing: letterSpacing.normal,
  },
  overline: {
    font_size: fontSizes.xxs,
    line_height: lineHeights.tight,
    font_weight: fontWeights.medium,
    letter_spacing: letterSpacing.widest,
  },
  
  // Workout-specific
  workout_timer: {
    font_size: fontSizes.xxxxxl,
    line_height: lineHeights.tight,
    font_weight: fontWeights.bold,
    letter_spacing: letterSpacing.tight,
  },
  workout_value: {
    font_size: fontSizes.xxxxl,
    line_height: lineHeights.tight,
    font_weight: fontWeights.bold,
    letter_spacing: letterSpacing.normal,
  },
  workout_label: {
    font_size: fontSizes.sm,
    line_height: lineHeights.normal,
    font_weight: fontWeights.medium,
    letter_spacing: letterSpacing.wide,
  },
} as const;

// Type exports
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
export type LetterSpacing = keyof typeof letterSpacing;
export type TypographyPreset = keyof typeof typographyPresets;
export type Typography = typeof typographyPresets[TypographyPreset];

</file>
<file path="src/theme/index.ts">
/**
 * Main theme export
 * Combines all design tokens into a single theme object
 */

import { lightThemeColors, darkThemeColors } from './tokens/colors';
import { spacing, componentSpacing, touchTargets, iconSizes } from './tokens/spacing';
import { typographyPresets } from './tokens/typography';
import {
  glassEffects,
  skiaBlurEffects,
  animationDurations,
  animationSprings,
  animationEasings,
  borderRadii,
  borderWidths,
  shadows,
  zIndices,
} from './tokens/effects';

// Theme interface
export interface Theme {
  readonly colors: typeof lightThemeColors;
  readonly spacing: typeof spacing;
  readonly componentSpacing: typeof componentSpacing;
  readonly typography: typeof typographyPresets;
  readonly glass: typeof glassEffects;
  readonly skiaBlur: typeof skiaBlurEffects;
  readonly animation: {
    readonly durations: typeof animationDurations;
    readonly springs: typeof animationSprings;
    readonly easings: typeof animationEasings;
  };
  readonly borders: {
    readonly radii: typeof borderRadii;
    readonly widths: typeof borderWidths;
  };
  readonly shadows: typeof shadows;
  readonly sizes: {
    readonly touchTargets: typeof touchTargets;
    readonly icons: typeof iconSizes;
    readonly buttons: {
      readonly sm: number;
      readonly md: number;
      readonly lg: number;
    };
    readonly inputs: {
      readonly sm: number;
      readonly md: number;
      readonly lg: number;
    };
  };
  readonly zIndices: typeof zIndices;
  readonly isDark: boolean;
}

// Create theme function
export const createTheme = (isDark: boolean): Theme => ({
  colors: isDark ? darkThemeColors : lightThemeColors,
  spacing,
  componentSpacing,
  typography: typographyPresets,
  glass: glassEffects,
  skiaBlur: skiaBlurEffects,
  animation: {
    durations: animationDurations,
    springs: animationSprings,
    easings: animationEasings,
  },
  borders: {
    radii: borderRadii,
    widths: borderWidths,
  },
  shadows,
  sizes: {
    touchTargets,
    icons: iconSizes,
    buttons: {
      sm: 36,
      md: 44,
      lg: 56,
    },
    inputs: {
      sm: 36,
      md: 44,
      lg: 56,
    },
  },
  zIndices,
  isDark,
});

// Export all tokens for direct access if needed
export * from './tokens/colors';
export * from './tokens/spacing';
export * from './tokens/typography';
export * from './tokens/effects';

</file>
<file path="src/types/business/activeWorkout.ts">
import type { UUID } from '../common';

/**
 * Types for managing active workout sessions
 * These types represent the runtime state during a workout
 */

// Workout states during execution
export type WorkoutState = 
  | 'preparing'  // Initial state, setting up
  | 'warmup'     // Warmup timer running
  | 'active'     // Performing exercises
  | 'rest'       // Rest between sets
  | 'paused'     // Workout paused
  | 'complete';  // Workout finished

// Represents a set being performed
export interface ActiveSet {
  readonly setNumber: number;
  readonly targetReps?: number;
  readonly targetDuration?: number;
  readonly targetDistance?: number;
  readonly restDuration: number;
}

// Performance data for a completed set
export interface SetPerformance {
  readonly reps?: number;
  readonly weight?: number;
  readonly duration?: number;
  readonly distance?: number;
  readonly completed: boolean;
  readonly notes?: string;
}

// Active exercise being performed
export interface ActiveExercise {
  readonly exercise_id: UUID;
  readonly exerciseName: string;
  readonly exercise_order: number;
  readonly instructions: string;
  readonly measurement_type: string;
  readonly sets: number;
  readonly completedSets: ReadonlyArray<SetPerformance>;
  readonly currentSet: ActiveSet | null;
}

// Complete active workout state
export interface ActiveWorkout {
  readonly workout_id: UUID;
  readonly workoutName: string;
  readonly startTime: Date;
  readonly state: WorkoutState;
  readonly exercises: ReadonlyArray<ActiveExercise>;
  readonly currentExerciseIndex: number;
  readonly currentSetIndex: number;
  readonly totalSets: number;
  readonly completedSets: number;
  readonly estimatedTimeRemaining: number; // seconds
}

// Helper functions for workout state
export const isWorkoutActive = (state: WorkoutState): boolean =>
  state !== 'complete' && state !== 'paused';

export const canAddExercise = (state: WorkoutState): boolean =>
  state === 'preparing' || state === 'active' || state === 'rest';

export const isSetComplete = (performance: SetPerformance): boolean =>
  performance.completed && 
  (performance.reps !== undefined || 
   performance.duration !== undefined || 
   performance.distance !== undefined);

</file>
<file path="src/types/business/filters.ts">
import type { UUID } from '../common';

/**
 * Types for filtering and searching data
 * Used throughout the app for list views
 */

// Exercise filtering options
export interface ExerciseFilters {
  readonly search?: string;
  readonly muscle_groups?: ReadonlyArray<string>;
  readonly categories?: ReadonlyArray<string>;
  readonly equipment?: ReadonlyArray<string>;
  readonly favoritesOnly?: boolean;
  readonly customOnly?: boolean;
  readonly source?: 'library' | 'mine' | 'all';
}

// Workout filtering options
export interface WorkoutFilters {
  readonly search?: string;
  readonly categories?: ReadonlyArray<string>;
  readonly difficulty?: ReadonlyArray<string>;
  readonly durationRange?: {
    readonly min?: number;
    readonly max?: number;
  };
  readonly favoritesOnly?: boolean;
  readonly customOnly?: boolean;
  readonly source?: 'library' | 'mine' | 'all';
}

// History filtering options
export interface HistoryFilters {
  readonly dateRange?: {
    readonly start: Date;
    readonly end: Date;
  };
  readonly workout_ids?: ReadonlyArray<UUID>;
  readonly completedOnly?: boolean;
}

// Helper to check if filters are active
export const hasActiveFilters = (filters: ExerciseFilters | WorkoutFilters | HistoryFilters): boolean => {
  return Object.values(filters).some(value => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true;
  });
};

// Helper to reset filters
export const createEmptyExerciseFilters = (): ExerciseFilters => ({
  source: 'all',
});

export const createEmptyWorkoutFilters = (): WorkoutFilters => ({
  source: 'all',
});

export const createEmptyHistoryFilters = (): HistoryFilters => ({
  completedOnly: true,
});

</file>
<file path="src/types/business/index.ts">

</file>
<file path="src/types/business/mutations.ts">
import type { UUID } from '../common';

/**
 * Input types for GraphQL mutations
 * These match the expected inputs for Hasura mutations
 */

// For adding exercise during workout (living workouts!)
export interface AddExerciseToWorkoutInput {
  readonly workout_id: UUID;
  readonly exercise_id: UUID;
  readonly exercise_order: number; // Use fractional ordering
  readonly sets: number;
  readonly reps?: number | null;
  readonly duration_seconds?: number | null;
  readonly rest_seconds: number;
}

// For creating new exercise (manual or AI-assisted)
export interface CreateExerciseInput {
  readonly user_id: UUID; // Makes it owned by user
  readonly source_id?: UUID | null; // If copied from library
  readonly name: string;
  readonly muscle_groups: ReadonlyArray<string>;
  readonly category: string;
  readonly equipment: string;
  readonly instructions: string;
  readonly measurement_type: string;
  readonly default_sets: number;
  readonly default_reps?: number | null;
  readonly default_duration_seconds?: number | null;
  readonly default_rest_seconds: number;
  readonly is_ai_generated?: boolean; // Just a flag!
  readonly ai_prompt?: string | null; // Store the prompt if AI
}

// For updating existing exercise
export interface UpdateExerciseInput {
  readonly name?: string;
  readonly muscle_groups?: ReadonlyArray<string>;
  readonly category?: string;
  readonly equipment?: string;
  readonly instructions?: string;
  readonly measurement_type?: string;
  readonly default_sets?: number;
  readonly default_reps?: number | null;
  readonly default_duration_seconds?: number | null;
  readonly default_rest_seconds?: number;
  readonly is_favorite?: boolean;
  readonly is_archived?: boolean;
  readonly notes?: string | null;
}

// For creating new workout (manual or AI-assisted)
export interface CreateWorkoutInput {
  readonly user_id: UUID;
  readonly source_id?: UUID | null;
  readonly name: string;
  readonly description?: string | null;
  readonly category: string;
  readonly difficulty: string;
  readonly estimated_duration_minutes?: number | null;
  readonly is_ai_generated?: boolean; // Just a flag!
  readonly ai_prompt?: string | null;
  readonly exercises?: ReadonlyArray<{
    readonly exercise_id: UUID;
    readonly exercise_order: number;
    readonly sets: number;
    readonly reps?: number | null;
    readonly duration_seconds?: number | null;
    readonly rest_seconds: number;
  }>;
}

// For updating existing workout
export interface UpdateWorkoutInput {
  readonly name?: string;
  readonly description?: string | null;
  readonly category?: string;
  readonly difficulty?: string;
  readonly estimated_duration_minutes?: number | null;
  readonly is_favorite?: boolean;
  readonly is_archived?: boolean;
}

// For AI generation requests (NOT a separate type!)
export interface AIGenerationRequest {
  readonly type: 'exercise' | 'workout';
  readonly user_id: UUID;
  readonly prompt?: string;
  readonly constraints?: {
    // For exercises
    readonly muscle_groups?: ReadonlyArray<string>;
    readonly equipment?: ReadonlyArray<string>;
    readonly exercise_type?: string;
    
    // For workouts  
    readonly duration_minutes?: number;
    readonly workout_type?: string;
    readonly exercise_count?: number;
    readonly fitness_level?: string;
  };
}

// For logging performance
export interface LogSetPerformanceInput {
  readonly exercise_id: UUID;
  readonly set_number: number;
  readonly reps?: number | null;
  readonly weight?: number | null;
  readonly duration_seconds?: number | null;
  readonly distance_meters?: number | null;
  readonly completed: boolean;
  readonly notes?: string | null;
}

// For completing workout
export interface CompleteWorkoutInput {
  readonly workout_performance_id: UUID;
  readonly completed_at: string;
  readonly notes?: string | null;
  readonly exercise_performances: ReadonlyArray<{
    readonly exercise_id: UUID;
    readonly exercise_name: string;
    readonly exercise_order: number;
    readonly set_performances: ReadonlyArray<LogSetPerformanceInput>;
  }>;
}

// AI returns Exercise or Workout from DB, not special types!

</file>
<file path="src/types/database/index.ts">

export * from './models';

</file>
<file path="src/types/database/models.ts">
import type { UUID } from '../common';

/**
 * Shared database model types
 * These will be REPLACED by generated types after running codegen
 * For now, they prevent duplication between mockApi and other services
 */

// Exercise model matching database schema
export interface Exercise {
  id: UUID;
  user_id: UUID | null;
  source_id: UUID | null;
  name: string;
  muscle_groups: string[];
  category: string;
  equipment: string;
  instructions: string;
  measurement_type: 'reps' | 'duration' | 'distance';
  default_sets: number;
  default_reps: number | null;
  default_duration_seconds: number | null;
  default_rest_seconds: number;
  is_favorite: boolean;
  is_archived: boolean;
  is_ai_generated: boolean;
  ai_prompt: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Workout exercise junction
export interface WorkoutExercise {
  workout_id: UUID;
  exercise_id: UUID;
  exercise_order: number;
  sets: number;
  reps: number | null;
  duration_seconds: number | null;
  rest_seconds: number;
  exercise?: Exercise; // Populated on fetch
}

// Workout model
export interface Workout {
  id: UUID;
  user_id: UUID | null;
  source_id: UUID | null;
  name: string;
  description: string | null;
  category: string;
  difficulty: string;
  estimated_duration_minutes: number | null;
  is_favorite: boolean;
  is_archived: boolean;
  is_ai_generated: boolean;
  ai_prompt: string | null;
  created_at: string;
  updated_at: string;
  workout_exercises: WorkoutExercise[];
}

// Performance models
export interface SetPerformance {
  set_number: number;
  reps?: number | null;
  weight?: number | null;
  duration_seconds?: number | null;
  distance_meters?: number | null;
  completed: boolean;
  notes?: string | null;
}

export interface ExercisePerformance {
  exercise_id: UUID;
  exercise_name: string;
  exercise_order: number;
  set_performances: SetPerformance[];
}

export interface WorkoutPerformance {
  id: UUID;
  user_id: UUID;
  workout_id: UUID;
  started_at: string;
  completed_at: string | null;
  notes: string | null;
  exercise_performances: ExercisePerformance[];
}

// User model
export interface User {
  id: UUID;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * IMPORTANT: After running GraphQL codegen:
 * 1. Delete this file
 * 2. Update all imports to use generated types from 'src/types/generated/graphql'
 * 3. The generated types will have the exact same shape but be auto-maintained
 */

</file>
<file path="src/types/ui/components.ts">
import type { ReactElement, ReactNode } from 'react';
import type { ViewStyle, TextStyle, AccessibilityRole } from 'react-native';

/**
 * UI component prop types
 * Base types that all components extend
 */

// Base props that EVERY component extends
export interface BaseComponentProps {
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
}

// Spacing props for consistent layout
export interface SpacingProps {
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginRight?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginHorizontal?: SpacingValue;
  marginVertical?: SpacingValue;
  padding?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  paddingHorizontal?: SpacingValue;
  paddingVertical?: SpacingValue;
}

// Spacing values from theme
export type SpacingValue = 
  | 'xxxs' 
  | 'xxs' 
  | 'xs' 
  | 'sm' 
  | 'md' 
  | 'lg' 
  | 'xl' 
  | 'xxl' 
  | 'xxxl' 
  | 'xxxxl' 
  | 'xxxxxl';

// Animation props
export interface AnimationProps {
  animationType?: 'spring' | 'timing';
  animationDuration?: number;
  animationDelay?: number;
}

// List component props
export interface ListProps<T> extends BaseComponentProps {
  data: ReadonlyArray<T>;
  renderItem: (item: T, index: number) => ReactElement;
  keyExtractor: (item: T, index: number) => string;
  emptyComponent?: ReactElement;
  headerComponent?: ReactElement;
  footerComponent?: ReactElement;
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

// Form component props
export interface FormProps<T> extends BaseComponentProps {
  initialValues: T;
  validation?: unknown; // Will use FormValidation<T> from validation.ts
  onSubmit: (values: T) => void | Promise<void>;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
}

// Modal props
export interface ModalProps extends BaseComponentProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footerComponent?: ReactElement;
}

// Card props
export interface CardProps extends BaseComponentProps, SpacingProps {
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  children: ReactNode;
  style?: ViewStyle;
}

// Button size variants
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

// Input size variants
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'search' | 'numeric';

// Text variants matching theme typography
export type TextVariant = 
  | 'heading_1' 
  | 'heading_2' 
  | 'heading_3' 
  | 'heading_4'
  | 'body_large' 
  | 'body_medium' 
  | 'body_small'
  | 'button_large' 
  | 'button_medium' 
  | 'button_small'
  | 'caption';

// Text color options
export type TextColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'inverse' 
  | 'error' 
  | 'success' 
  | 'warning'
  | 'info';

// Glass effect variants
export type GlassVariant = 'light' | 'medium' | 'heavy';

// Progress variants
export type ProgressVariant = 'linear' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';

// Timer display formats
export type TimerFormat = 'mm:ss' | 'hh:mm:ss' | 'seconds';

// Common style prop combinations
export interface StyleProps {
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  textStyle?: TextStyle;
}

// Loading state props
export interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
  skeleton?: boolean;
}

// Error state props
export interface ErrorProps {
  error?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

// Helper type for components that can be disabled
export interface DisableableProps {
  disabled?: boolean;
}

// Helper type for components with press handlers
export interface PressableProps {
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

</file>
<file path="src/types/ui/index.ts">

</file>
<file path="src/types/ui/navigation.ts">
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

/**
 * Navigation type definitions
 * Ensures type-safe navigation throughout the app
 */

// Main stack navigator params
export type RootStackParamList = {
  readonly Tabs: NavigatorScreenParams<TabParamList>;
  readonly ExerciseDetail: { exercise_id: string };
  readonly WorkoutDetail: { workout_id: string };
  readonly WorkoutBuilder: { workout_id?: string };
  readonly ActiveWorkout: { workout_id?: string }; // Can start empty!
  readonly ExerciseEditModal: { 
    exercise_id?: string;
    workout_id?: string;
    onSave?: (exercise_id: string) => void;
  };
  readonly SetLoggerModal: {
    exercise_id: string;
    exercise_name: string;
    set_number: number;
    target_reps?: number;
    target_duration?: number;
    previous_weight?: number;
    onComplete: (performance: unknown) => void;
  };
  readonly RestTimerModal: {
    duration: number;
    next_exercise?: string;
    onSkip: () => void;
    onComplete: () => void;
  };
  readonly ExercisePickerModal: {
    workout_id?: string;
    onSelect: (exercise_id: string) => void;
  };
};

// Tab navigator params
export type TabParamList = {
  readonly HomeTab: undefined;
  readonly ExercisesTab: undefined;
  readonly WorkoutsTab: undefined;
  readonly HistoryTab: undefined;
  readonly ProfileTab: undefined;
};

// Screen prop types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// Navigation prop types for hooks
export type UseNavigationProp = RootStackScreenProps<keyof RootStackParamList>['navigation'];
export type UseRouteProp<T extends keyof RootStackParamList> = RootStackScreenProps<T>['route'];

// Modal presentation types
export type ModalPresentationStyle = 'modal' | 'push' | 'transparentModal';

// Screen transition types
export type ScreenTransition = 'default' | 'slide' | 'fade' | 'none';

// Navigation helpers
export const navigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  animationEnabled: true,
} as const;

export const modalOptions = {
  presentation: 'modal' as const,
  headerShown: true,
  gestureEnabled: true,
} as const;

export const tabBarOptions = {
  activeTintColor: undefined, // Will use theme
  inactiveTintColor: undefined, // Will use theme
  showLabel: true,
  style: undefined, // Will use theme
} as const;

</file>
<file path="src/types/ui/validation.ts">
/**
 * Types and utilities for form validation
 * Used across all forms in the application
 */

// Base validation rule interface
export interface ValidationRule<T = unknown> {
  readonly validate: (value: T) => boolean;
  readonly message: string;
}

// Field validation configuration
export interface FieldValidation<T = unknown> {
  readonly required?: boolean;
  readonly rules?: ReadonlyArray<ValidationRule<T>>;
}

// Form validation configuration
export type FormValidation<T> = {
  readonly [K in keyof T]?: FieldValidation<T[K]>;
};

// Validation result
export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: Record<string, string>;
}

// Common validation rules factory
export const validationRules = {
  positiveNumber: (message = 'Must be a positive number'): ValidationRule<number> => ({
    validate: (value: number): boolean => value > 0,
    message,
  }),
  
  nonEmptyString: (message = 'This field is required'): ValidationRule<string> => ({
    validate: (value: string): boolean => value.trim().length > 0,
    message,
  }),
  
  validEmail: (message = 'Please enter a valid email'): ValidationRule<string> => ({
    validate: (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),
  
  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value: string): boolean => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),
  
  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value: string): boolean => value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),
  
  inRange: (min: number, max: number, message?: string): ValidationRule<number> => ({
    validate: (value: number): boolean => value >= min && value <= max,
    message: message || `Must be between ${min} and ${max}`,
  }),
  
  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    validate: (value: string): boolean => regex.test(value),
    message,
  }),
} as const;

// Validation helper function
export const validateForm = <T extends Record<string, unknown>>(
  values: T,
  validation: FormValidation<T>,
): ValidationResult => {
  const errors: Record<string, string> = {};
  let valid = true;

  Object.entries(validation).forEach(([field, fieldValidation]) => {
    if (!fieldValidation) return;

    const value = values[field];
    const { required, rules } = fieldValidation;

    // Check required
    if (required && (value === undefined || value === null || value === '')) {
      errors[field] = 'This field is required';
      valid = false;
      return;
    }

    // Skip validation if not required and empty
    if (!required && (value === undefined || value === null || value === '')) {
      return;
    }

    // Check rules
    if (rules) {
      for (const rule of rules) {
        if (!rule.validate(value as never)) {
          errors[field] = rule.message;
          valid = false;
          break;
        }
      }
    }
  });

  return { valid, errors };
};

// Specific validation schemas
export const exerciseValidation: FormValidation<{
  name: string;
  muscle_groups: string[];
  default_sets: number;
  default_reps?: number | null;
  default_rest_seconds: number;
}> = {
  name: {
    required: true,
    rules: [
      validationRules.minLength(3),
      validationRules.maxLength(100),
    ],
  },
  muscle_groups: {
    required: true,
    rules: [{
      validate: (value: string[]): boolean => value.length > 0,
      message: 'Select at least one muscle group',
    }],
  },
  default_sets: {
    required: true,
    rules: [
      validationRules.positiveNumber(),
      validationRules.inRange(1, 10),
    ],
  },
  default_reps: {
    rules: [
      validationRules.inRange(1, 100, 'Reps must be between 1 and 100'),
    ],
  },
  default_rest_seconds: {
    required: true,
    rules: [
      validationRules.inRange(0, 600, 'Rest must be between 0 and 10 minutes'),
    ],
  },
};

export const workoutValidation: FormValidation<{
  name: string;
  description?: string;
  category: string;
  difficulty: string;
}> = {
  name: {
    required: true,
    rules: [
      validationRules.minLength(3),
      validationRules.maxLength(100),
    ],
  },
  description: {
    rules: [
      validationRules.maxLength(500),
    ],
  },
  category: {
    required: true,
  },
  difficulty: {
    required: true,
  },
};

</file>
<file path="src/types/utils/api.ts">
/**
 * API utility types
 * Used for GraphQL and REST API interactions
 */

// GraphQL response wrapper
export interface GraphQLResponse<T> {
  readonly data?: T;
  readonly errors?: ReadonlyArray<GraphQLError>;
  readonly extensions?: Record<string, unknown>;
}

// GraphQL error structure
export interface GraphQLError {
  readonly message: string;
  readonly locations?: ReadonlyArray<{
    readonly line: number;
    readonly column: number;
  }>;
  readonly path?: ReadonlyArray<string | number>;
  readonly extensions?: {
    readonly code?: string;
    readonly exception?: {
      readonly stacktrace?: ReadonlyArray<string>;
    };
  };
}

// Generic API error
export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly statusCode?: number;
  readonly details?: unknown;
}

// Pagination types
export interface PaginationInfo {
  readonly totalCount: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly startCursor?: string;
  readonly endCursor?: string;
}

export interface PageInfo {
  readonly limit: number;
  readonly offset: number;
  readonly total: number;
  readonly currentPage: number;
  readonly totalPages: number;
}

// Connection types (Relay-style pagination)
export interface Edge<T> {
  readonly cursor: string;
  readonly node: T;
}

export interface Connection<T> {
  readonly edges: ReadonlyArray<Edge<T>>;
  readonly pageInfo: PaginationInfo;
  readonly totalCount: number;
}

// Query options
export interface QueryOptions {
  readonly limit?: number;
  readonly offset?: number;
  readonly orderBy?: Record<string, 'asc' | 'desc'>;
  readonly where?: Record<string, unknown>;
}

// Mutation response types
export interface MutationResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: ApiError;
}

// Subscription types
export interface SubscriptionEvent<T> {
  readonly type: 'added' | 'modified' | 'removed';
  readonly data: T;
  readonly timestamp: string;
}

// Cache update helpers
export type CacheUpdater<T> = (cache: T) => T;

// Type guards
export const hasGraphQLErrors = <T>(
  response: GraphQLResponse<T>
): response is GraphQLResponse<T> & { errors: ReadonlyArray<GraphQLError> } => {
  return Boolean(response.errors && response.errors.length > 0);
};

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    typeof (error as ApiError).code === 'string' &&
    typeof (error as ApiError).message === 'string'
  );
};

// Error helpers
export const createApiError = (
  code: string,
  message: string,
  statusCode?: number,
  details?: unknown
): ApiError => ({
  code,
  message,
  statusCode,
  details,
});

export const extractGraphQLError = (errors: ReadonlyArray<GraphQLError>): string => {
  if (errors.length === 0) return 'Unknown GraphQL error';
  return errors.map(e => e.message).join(', ');
};

// Network state
export interface NetworkState {
  readonly isConnected: boolean;
  readonly isInternetReachable: boolean;
  readonly type: 'wifi' | 'cellular' | 'none' | 'unknown';
}

// Request state for hooks
export interface RequestState<T> {
  readonly data?: T;
  readonly loading: boolean;
  readonly error?: ApiError;
  readonly refetch?: () => Promise<void>;
}

// Optimistic update types
export interface OptimisticUpdate<T> {
  readonly id: string;
  readonly type: 'create' | 'update' | 'delete';
  readonly data: T;
  readonly timestamp: number;
}

</file>
<file path="src/types/utils/index.ts">

</file>
<file path="src/types/utils/ordering.ts">
/**
 * Fractional ordering utilities
 * Enables inserting exercises without reindexing
 */

// Type for items with order
export interface OrderedItem {
  readonly exercise_order: number;
}

// Ordering helper functions
export const orderingHelpers = {
  /**
   * Get order value for appending at the end
   */
  getOrderForAppend: (items: ReadonlyArray<OrderedItem>): number => {
    if (items.length === 0) return 1.0;
    const maxOrder = Math.max(...items.map(item => item.exercise_order));
    return Math.floor(maxOrder) + 1.0;
  },
  
  /**
   * Get order value for inserting between two items
   */
  getOrderBetween: (before: number, after: number): number => {
    return (before + after) / 2;
  },
  
  /**
   * Get order value for prepending at the start
   */
  getOrderForPrepend: (items: ReadonlyArray<OrderedItem>): number => {
    if (items.length === 0) return 1.0;
    const minOrder = Math.min(...items.map(item => item.exercise_order));
    return minOrder / 2;
  },
  
  /**
   * Get order value for inserting at a specific index
   */
  getOrderAtIndex: (
    items: ReadonlyArray<OrderedItem>,
    index: number
  ): number => {
    if (index <= 0) {
      return orderingHelpers.getOrderForPrepend(items);
    }
    if (index >= items.length) {
      return orderingHelpers.getOrderForAppend(items);
    }
    
    const sorted = [...items].sort((a, b) => a.exercise_order - b.exercise_order);
    const before = sorted[index - 1]!.exercise_order;
    const after = sorted[index]!.exercise_order;
    return orderingHelpers.getOrderBetween(before, after);
  },
  
  /**
   * Check if reordering is needed (orders too close)
   */
  needsReorder: (items: ReadonlyArray<OrderedItem>, threshold = 0.0001): boolean => {
    const sorted = [...items].sort((a, b) => a.exercise_order - b.exercise_order);
    
    for (let i = 1; i < sorted.length; i++) {
      const diff = sorted[i]!.exercise_order - sorted[i - 1]!.exercise_order;
      if (diff < threshold) {
        return true;
      }
    }
    
    return false;
  },
  
  /**
   * Reorder items with nice spacing
   */
  redistributeOrders: (items: ReadonlyArray<OrderedItem>): ReadonlyArray<{ 
    id: string; 
    new_order: number 
  }> => {
    const sorted = [...items].sort((a, b) => a.exercise_order - b.exercise_order);
    const results: Array<{ id: string; new_order: number }> = [];
    
    sorted.forEach((item, index) => {
      // Assumes items have an 'id' field - adjust as needed
      results.push({
        id: (item as any).id,
        new_order: (index + 1) * 1.0,
      });
    });
    
    return results;
  },
  
  /**
   * Move item to new position
   */
  getMoveToIndexOrder: (
    items: ReadonlyArray<OrderedItem>,
    fromIndex: number,
    toIndex: number
  ): number => {
    if (fromIndex === toIndex) {
      return items[fromIndex]!.exercise_order;
    }
    
    const sorted = [...items].sort((a, b) => a.exercise_order - b.exercise_order);
    const filtered = sorted.filter((_, idx) => idx !== fromIndex);
    
    if (toIndex === 0) {
      return orderingHelpers.getOrderForPrepend(filtered);
    }
    
    if (toIndex >= filtered.length) {
      return orderingHelpers.getOrderForAppend(filtered);
    }
    
    if (toIndex < fromIndex) {
      // Moving up
      const after = filtered[toIndex]!.exercise_order;
      const before = toIndex > 0 ? filtered[toIndex - 1]!.exercise_order : 0;
      return orderingHelpers.getOrderBetween(before, after);
    } else {
      // Moving down
      const before = filtered[toIndex - 1]!.exercise_order;
      const after = filtered[toIndex]?.exercise_order ?? before + 1;
      return orderingHelpers.getOrderBetween(before, after);
    }
  },
};

// Type guard
export const hasOrder = (item: unknown): item is OrderedItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'exercise_order' in item &&
    typeof (item as OrderedItem).exercise_order === 'number'
  );
};

// Sort helper
export const sortByOrder = <T extends OrderedItem>(items: ReadonlyArray<T>): T[] => {
  return [...items].sort((a, b) => a.exercise_order - b.exercise_order);
};

</file>
<file path="src/types/common.ts">
/**
 * Common type definitions used throughout the application
 */

// UUID type alias for clarity
export type UUID = string;

// Common database field types
export type Timestamp = string; // ISO 8601 format
export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export type JSONArray = JSONValue[];

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[]
    ? ReadonlyArray<DeepReadonly<U>>
    : T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

// Common response types
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Type guards
export const isSuccessResponse = <T>(
  response: ApiResponse<T>,
): response is SuccessResponse<T> => response.success === true;

export const isErrorResponse = <T>(
  response: ApiResponse<T>,
): response is ErrorResponse => response.success === false;

// Exhaustive check helper
export const exhaustiveCheck = (value: never): never => {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
};

</file>
<file path="src/types/index.ts">
/**
 * Main types export file
 * Re-exports all types for easy importing throughout the app
 */

// Common types
export * from './common';

// Business logic types
export * from './business/activeWorkout';
export * from './business/filters';
export * from './business/mutations';

// UI types
export * from './ui/validation';
export * from './ui/components';
export * from './ui/navigation';

// Utility types
export * from './utils/api';
export * from './utils/ordering';

// Note: Generated types will be imported from './generated/graphql'
// after running codegen

</file>
<file path="src/utils/constants/index.ts">

</file>
<file path="src/utils/formatters/index.ts">

</file>
<file path="src/utils/helpers/index.ts">

</file>
<file path="src/utils/validators/index.ts">

</file>
<file path="src/utils/index.ts">

</file>
<file path="src/index.ts">

</file>
<file path=".eslintrc.js">
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};

</file>
<file path=".prettierrc.js">
module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',
};

</file>
<file path=".watchmanconfig">
{}

</file>
<file path="app.json">
{
  "name": "FitTrack",
  "displayName": "FitTrack"
}

</file>
<file path="App.tsx">
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@/contexts/ApolloProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { RootNavigator } from '@/navigation/RootNavigator';

/**
 * Main application component
 * Sets up all providers in the correct order
 */
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <ApolloProvider>
            <ThemeProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </ThemeProvider>
          </ApolloProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

</file>
<file path="babel.config.js">

// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@atoms': './src/components/atoms',
          '@molecules': './src/components/molecules',
          '@organisms': './src/components/organisms',
          '@templates': './src/components/templates',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@theme': './src/theme',
          '@services': './src/services',
          '@store': './src/store',
          '@utils': './src/utils',
          '@contexts': './src/contexts',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};

</file>
<file path="codegen.yml">
overwrite: true
schema: "${HASURA_ENDPOINT}"
documents: "src/api/queries/**/*.graphql"
generates:
  src/api/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
    config:
      skipTypename: true
      enumsAsTypes: true
      avoidOptionals: false
      maybeValue: T | null

</file>
<file path="index.js">
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

</file>
<file path="metro.config.js">
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
    assetExts: ['glb', 'gltf', 'png', 'jpg', 'jpeg', 'svg', 'bmp', 'gif', 'webp', 'psd', 'tiff', 'ttf', 'otf', 'ttc', 'woff', 'woff2'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

</file>
<file path="package.json">
{
  "name": "FitTrack",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "type-check": "tsc --noEmit",
    "codegen": "graphql-codegen --config codegen.yml",
    "codegen:watch": "graphql-codegen --config codegen.yml --watch",
    "pod-install": "cd ios && pod install",
    "clean": "watchman watch-del-all && rm -rf node_modules && yarn install && yarn pod-install",
    "validate": "yarn type-check && yarn lint",
    "prepare": "husky install"
  },
  "dependencies": {
    "@apollo/client": "^3.13.8",
    "@expo/vector-icons": "^14.1.0",
    "@react-native-async-storage/async-storage": "^2.2.0",
    "@react-native-community/blur": "^4.4.1",
    "@react-native/new-app-screen": "0.80.0",
    "@react-navigation/bottom-tabs": "^7.4.2",
    "@react-navigation/native": "^7.1.14",
    "@react-navigation/native-stack": "^7.3.21",
    "@react-navigation/stack": "^7.4.2",
    "@shopify/react-native-skia": "^2.0.7",
    "@tanstack/react-query": "^5.81.5",
    "babel-plugin-module-resolver": "^5.0.2",
    "react": "19.1.0",
    "react-native": "0.80.0",
    "react-native-async-storage": "^0.0.1",
    "react-native-gesture-handler": "^2.26.0",
    "react-native-linear-gradient": "^2.8.3",
    "react-native-reanimated": "^3.18.0",
    "react-native-safe-area-context": "^5.5.0",
    "react-native-screens": "^4.11.1",
    "react-native-vector-icons": "^10.2.0",
    "zustand": "^5.0.6"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.3",
    "@babel/runtime": "^7.25.0",
    "@react-native-community/cli": "19.0.0",
    "@react-native-community/cli-platform-android": "19.0.0",
    "@react-native-community/cli-platform-ios": "19.0.0",
    "@react-native/babel-preset": "0.80.0",
    "@react-native/eslint-config": "0.80.0",
    "@react-native/metro-config": "0.80.0",
    "@react-native/typescript-config": "0.80.0",
    "@types/jest": "^29.5.13",
    "@types/react": "^19.1.0",
    "@types/react-test-renderer": "^19.1.0",
    "eslint": "^8.19.0",
    "jest": "^29.6.3",
    "prettier": "2.8.8",
    "react-native-dotenv": "^3.4.11",
    "react-test-renderer": "19.1.0",
    "typescript": "5.0.4"
  },
  "engines": {
    "node": ">=18"
  }
}

</file>
<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["es2017"],
    "jsx": "react-native",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "babel.config.js", "metro.config.js"]
}

</file>
