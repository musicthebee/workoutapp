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
  GlassBaseAndroid,
  GlassBaseAndroidRich,
  ButtonBase,
  TextBase,
  Spacer,
  Flex,
} from '@/components/atoms';
import { GradientBackground, GradientOrb } from '@/components/atoms/glass/GradientOrb';
import { useTheme, useThemeControls } from '@/hooks';
import { glassMorphism, gradient } from '@/theme/utils/glassMorphism';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const GlassShowcaseScreen: React.FC = () => {
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeControls();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  
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
    setSelectedCard(index);
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
              variant="medium"
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
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    glassMorphism({ variant: 'heavy', isDark }),
                  ]}
                >
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
                
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    glassMorphism({ variant: 'light', isDark }),
                  ]}
                >
                  <TextBase variant="button_small">Learn More</TextBase>
                </TouchableOpacity>
              </Flex>
            </GlassBase>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Glass Cards Grid */}
          <Animated.View entering={FadeInUp.delay(600).duration(800).springify()}>
            <TextBase variant="heading_4">Glass Variants</TextBase>
            <Spacer size="md" />
            
            <View style={styles.cardsGrid}>
              {['light', 'medium', 'heavy'].map((variant, index) => (
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
                        selectedCard === index && styles.selectedCard,
                      ]}
                      glow={selectedCard === index}
                    >
                      <Icon 
                        name={index === 0 ? 'sun' : index === 1 ? 'cloud' : 'moon'}
                        size={32} 
                        color={theme.colors.primary} 
                      />
                      <Spacer size="sm" />
                      <TextBase variant="heading_4" align="center">
                        {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </TextBase>
                      <TextBase variant="caption" color="secondary" align="center">
                        Blur: {theme.glass[variant as keyof typeof theme.glass].blur_amount}
                      </TextBase>
                    </GlassBase>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Interactive Demo */}
          <Animated.View entering={FadeInUp.delay(1000).duration(800).springify()}>
            <TextBase variant="heading_4">Interactive Elements</TextBase>
            <Spacer size="md" />
            
            <GlassBaseAndroidRich variant="light" style={styles.interactiveCard}>
              {/* Input fields */}
              <View style={[styles.inputContainer, glassMorphism({ variant: 'light', isDark })]}>
                <Icon name="user" size={20} color={theme.colors.muted} />
                <TextBase variant="body_medium" style={styles.inputPlaceholder}>
                  Username
                </TextBase>
              </View>
              
              <Spacer size="md" />
              
              <View style={[styles.inputContainer, glassMorphism({ variant: 'light', isDark })]}>
                <Icon name="lock" size={20} color={theme.colors.muted} />
                <TextBase variant="body_medium" style={styles.inputPlaceholder}>
                  Password
                </TextBase>
              </View>
              
              <Spacer size="lg" />
              
              {/* Toggle switches */}
              <Flex direction="row" justify="between" align="center">
                <TextBase variant="body_medium">Enable Notifications</TextBase>
                <View style={[styles.toggle, glassMorphism({ variant: 'medium', isDark })]}>
                  <View style={[styles.toggleThumb, { backgroundColor: theme.colors.primary }]} />
                </View>
              </Flex>
            </GlassBaseAndroidRich>
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

const styles = StyleSheet.create({
  themeToggle: {
    padding: 12,
    borderRadius: 12,
  },
  heroCard: {
    padding: 32,
    borderRadius: 24,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridCard: {
    width: (screenWidth - 64) / 3,
    aspectRatio: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.5)',
  },
  interactiveCard: {
    padding: 24,
    borderRadius: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  inputPlaceholder: {
    flex: 1,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginLeft: 20,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  performanceCard: {
    width: (screenWidth - 64) / 4,
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
