// src/screens/GlassShowcaseScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  interpolate,
  Extrapolate,
  FadeIn,
  FadeInDown,
  FadeInUp,
  Layout,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import {
  GlassBase,
  ButtonBase,
  TextBase,
  Spacer,
  Flex,
} from '@/components/atoms';
import { GradientBackground, GradientOrb } from '@/components/atoms/glass/GradientOrb';
import { useTheme, useThemeControls } from '@/hooks';
import { useGlassVariant } from '@/contexts/GlassVariantContext';
import { glassMorphism, gradient } from '@/theme/utils/glassMorphism';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Factory function to create styles with theme tokens
const createStyles = (theme: any) => StyleSheet.create({
  themeToggle: {
    padding: theme.spacing.sm,
    borderRadius: theme.borders.radii.md,
  },
  heroCard: {
    padding: theme.spacing.xxl,
    borderRadius: theme.borders.radii.xl,
  },
  actionButton: {
    borderRadius: theme.borders.radii.md,
    overflow: 'hidden',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: theme.borders.widths.thin,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  gradientButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  gridCard: {
    width: (screenWidth - theme.spacing.md * 4) / 2.5,
    aspectRatio: 1,
    padding: theme.spacing.lg,
    borderRadius: theme.borders.radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    borderWidth: theme.borders.widths.medium,
    borderColor: 'rgba(99, 102, 241, 0.5)',
  },
  interactiveCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borders.radii.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: theme.borders.widths.thin,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  inputPlaceholder: {
    flex: 1,
  },
  toggle: {
    width: theme.sizes.touchTargets.small,
    height: theme.spacing.xl,
    padding: theme.spacing.xxxs,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: theme.borders.widths.thin,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  toggleThumb: {
    width: theme.spacing.xl - theme.spacing.xxs,
    height: theme.spacing.xl - theme.spacing.xxs,
    borderRadius: (theme.spacing.xl - theme.spacing.xxs) / 2,
    marginLeft: theme.spacing.md + theme.spacing.xxs,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  performanceCard: {
    width: (screenWidth - theme.spacing.lg * 4) / 4,
    aspectRatio: 1,
    borderRadius: theme.borders.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const GlassShowcaseScreen: React.FC = () => {
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeControls();
  const { selectedVariant, setSelectedVariant } = useGlassVariant();
  const styles = createStyles(theme);
  
  // Animation values
  const formOpacity = useSharedValue(0);
  const formScale = useSharedValue(0.9);
  const cardScale = useSharedValue(1);
  
  useEffect(() => {
    // Entry animations
    formOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    formScale.value = withDelay(300, withSpring(1, theme.animation.springs.responsive));
  }, [formOpacity, formScale, theme]);
  
  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ scale: formScale.value }],
  }));
  
  
  const handleCardPress = (index: number) => {
    const variants = ['light', 'medium', 'heavy'] as const;
    const newVariant = variants[index];
    setSelectedVariant(newVariant);
    cardScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, theme.animation.springs.bouncy)
    );
  };
  
  
  return (
    <GradientBackground
      orbs={[
        { 
          position: { x: -100, y: -100 }, 
          size: 400,
          animationType: 'float',
          colors: theme.gradients.primary.map(c => c + '30'),
        },
        { 
          position: { x: screenWidth - 200, y: 200 }, 
          size: 300,
          animationType: 'pulse',
          colors: theme.gradients.secondary.map(c => c + '30'),
          delay: 1000,
        },
        { 
          position: { x: 50, y: screenHeight - 300 }, 
          size: 350,
          animationType: 'rotate',
          colors: theme.gradients.accent.map(c => c + '30'),
          delay: 2000,
        },
      ]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            padding: theme.spacing.lg,
            minHeight: screenHeight,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(600).springify()}>
            <Flex direction="row" justify="between" align="center">
              <TextBase variant="heading_2">Glass Showcase</TextBase>
              <TouchableOpacity
                onPress={toggleTheme}
                style={[
                  styles.themeToggle,
                  glassMorphism({ variant: 'light', isDark }),
                ]}
              >
                <Icon 
                  name={isDark ? 'sun' : 'moon'} 
                  size={24} 
                  color={theme.colors.primary} 
                />
              </TouchableOpacity>
            </Flex>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Hero Card */}
          <Animated.View style={formAnimatedStyle}>
            <GlassBase
              style={styles.heroCard}
              glow={true}
              shimmer={true}
              animated={true}
            >
              <TextBase variant="heading_3" align="center">
                Premium Glassmorphism
              </TextBase>
              <Spacer size="md" />
              <TextBase variant="body_medium" color="secondary" align="center">
                Beautiful glass effects with blur, gradients, and animations
              </TextBase>
              <Spacer size="lg" />
              
              {/* Action buttons */}
              <Flex direction="row" gap="md" justify="center">
                <TouchableOpacity style={styles.actionButton}>
                  <LinearGradient
                    colors={[...theme.gradients.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <TextBase variant="button_small" color="inverse">
                      Get Started
                    </TextBase>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                  <TextBase variant="button_small">Learn More</TextBase>
                </TouchableOpacity>
              </Flex>
            </GlassBase>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Glass Cards Grid */}
          <Animated.View entering={FadeInUp.delay(600).duration(800).springify()}>
            <Flex direction="row" justify="between" align="center">
              <TextBase variant="heading_4">Glass Variants</TextBase>
              <TextBase variant="caption" color="secondary">
                Active: {selectedVariant.charAt(0).toUpperCase() + selectedVariant.slice(1)}
              </TextBase>
            </Flex>
            <Spacer size="md" />
            
            <View style={styles.cardsGrid}>
              {['light', 'medium', 'heavy'].map((variant, index) => {
                const isSelected = selectedVariant === variant;
                return (
                  <Animated.View
                    key={variant}
                    entering={FadeInUp.delay(800 + index * 100).springify()}
                    layout={Layout.springify()}
                  >
                    <TouchableOpacity
                      onPress={() => handleCardPress(index)}
                      activeOpacity={0.8}
                    >
                      <GlassBase
                        variant={variant as 'light' | 'medium' | 'heavy'}
                        style={[
                          styles.gridCard,
                          isSelected && styles.selectedCard,
                        ]}
                        glow={isSelected}
                      >
                      <Icon 
                        name={index === 0 ? 'sun' : index === 1 ? 'cloud' : 'moon'}
                        size={theme.sizes.icons.lg} 
                        color={theme.colors.primary} 
                      />
                      <Spacer size="sm" />
                      <TextBase variant="body_medium" align="center">
                        {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </TextBase>
                      <TextBase variant="caption" color="secondary" align="center">
                        Blur: {theme.glass[variant as keyof typeof theme.glass].blur_amount}
                      </TextBase>
                    </GlassBase>
                  </TouchableOpacity>
                </Animated.View>
                );
              })}
            </View>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Interactive Demo */}
          <Animated.View entering={FadeInUp.delay(1000).duration(800).springify()}>
            <TextBase variant="heading_4">Interactive Elements</TextBase>
            <Spacer size="md" />
            
            <GlassBase style={styles.interactiveCard}>
              {/* Input fields - using simple styling to avoid double glass stacking */}
              <View style={[styles.inputContainer, { borderRadius: theme.borders.radii.md }]}>
                <Icon name="user" size={20} color={theme.colors.muted} />
                <TextBase variant="body_medium" style={styles.inputPlaceholder}>
                  Username
                </TextBase>
              </View>
              
              <Spacer size="md" />
              
              <View style={[styles.inputContainer, { borderRadius: theme.borders.radii.md }]}>
                <Icon name="lock" size={20} color={theme.colors.muted} />
                <TextBase variant="body_medium" style={styles.inputPlaceholder}>
                  Password
                </TextBase>
              </View>
              
              <Spacer size="lg" />
              
              {/* Toggle switches */}
              <Flex direction="row" justify="between" align="center">
                <TextBase variant="body_medium">Enable Notifications</TextBase>
                <View style={[styles.toggle, { borderRadius: theme.borders.radii.full }]}>
                  <View style={[styles.toggleThumb, { backgroundColor: theme.colors.primary }]} />
                </View>
              </Flex>
            </GlassBase>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Performance Test Grid */}
          <Animated.View entering={FadeInUp.delay(1200).duration(800).springify()}>
            <TextBase variant="heading_4">Performance Test</TextBase>
            <TextBase variant="caption" color="secondary">
              Multiple glass layers with animations
            </TextBase>
            <Spacer size="md" />
            
            <View style={styles.performanceGrid}>
              {Array.from({ length: 12 }).map((_, i) => (
                <GlassBase
                  key={i}
                  variant={i % 3 === 0 ? 'light' : i % 3 === 1 ? 'medium' : 'heavy'}
                  style={styles.performanceCard}
                  glow={i % 4 === 0}
                  shimmer={i % 3 === 0}
                >
                  <TextBase variant="caption" align="center">{i + 1}</TextBase>
                </GlassBase>
              ))}
            </View>
          </Animated.View>
          
          <Spacer size="xxxl" />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

