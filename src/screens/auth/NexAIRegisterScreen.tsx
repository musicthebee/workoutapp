// src/screens/auth/NexAIRegisterScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  FadeInDown,
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
  AuthLink,
  PasswordStrengthIndicator,
} from '@/components/auth';
import { useTheme } from '@/theme/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { Haptics } from '@/utils/haptics';
import type { SignUpData } from '@/types/auth';

interface NexAIRegisterScreenProps {
  onLogin?: () => void;
}

export const NexAIRegisterScreen: React.FC<NexAIRegisterScreenProps> = ({ onLogin }) => {
  const theme = useTheme();
  const { sign_up, is_loading, error: authError } = useAuth();
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  // Animation
  const errorShake = useSharedValue(0);
  
  // Clear validation errors when user types
  useEffect(() => {
    if (firstName && validationErrors.firstName) {
      setValidationErrors(prev => ({ ...prev, firstName: undefined }));
    }
  }, [firstName]);
  
  useEffect(() => {
    if (lastName && validationErrors.lastName) {
      setValidationErrors(prev => ({ ...prev, lastName: undefined }));
    }
  }, [lastName]);
  
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
  
  useEffect(() => {
    if (confirmPassword && validationErrors.confirmPassword) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  }, [confirmPassword]);
  
  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};
    
    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleRegister = async () => {
    if (!validateForm()) {
      Haptics.error();
      errorShake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );
      return;
    }
    
    Haptics.light();
    try {
      const signUpData: SignUpData = {
        email: email.trim(),
        password,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      };
      
      await sign_up(signUpData);
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
  
  const formStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: errorShake.value }],
  }));
  
  return (
    <AuthBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo */}
            <Animated.View 
              entering={FadeInDown.springify()}
              style={styles.logoContainer}
            >
              <NexAILogo size={120} animated={false} variant="default" showGlow={false} />
            </Animated.View>
            
            {/* Header text */}
            <Animated.View 
              entering={FadeInDown.delay(100).springify()}
              style={styles.headerContainer}
            >
              <TextBase variant="heading_4" align="center">
                Create Account
              </TextBase>
              <TextBase variant="body_small" color="secondary" align="center">
                Start your fitness evolution
              </TextBase>
            </Animated.View>
            
            {/* Registration form */}
            <Animated.View style={formStyle}>
              <AuthFormCard delay={200}>
                {/* Name fields */}
                <View style={styles.nameRow}>
                  <View style={styles.nameField}>
                    <AuthInputField
                      label="First Name"
                      value={firstName}
                      onChangeText={setFirstName}
                      placeholder="John"
                      error={validationErrors.firstName}
                      delay={300}
                      autoCapitalize="words"
                    />
                  </View>
                  
                  <View style={styles.nameField}>
                    <AuthInputField
                      label="Last Name"
                      value={lastName}
                      onChangeText={setLastName}
                      placeholder="Doe"
                      error={validationErrors.lastName}
                      delay={350}
                      autoCapitalize="words"
                    />
                  </View>
                </View>
                
                <AuthInputField
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  icon="mail"
                  type="email"
                  error={validationErrors.email}
                  delay={400}
                />
                
                <AuthInputField
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Min. 8 characters"
                  icon="lock"
                  type="password"
                  showPasswordToggle
                  error={validationErrors.password}
                  delay={450}
                />
                
                {password.length > 0 && (
                  <PasswordStrengthIndicator password={password} />
                )}
                
                <AuthInputField
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Re-enter password"
                  icon="lock"
                  type="password"
                  showPasswordToggle
                  error={validationErrors.confirmPassword}
                  delay={500}
                />
                
                {/* Error display */}
                {authError && (
                  <AuthError 
                    message={authError.message || 'Registration failed. Please try again.'} 
                  />
                )}
                
                {/* Register button */}
                <Animated.View 
                  entering={FadeInDown.delay(600).springify()}
                  style={styles.buttonContainer}
                >
                  <BigButton
                    variant="primary"
                    label="Create Account"
                    onPress={handleRegister}
                    loading={is_loading}
                    loading_text="Creating account..."
                    full_width
                  />
                </Animated.View>
              </AuthFormCard>
            </Animated.View>
            
            {/* Sign in link */}
            <Animated.View
              entering={FadeInDown.delay(800).springify()}
              style={styles.signinContainer}
            >
              <TextBase variant="body_medium" color="secondary">
                Already have an account?{' '}
              </TextBase>
              <AuthLink onPress={onLogin!}>
                Sign In
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
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  headerContainer: {
    marginBottom: 12,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
  },
  termsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
});
