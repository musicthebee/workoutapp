// src/screens/auth/NexAISplashScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  interpolate,
  Extrapolate,
  Easing,
  cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { NexAILogo } from '@/components/brand/NexAILogo';
import { useTheme } from '@/theme/hooks/useTheme';
import { TextBase } from '@/components/atoms';


interface NexAISplashScreenProps {
  onAnimationComplete?: () => void;
}

const LOADING_MESSAGES = [
  'Initializing AI Engine...',
  'Loading Exercise Database...',
  'Preparing Your Workout...',
  'Syncing Personal Records...',
  'Almost Ready...',
];

export const NexAISplashScreen: React.FC<NexAISplashScreenProps> = ({ onAnimationComplete }) => {
  const theme = useTheme();
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [showContent, setShowContent] = useState(true);
  
  // Animation values
  const backgroundScale = useSharedValue(1.5);
  const backgroundRotation = useSharedValue(0);
  const gradientOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const particleScale = useSharedValue(0);
  
  // Gradient orbs
  const orb1X = useSharedValue(0);
  const orb1Y = useSharedValue(0);
  const orb2X = useSharedValue(0);
  const orb2Y = useSharedValue(0);
  const orb3X = useSharedValue(0);
  const orb3Y = useSharedValue(0);
  
  // Grid lines
  const gridOpacity = useSharedValue(0);
  const gridScale = useSharedValue(0.8);
  
  // Energy waves
  const waveScale1 = useSharedValue(0);
  const waveScale2 = useSharedValue(0);
  const waveScale3 = useSharedValue(0);
  const waveOpacity = useSharedValue(0);
  
  // Tagline animations
  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(20);
  
  // Exit animation
  const exitScale = useSharedValue(1);
  const exitOpacity = useSharedValue(1);
  
  useEffect(() => {
    StatusBar.setHidden(true, 'fade');
    
    // Message rotation
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[messageIndex]);
    }, 1200);
    
    // Start animations
    startAnimations();
    
    // Cleanup
    return () => {
      StatusBar.setHidden(false, 'fade');
      clearInterval(messageInterval);
      // Cancel all animations
      cancelAnimation(backgroundScale);
      cancelAnimation(backgroundRotation);
      cancelAnimation(gradientOpacity);
      cancelAnimation(progressWidth);
      cancelAnimation(messageOpacity);
      cancelAnimation(particleScale);
      cancelAnimation(orb1X);
      cancelAnimation(orb1Y);
      cancelAnimation(orb2X);
      cancelAnimation(orb2Y);
      cancelAnimation(orb3X);
      cancelAnimation(orb3Y);
      cancelAnimation(gridOpacity);
      cancelAnimation(gridScale);
      cancelAnimation(waveScale1);
      cancelAnimation(waveScale2);
      cancelAnimation(waveScale3);
      cancelAnimation(waveOpacity);
      cancelAnimation(taglineOpacity);
      cancelAnimation(taglineY);
      cancelAnimation(exitScale);
      cancelAnimation(exitOpacity);
    };
  }, []);
  
  const startAnimations = () => {
    // Background animations
    backgroundScale.value = withTiming(1, {
      duration: 2000,
      easing: Easing.out(Easing.cubic),
    });
    
    backgroundRotation.value = withRepeat(
      withTiming(360, {
        duration: 60000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    
    gradientOpacity.value = withTiming(1, {
      duration: 1500,
      easing: Easing.out(Easing.ease),
    });
    
    // Grid animations
    gridOpacity.value = withDelay(300,
      withTiming(0.1, {
        duration: 1500,
        easing: Easing.out(Easing.ease),
      })
    );
    
    gridScale.value = withDelay(300,
      withSpring(1, {
        damping: 15,
        stiffness: 100,
      })
    );
    
    // Orb animations
    orb1X.value = withRepeat(
      withSequence(
        withTiming(100, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-100, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    orb1Y.value = withRepeat(
      withSequence(
        withTiming(50, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-50, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    orb2X.value = withRepeat(
      withTiming(360, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    
    orb3X.value = withRepeat(
      withSequence(
        withTiming(-80, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        withTiming(80, { duration: 6000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    orb3Y.value = withRepeat(
      withSequence(
        withTiming(-60, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
        withTiming(60, { duration: 7000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Wave animations
    waveOpacity.value = withDelay(800,
      withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.ease),
      })
    );
    
    const waveAnimation = () => {
      waveScale1.value = withDelay(0,
        withSequence(
          withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
          withTiming(1.5, { duration: 0 })
        )
      );
      
      waveScale2.value = withDelay(667,
        withSequence(
          withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
          withTiming(1.5, { duration: 0 })
        )
      );
      
      waveScale3.value = withDelay(1334,
        withSequence(
          withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
          withTiming(1.5, { duration: 0 })
        )
      );
    };
    
    waveAnimation();
    const waveInterval = setInterval(waveAnimation, 2000);
    
    // Tagline animation
    taglineOpacity.value = withDelay(1500,
      withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      })
    );
    
    taglineY.value = withDelay(1500,
      withSpring(0, {
        damping: 15,
        stiffness: 100,
      })
    );
    
    // Progress animation
    progressWidth.value = withDelay(1000,
      withTiming(100, {
        duration: 4000,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      })
    );
    
    // Message animation
    messageOpacity.value = withDelay(1200,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      })
    );
    
    // Particle animation
    particleScale.value = withDelay(500,
      withTiming(1, {
        duration: 1500,
        easing: Easing.out(Easing.cubic),
      })
    );
    
    // Exit animation and callback
    setTimeout(() => {
      clearInterval(waveInterval);
      
      exitScale.value = withTiming(0.9, {
        duration: 400,
        easing: Easing.in(Easing.cubic),
      });
      
      exitOpacity.value = withTiming(0, {
        duration: 400,
        easing: Easing.in(Easing.cubic),
      }, (finished) => {
        if (finished) {
          runOnJS(setShowContent)(false);
          if (onAnimationComplete) runOnJS(onAnimationComplete)();
        }
      });
    }, 5000);
  };
  
  // Animated styles
  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: backgroundScale.value },
      { rotate: `${backgroundRotation.value}deg` },
    ],
  }));
  
  const gradientStyle = useAnimatedStyle(() => ({
    opacity: gradientOpacity.value,
  }));
  
  const gridStyle = useAnimatedStyle(() => ({
    opacity: gridOpacity.value,
    transform: [{ scale: gridScale.value }],
  }));
  
  const orb1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb1X.value },
      { translateY: orb1Y.value },
    ],
  }));
  
  const orb2Style = useAnimatedStyle(() => {
    const angle = orb2X.value * (Math.PI / 180);
    return {
      transform: [
        { translateX: Math.cos(angle) * 150 },
        { translateY: Math.sin(angle) * 150 },
      ],
    };
  });
  
  const orb3Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb3X.value },
      { translateY: orb3Y.value },
    ],
  }));
  
  const wave1Style = useAnimatedStyle(() => ({
    transform: [{ scale: waveScale1.value }],
    opacity: interpolate(
      waveScale1.value,
      [0, 0.5, 1.5],
      [0, 0.3, 0],
      Extrapolate.CLAMP
    ) * waveOpacity.value,
  }));
  
  const wave2Style = useAnimatedStyle(() => ({
    transform: [{ scale: waveScale2.value }],
    opacity: interpolate(
      waveScale2.value,
      [0, 0.5, 1.5],
      [0, 0.3, 0],
      Extrapolate.CLAMP
    ) * waveOpacity.value,
  }));
  
  const wave3Style = useAnimatedStyle(() => ({
    transform: [{ scale: waveScale3.value }],
    opacity: interpolate(
      waveScale3.value,
      [0, 0.5, 1.5],
      [0, 0.3, 0],
      Extrapolate.CLAMP
    ) * waveOpacity.value,
  }));
  
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));
  
  const progressGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progressWidth.value,
      [0, 50, 100],
      [0, 1, 0.5],
      Extrapolate.CLAMP
    ),
  }));
  
  const messageStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
  }));
  
  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineY.value }],
  }));
  
  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: exitScale.value }],
    opacity: exitOpacity.value,
  }));
  
  
  if (!showContent) return null;
  
  return (
    <Animated.View style={[styles.container, contentStyle]}>
      {/* Deep background */}
      <LinearGradient
        colors={theme.isDark 
          ? ['#0A0A14', '#14141F', '#0A0A14']
          : ['#0F0F1E', '#1A1A2E', '#0F0F1E']
        }
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Animated gradient background */}
      <Animated.View style={[StyleSheet.absoluteFillObject, backgroundStyle]}>
        <Animated.View style={[StyleSheet.absoluteFillObject, gradientStyle]}>
          <LinearGradient
            colors={theme.isDark
              ? ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)', 'rgba(249, 115, 22, 0.05)']
              : ['rgba(99, 102, 241, 0.08)', 'rgba(139, 92, 246, 0.08)', 'rgba(249, 115, 22, 0.04)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      </Animated.View>
      
      {/* Grid overlay */}
      <Animated.View style={[styles.gridOverlay, gridStyle]} pointerEvents="none">
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={`h-${i}`} style={[styles.gridLine, styles.gridLineHorizontal, { top: `${i * 5}%` }]} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={`v-${i}`} style={[styles.gridLine, styles.gridLineVertical, { left: `${i * 5}%` }]} />
        ))}
      </Animated.View>
      
      {/* Animated gradient orbs */}
      <View style={styles.orbContainer} pointerEvents="none">
        <Animated.View style={[styles.orb, styles.orb1, orb1Style]}>
          <LinearGradient
            colors={['rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 0)']}
            style={styles.orbGradient}
          />
        </Animated.View>
        
        <Animated.View style={[styles.orb, styles.orb2, orb2Style]}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0)']}
            style={styles.orbGradient}
          />
        </Animated.View>
        
        <Animated.View style={[styles.orb, styles.orb3, orb3Style]}>
          <LinearGradient
            colors={['rgba(249, 115, 22, 0.3)', 'rgba(249, 115, 22, 0)']}
            style={styles.orbGradient}
          />
        </Animated.View>
      </View>
      
      {/* Energy waves */}
      <View style={styles.waveContainer} pointerEvents="none">
        <Animated.View style={[styles.wave, wave1Style]}>
          <LinearGradient
            colors={[
              'transparent',
              theme.isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
              'transparent'
            ]}
            style={styles.waveGradient}
          />
        </Animated.View>
        
        <Animated.View style={[styles.wave, wave2Style]}>
          <LinearGradient
            colors={[
              'transparent',
              theme.isDark ? 'rgba(249, 115, 22, 0.2)' : 'rgba(249, 115, 22, 0.1)',
              'transparent'
            ]}
            style={styles.waveGradient}
          />
        </Animated.View>
        
        <Animated.View style={[styles.wave, wave3Style]}>
          <LinearGradient
            colors={[
              'transparent',
              theme.isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
              'transparent'
            ]}
            style={styles.waveGradient}
          />
        </Animated.View>
      </View>
      
      {/* Main content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <NexAILogo
            size={160}
            animated={true}
            variant="splash"
            showGlow={true}
            onAnimationComplete={() => {}}
          />
        </View>
        
        {/* Tagline */}
        <Animated.View style={[styles.taglineContainer, taglineStyle]}>
          <TextBase variant="body_large" color="secondary" style={styles.tagline}>
            AI-Powered
          </TextBase>
          <LinearGradient
            colors={['#2196F3', '#9C27B0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.taglineGradient}
          >
            <TextBase variant="heading_2" style={styles.taglineMain}>
              FITNESS EVOLUTION
            </TextBase>
          </LinearGradient>
        </Animated.View>
      </View>
      
      {/* Progress section */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, progressStyle]}>
            <LinearGradient
              colors={['#2196F3', '#9C27B0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <Animated.View style={[styles.progressGlow, progressGlowStyle]} />
          </Animated.View>
        </View>
        
        <Animated.View style={messageStyle}>
          <TextBase variant="body_small" color="secondary" style={styles.loadingMessage}>
            {loadingMessage}
          </TextBase>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridOverlay: {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb: {
    position: 'absolute',
  },
  orb1: {
    width: 400,
    height: 400,
  },
  orb2: {
    width: 300,
    height: 300,
  },
  orb3: {
    width: 350,
    height: 350,
  },
  orbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  waveContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wave: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  waveGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  taglineContainer: {
    alignItems: 'center',
  },
  tagline: {
    marginBottom: 8,
  },
  taglineGradient: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 24,
  },
  taglineMain: {
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: 2,
  },
  progressSection: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  loadingMessage: {
    textAlign: 'center',
  },
});
