// src/components/auth/AuthFormComponents.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
  TextInput,
  Platform,
} from 'react-native';
import Animated, {
  FadeInUp,
  Layout,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { GlassBase, TextBase, InputBase, BigButton } from '@/components/atoms';
import { useTheme } from '@/theme/hooks/useTheme';
import type { InputSize, TextColor } from '@/types';

// Type definitions
interface AuthFormCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
}

interface AuthInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  showPasswordToggle?: boolean;
  delay?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
}

interface AuthErrorProps {
  message: string;
  onDismiss?: () => void;
}

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface AuthLinkProps {
  children: React.ReactNode;
  onPress: () => void;
  color?: TextColor;
}

// Auth Form Card - Glass container for forms
export const AuthFormCard: React.FC<AuthFormCardProps> = ({ 
  children, 
  style,
  delay = 0,
}) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      layout={Layout.springify()}
    >
      <GlassBase
        variant="medium"
        style={[styles.formCard, style]}
      >
        {children}
      </GlassBase>
    </Animated.View>
  );
};

// Auth Input Field - Consistent input with label
export const AuthInputField: React.FC<AuthInputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  type = 'text',
  error,
  showPasswordToggle = false,
  delay = 0,
  autoCapitalize = 'none',
  editable = true,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  
  const inputType = type === 'password' && !showPassword ? 'password' : type;
  
  const containerStyle = useAnimatedStyle(() => {
    return {
      borderColor: withSpring(
        error 
          ? theme.colors.error 
          : isFocused 
          ? theme.colors.primary 
          : theme.colors.glass_border
      ),
      borderWidth: withSpring(isFocused ? 2 : 1),
    };
  });
  
  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      layout={Layout.springify()}
      style={styles.inputGroup}
    >
      <TextBase 
        variant="body_small" 
        color="secondary" 
        style={styles.inputLabel}
      >
        {label}
      </TextBase>
      
      <Animated.View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.isDark 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.02)',
          },
          containerStyle,
        ]}
      >
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={error ? theme.colors.error : theme.colors.text_tertiary}
            style={styles.inputIcon}
          />
        )}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text_tertiary}
          secureTextEntry={inputType === 'password'}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={editable}
          style={[
            styles.input,
            { color: theme.colors.text_primary }
          ]}
        />
        
        {showPasswordToggle && type === 'password' && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.passwordToggle}
          >
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={theme.colors.text_tertiary}
            />
          </Pressable>
        )}
      </Animated.View>
      
      {error && (
        <Animated.View 
          entering={FadeInUp.springify()}
          style={styles.errorContainer}
        >
          <TextBase variant="caption" color="error">
            {error}
          </TextBase>
        </Animated.View>
      )}
    </Animated.View>
  );
};

// Auth Error Display
export const AuthError: React.FC<AuthErrorProps> = ({ message, onDismiss }) => {
  const theme = useTheme();
  
  return (
    <Animated.View
      entering={FadeInUp.springify()}
      layout={Layout.springify()}
    >
      <GlassBase
        variant="light"
        style={[
          styles.errorBox,
          { backgroundColor: theme.isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)' }
        ]}
      >
        <Icon name="alert-circle" size={16} color={theme.colors.error} />
        <TextBase variant="body_small" color="error" style={styles.errorText}>
          {message}
        </TextBase>
        {onDismiss && (
          <Pressable onPress={onDismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Icon name="x" size={16} color={theme.colors.error} />
          </Pressable>
        )}
      </GlassBase>
    </Animated.View>
  );
};

// Password Strength Indicator
export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const theme = useTheme();
  
  const calculateStrength = (): { score: number; label: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 25;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 25;
    
    if (score <= 25) return { score, label: 'Weak', color: theme.colors.error };
    if (score <= 50) return { score, label: 'Fair', color: '#FFA502' };
    if (score <= 75) return { score, label: 'Good', color: '#FECA57' };
    return { score, label: 'Strong', color: theme.colors.success };
  };
  
  const strength = calculateStrength();
  
  if (password.length === 0) return null;
  
  return (
    <Animated.View
      entering={FadeInUp.springify()}
      style={styles.strengthContainer}
    >
      <View style={[styles.strengthBar, { backgroundColor: theme.colors.glass_border }]}>
        <Animated.View
          style={[
            styles.strengthFill,
            {
              width: `${strength.score}%`,
              backgroundColor: strength.color,
            },
          ]}
        />
      </View>
      <TextBase variant="caption" color="tertiary">
        Password strength: {strength.label}
      </TextBase>
    </Animated.View>
  );
};

// Auth Link Component
export const AuthLink: React.FC<AuthLinkProps> = ({ children, onPress, color = 'primary' }) => {
  return (
    <Pressable onPress={onPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <TextBase variant="body_medium" color={color} style={styles.link}>
        {children}
      </TextBase>
    </Pressable>
  );
};

// Divider with text
interface AuthDividerProps {
  text?: string;
  delay?: number;
}

export const AuthDivider: React.FC<AuthDividerProps> = ({ text = 'OR', delay = 0 }) => {
  const theme = useTheme();
  
  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      style={styles.dividerContainer}
    >
      <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
      <TextBase variant="caption" color="tertiary" style={styles.dividerText}>
        {text}
      </TextBase>
      <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  formCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: 'transparent',
    // Remove overflow: 'hidden' to allow proper glass effect rendering
    // Glass effects are handled by GlassBase component
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    // Removed overflow: 'hidden' to ensure proper icon positioning
  },
  inputIcon: {
    marginRight: 12,
    // Fixed positioning
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingVertical: Platform.OS === 'ios' ? 0 : 8, // Platform-specific padding
  },
  passwordToggle: {
    marginLeft: 12,
    padding: 4, // Add padding for better touch target
  },
  errorContainer: {
    marginTop: 6,
    paddingHorizontal: 4,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  errorText: {
    flex: 1,
  },
  strengthContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  strengthBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  link: {
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
  },
});
