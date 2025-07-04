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
import { NexAILogo } from '@/components/brand/NexAILogo';
import { TextBase } from '@/components/atoms';
import { BigButton } from '@/components/molecules';
import { 
  AuthBackground, 
  AuthFormCard,
  AuthInputField,
  AuthError,
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
    
    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      Haptics.error();
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
  
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      Haptics.medium();
      Keyboard.dismiss();
      
      const signInData: SignInData = { 
        email: email.trim(), 
        password 
      };
      
      await login(signInData);
      Haptics.success();
    } catch (error) {
      Haptics.error();
      errorShake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );
    }
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
            >
              <AuthFormCard delay={400}>
                <AuthInputField
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  icon="mail"
                  type="email"
                  error={validationErrors.email}
                  delay={300}
                />
                
                <AuthInputField
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  icon="lock"
                  type="password"
                  showPasswordToggle
                  error={validationErrors.password}
                  delay={400}
                />
                
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
                  <AuthError 
                    message={authError?.message || 'Invalid email or password'} 
                  />
                )}
                
              </AuthFormCard>
            </Animated.View>
            
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
    minHeight: SCREEN_HEIGHT - 100,
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
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
});
