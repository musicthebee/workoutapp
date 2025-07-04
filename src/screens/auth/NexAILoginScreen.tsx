// src/screens/auth/NexAILoginScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { NexAILogo } from '@/components/brand/NexAILogo';
import { TextBase, ButtonBase, GlassBase } from '@/components/atoms';
import { BigButton } from '@/components/molecules';
import { 
  AuthBackground, 
  AuthDivider,
  AuthLink,
} from '@/components/auth';
import { useTheme } from '@/theme/hooks/useTheme';
import { useLogin } from '@/hooks/useAuth';
import { Haptics } from '@/utils/haptics';
import type { SignInData } from '@/types/auth';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface NexAILoginScreenProps {
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export const NexAILoginScreen: React.FC<NexAILoginScreenProps> = ({ 
  onForgotPassword, 
  onRegister 
}) => {
  const theme = useTheme();
  const { mutate: login, isPending, error: authError } = useLogin();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  
  // Animation
  const errorShake = useSharedValue(0);
  const formScale = useSharedValue(0.95);
  
  useEffect(() => {
    formScale.value = withTiming(1, { duration: 300 });
  }, []);
  
  const formStyle = useAnimatedStyle(() => ({
    transform: [{ scale: formScale.value }],
  }));
  
  // Clear validation errors when user types
  useEffect(() => {
    if (email && validationErrors.email) {
      setValidationErrors(prev => ({ ...prev, email: undefined }));
    }
  }, [email]);
  
  useEffect(() => {
    if (password && validationErrors.password) {
      setValidationErrors(prev => ({ ...prev, password: undefined }));
    }
  }, [password]);
  
  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      Haptics.light();
      errorShake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );
      return false;
    }
    
    return true;
  };
  
  const handleLogin = () => {
    if (!validateForm()) return;
    
    Haptics.medium();
    Keyboard.dismiss();
    
    const signInData: SignInData = { email, password };
    login(signInData);
  };
  
  const handleSocialLogin = (provider: 'google' | 'apple') => {
    Haptics.light();
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
  };
  
  const errorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: errorShake.value }],
  }));

  return (
    <AuthBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* Logo and header */}
            <Animated.View 
              entering={FadeInDown.springify()}
              style={styles.logoContainer}
            >
              <NexAILogo size={120} animated={false} variant="default" showGlow={false} />
            </Animated.View>
            
            <Animated.View 
              entering={FadeInDown.delay(200).springify()}
              style={styles.headerContainer}
            >
              <TextBase variant="heading_4" align="center">
                Welcome Back
              </TextBase>
              <TextBase variant="body_small" color="secondary" align="center">
                Sign in to continue your fitness journey
              </TextBase>
            </Animated.View>
            
            {/* Form Card */}
            <Animated.View 
              style={[styles.formContainer, formStyle, errorStyle]}
              entering={FadeInUp.delay(400).springify()}
            >
              <GlassBase variant="medium" style={styles.glassCard}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: theme.colors.text_secondary }]}>
                    Email
                  </Text>
                  <View style={[
                    styles.inputWrapper,
                    {
                      backgroundColor: theme.isDark 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      borderColor: focusedField === 'email' 
                        ? theme.colors.primary 
                        : validationErrors.email 
                        ? theme.colors.error
                        : theme.colors.glass_border,
                      borderWidth: focusedField === 'email' ? 2 : 1,
                    },
                  ]}>
                    <Icon
                      name="mail"
                      size={20}
                      color={validationErrors.email ? theme.colors.error : theme.colors.text_tertiary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: theme.colors.text_primary }]}
                      placeholder="your@email.com"
                      placeholderTextColor={theme.colors.text_tertiary}
                      value={email}
                      onChangeText={setEmail}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="emailAddress"
                    />
                  </View>
                  {validationErrors.email && (
                    <Animated.View entering={FadeInUp.springify()}>
                      <Text style={[styles.errorText, { color: theme.colors.error }]}>
                        {validationErrors.email}
                      </Text>
                    </Animated.View>
                  )}
                </View>
                
                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: theme.colors.text_secondary }]}>
                    Password
                  </Text>
                  <View style={[
                    styles.inputWrapper,
                    {
                      backgroundColor: theme.isDark 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      borderColor: focusedField === 'password' 
                        ? theme.colors.primary 
                        : validationErrors.password 
                        ? theme.colors.error
                        : theme.colors.glass_border,
                      borderWidth: focusedField === 'password' ? 2 : 1,
                    },
                  ]}>
                    <Icon
                      name="lock"
                      size={20}
                      color={validationErrors.password ? theme.colors.error : theme.colors.text_tertiary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: theme.colors.text_primary }]}
                      placeholder="Enter your password"
                      placeholderTextColor={theme.colors.text_tertiary}
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      style={styles.passwordToggle}
                    >
                      <Icon
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color={theme.colors.text_tertiary}
                      />
                    </TouchableOpacity>
                  </View>
                  {validationErrors.password && (
                    <Animated.View entering={FadeInUp.springify()}>
                      <Text style={[styles.errorText, { color: theme.colors.error }]}>
                        {validationErrors.password}
                      </Text>
                    </Animated.View>
                  )}
                </View>
                
                {/* Forgot Password */}
                <Animated.View 
                  entering={FadeInUp.delay(500).springify()}
                  style={styles.forgotContainer}
                >
                  <AuthLink onPress={onForgotPassword!} color="primary">
                    Forgot password?
                  </AuthLink>
                </Animated.View>
                
                {/* Login Button */}
                <Animated.View entering={FadeInUp.delay(600).springify()}>
                  <BigButton
                    label={isPending ? '' : 'Sign In'}
                    onPress={handleLogin}
                    variant="primary"
                    disabled={isPending}
                    style={styles.loginButton}
                  >
                    {isPending && (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    )}
                  </BigButton>
                </Animated.View>
                
                {/* Error Display */}
                {authError && (
                  <Animated.View 
                    entering={FadeInUp.springify()}
                    style={[styles.errorContainer, { backgroundColor: theme.isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)' }]}
                  >
                    <Icon name="alert-circle" size={16} color={theme.colors.error} />
                    <Text style={[styles.errorMessageText, { color: theme.colors.error }]}>
                      {authError?.message || 'Invalid email or password'}
                    </Text>
                  </Animated.View>
                )}
                
                {/* Divider */}
                <AuthDivider text="OR" delay={700} />
                
                {/* Social Login
                <Animated.View 
                  entering={FadeInUp.delay(800).springify()}
                  style={styles.socialContainer}
                >
                  <ButtonBase
                    onPress={() => handleSocialLogin('google')}
                    variant="secondary"
                    size="lg"
                    style={styles.socialButton}
                  >
                    <Icon name="chrome" size={24} color={theme.colors.text_primary} />
                  </ButtonBase>
                  
                  <ButtonBase
                    onPress={() => handleSocialLogin('apple')}
                    variant="secondary"
                    size="lg"
                    style={styles.socialButton}
                  >
                    <Icon name="smartphone" size={24} color={theme.colors.text_primary} />
                  </ButtonBase>
                </Animated.View>
                */}
                
                {/* Sign up link */}
                <Animated.View 
                  entering={FadeInUp.delay(900).springify()}
                  style={styles.signupContainer}
                >
                  <TextBase variant="body_medium" color="secondary">
                    Don't have an account?{' '}
                  </TextBase>
                  <AuthLink onPress={onRegister!} color="primary">
                    Sign Up
                  </AuthLink>
                </Animated.View>
              </GlassBase>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
    minHeight: SCREEN_HEIGHT - 100, // Ensure content fits without scrolling
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  headerContainer: {
    marginBottom: 18,
  },
  formContainer: {
    marginBottom: 24,
  },
  glassCard: {
    borderRadius: 24,
    padding: 24,
    // Glass effect is handled by GlassBase component
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
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
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingVertical: 0, // Ensure text is vertically centered
  },
  passwordToggle: {
    marginLeft: 12,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  errorMessageText: {
    fontSize: 14,
    flex: 1,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 56,
    paddingHorizontal: 0,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
});
