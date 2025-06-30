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
 * Glass Base Props
 */
export interface GlassBaseProps extends BaseComponentProps {
  variant: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Glass Base Component
 * Foundation for all glass morphism effects in the app
 */
export const GlassBase: React.FC<GlassBaseProps> = ({
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
  
  // Android fallback - no blur, use translucent background
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.isDark
            ? theme.colors.glass_heavy
            : theme.colors.glass_light,
          borderRadius: theme.borders.radii.md,
          borderWidth: theme.borders.widths.hairline,
          borderColor: theme.colors.glass_border,
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
