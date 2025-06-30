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
