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
