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
