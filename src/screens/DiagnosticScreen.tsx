// src/screens/DiagnosticScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Platform,
  Switch,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import {
  GlassBase,
  GlassBaseFallback,
  ButtonBase,
  TextBase,
  Spacer,
  Flex,
} from '@/components/atoms';
import { GradientBackground } from '@/components/atoms/glass/GradientOrb';
import { useTheme, useThemeControls } from '@/hooks';
import { glassMorphism } from '@/theme/utils/glassMorphism';

const { width: screenWidth } = Dimensions.get('window');

export const DiagnosticScreen: React.FC = () => {
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeControls();
  const [useBlurView, setUseBlurView] = useState(Platform.OS === 'ios');
  const [showAnimations, setShowAnimations] = useState(true);
  const [showOrbs, setShowOrbs] = useState(true);
  
  // Animation test values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  
  // Test animations
  const testScale = () => {
    scale.value = withSpring(scale.value === 1 ? 1.2 : 1);
  };
  
  const testRotation = () => {
    rotation.value = withSequence(
      withTiming(10, { duration: 100 }),
      withTiming(-10, { duration: 200 }),
      withTiming(0, { duration: 100 })
    );
  };
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotation.value}deg` },
    ],
  }));
  
  // Conditional wrapper for gradient background
  const ContentWrapper = showOrbs ? GradientBackground : View;
  const contentWrapperProps = showOrbs ? {
    orbs: [
      { position: { x: -150, y: -150 }, size: 400, animationType: 'float' as const },
      { position: { x: screenWidth - 100, y: 200 }, size: 300, animationType: 'pulse' as const, colors: ['rgba(249, 115, 22, 0.2)', 'rgba(249, 115, 22, 0.05)', 'transparent'] },
      { position: { x: 50, y: 600 }, size: 350, animationType: 'rotate' as const, colors: ['rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.05)', 'transparent'] },
    ]
  } : { style: { flex: 1 } };
  
  // Component to use based on settings
  const GlassComponent = useBlurView ? GlassBase : GlassBaseFallback;
  
  return (
    <ContentWrapper {...contentWrapperProps}>
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#0A0A14' : '#FAFAFA' }}>
        <ScrollView
          contentContainerStyle={{
            padding: theme.spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <Flex direction="row" justify="between" align="center">
              <TextBase variant="heading_2">Glass Diagnostic</TextBase>
              <TouchableOpacity
                onPress={toggleTheme}
                style={[
                  styles.iconButton,
                  glassMorphism({ variant: 'light', isDark }),
                ]}
              >
                <Icon name={isDark ? 'sun' : 'moon'} size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            </Flex>
          </Animated.View>
          
          <Spacer size="md" />
          
          <TextBase variant="body_medium" color="secondary">
            Platform: {Platform.OS} {Platform.Version}
          </TextBase>
          
          <Spacer size="xl" />
          
          {/* Configuration */}
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <TextBase variant="heading_4">Configuration</TextBase>
            <Spacer size="md" />
            
            <GlassComponent variant="light" style={styles.configCard}>
              <Flex direction="row" justify="between" align="center">
                <TextBase variant="body_medium">Use BlurView</TextBase>
                <Switch
                  value={useBlurView}
                  onValueChange={setUseBlurView}
                  trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                />
              </Flex>
              
              <Spacer size="md" />
              
              <Flex direction="row" justify="between" align="center">
                <TextBase variant="body_medium">Show Animations</TextBase>
                <Switch
                  value={showAnimations}
                  onValueChange={setShowAnimations}
                  trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                />
              </Flex>
              
              <Spacer size="md" />
              
              <Flex direction="row" justify="between" align="center">
                <TextBase variant="body_medium">Show Gradient Orbs</TextBase>
                <Switch
                  value={showOrbs}
                  onValueChange={setShowOrbs}
                  trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                />
              </Flex>
            </GlassComponent>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Glass Variants */}
          <Animated.View entering={FadeInDown.delay(400).duration(400)}>
            <TextBase variant="heading_4">1. Glass Variants</TextBase>
            <Spacer size="md" />
            
            <View style={{ gap: theme.spacing.md }}>
              <GlassComponent
                variant="light"
                style={styles.variantCard}
                shimmer={showAnimations}
                glow={showAnimations}
              >
                <TextBase variant="heading_4">Light Glass</TextBase>
                <TextBase variant="body_small" color="secondary">
                  Blur: {theme.glass.light.blur_amount} | Tint: {theme.glass.light.tint_opacity}
                </TextBase>
              </GlassComponent>
              
              <GlassComponent
                variant="medium"
                style={styles.variantCard}
                shimmer={showAnimations}
                glow={showAnimations}
              >
                <TextBase variant="heading_4">Medium Glass</TextBase>
                <TextBase variant="body_small" color="secondary">
                  Blur: {theme.glass.medium.blur_amount} | Tint: {theme.glass.medium.tint_opacity}
                </TextBase>
              </GlassComponent>
              
              <GlassComponent
                variant="heavy"
                style={styles.variantCard}
                shimmer={showAnimations}
                glow={showAnimations}
              >
                <TextBase variant="heading_4">Heavy Glass</TextBase>
                <TextBase variant="body_small" color="secondary">
                  Blur: {theme.glass.heavy.blur_amount} | Tint: {theme.glass.heavy.tint_opacity}
                </TextBase>
              </GlassComponent>
            </View>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Glass Over Gradient */}
          <Animated.View entering={FadeInDown.delay(600).duration(400)}>
            <TextBase variant="heading_4">2. Glass Over Gradient</TextBase>
            <Spacer size="md" />
            
            <LinearGradient
              colors={[...theme.gradients.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientContainer}
            >
              <View style={styles.gradientContent}>
                <GlassComponent
                  variant="light"
                  style={styles.gradientCard}
                  glow={showAnimations}
                >
                  <TextBase variant="body_medium">Light over gradient</TextBase>
                </GlassComponent>
                
                <GlassComponent
                  variant="medium"
                  style={styles.gradientCard}
                  glow={showAnimations}
                >
                  <TextBase variant="body_medium">Medium over gradient</TextBase>
                </GlassComponent>
                
                <GlassComponent
                  variant="heavy"
                  style={styles.gradientCard}
                  glow={showAnimations}
                >
                  <TextBase variant="body_medium">Heavy over gradient</TextBase>
                </GlassComponent>
              </View>
            </LinearGradient>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Animation Test */}
          <Animated.View entering={FadeInDown.delay(800).duration(400)}>
            <TextBase variant="heading_4">3. Animation Tests</TextBase>
            <Spacer size="md" />
            
            <Flex align="center" gap="lg">
              <Animated.View style={animatedStyle}>
                <GlassComponent
                  variant="medium"
                  style={styles.animatedCard}
                  shimmer={true}
                  glow={true}
                  animated={showAnimations}
                >
                  <TextBase variant="body_large" align="center">
                    Animated Glass
                  </TextBase>
                </GlassComponent>
              </Animated.View>
              
              <Flex direction="row" gap="sm">
                <TouchableOpacity
                  onPress={testScale}
                  style={[
                    styles.button,
                    glassMorphism({ variant: 'medium', isDark }),
                  ]}
                >
                  <TextBase variant="button_small">Scale</TextBase>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={testRotation}
                  style={[
                    styles.button,
                    glassMorphism({ variant: 'medium', isDark }),
                  ]}
                >
                  <TextBase variant="button_small">Shake</TextBase>
                </TouchableOpacity>
              </Flex>
            </Flex>
          </Animated.View>
          
          <Spacer size="xl" />
          
          {/* Status Report */}
          <Animated.View entering={FadeInDown.delay(1000).duration(400)}>
            <TextBase variant="heading_4">4. Status Report</TextBase>
            <Spacer size="md" />
            
            <GlassComponent variant="light" style={styles.statusCard}>
              <Flex gap="sm">
                <StatusItem label="Theme Mode" value={isDark ? 'Dark' : 'Light'} status="info" />
                <StatusItem label="Blur Method" value={useBlurView ? 'BlurView' : 'Fallback'} status="info" />
                <StatusItem label="Platform" value={Platform.OS} status="info" />
                <StatusItem label="Animations" value={showAnimations ? 'Enabled' : 'Disabled'} status={showAnimations ? 'success' : 'warning'} />
                <StatusItem label="Glass Effects" check="manual" status="warning" />
                <StatusItem label="Performance" check="manual" status="warning" />
              </Flex>
            </GlassComponent>
          </Animated.View>
          
          <Spacer size="xxxl" />
        </ScrollView>
      </SafeAreaView>
    </ContentWrapper>
  );
};

const StatusItem: React.FC<{
  label: string;
  value?: string;
  check?: 'manual';
  status?: 'info' | 'success' | 'warning' | 'error';
}> = ({ label, value, check, status = 'info' }) => {
  const theme = useTheme();
  
  const statusColors = {
    info: theme.colors.info,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.danger,
  };
  
  return (
    <Flex direction="row" justify="between">
      <TextBase variant="body_small">{label}</TextBase>
      {value ? (
        <TextBase variant="body_small" style={{ color: statusColors[status] }}>
          {value}
        </TextBase>
      ) : check === 'manual' ? (
        <TextBase variant="body_small" style={{ color: statusColors.warning }}>
          Check Visually
        </TextBase>
      ) : null}
    </Flex>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: 12,
    borderRadius: 12,
  },
  configCard: {
    padding: 20,
    borderRadius: 16,
  },
  variantCard: {
    padding: 24,
    borderRadius: 16,
  },
  gradientContainer: {
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientContent: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  gradientCard: {
    padding: 16,
    borderRadius: 12,
  },
  animatedCard: {
    padding: 32,
    borderRadius: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  statusCard: {
    padding: 20,
    borderRadius: 16,
  },
});
